import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ACCENT = 0x00e5ff
const PURPLE = 0x7b61ff
const PINK   = 0xff4d6a

// ─── Helpers ────────────────────────────────────────────────────────────────

function makeRingGeom(radius: number, segments = 256) {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
  }
  return new THREE.BufferGeometry().setFromPoints(pts)
}

function makeGlowTex(hex: string, size = 128): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0,    hex)
  g.addColorStop(0.35, hex + 'aa')
  g.addColorStop(1,    'transparent')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

// Tapered trail using a ShaderMaterial line — fades from bright head to transparent tail
function makeTaperedTrail(color: number, segmentCount: number) {
  const positions = new Float32Array(segmentCount * 3)
  const alphas    = new Float32Array(segmentCount)

  for (let i = 0; i < segmentCount; i++) {
    // alpha: 1 at head (i=0), 0 at tail
    alphas[i] = Math.pow(1 - i / (segmentCount - 1), 1.8)
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1))

  const r = ((color >> 16) & 0xff) / 255
  const g = ((color >>  8) & 0xff) / 255
  const b = ( color        & 0xff) / 255

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uColor:      { value: new THREE.Vector3(r, g, b) },
      uOpacity:    { value: 0.9 },
    },
    vertexShader: /* glsl */`
      attribute float alpha;
      varying   float vAlpha;
      void main() {
        vAlpha = alpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3  uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(uColor, vAlpha * uOpacity);
      }
    `,
  })

  const line = new THREE.Line(geo, mat)
  line.frustumCulled = false

  return { line, positions, alphas }
}

// ─── Orbital configs ─────────────────────────────────────────────────────────

interface ElectronCfg {
  radius: number
  speed: number
  tiltX: number
  tiltY: number
  color: number
  count: number
  spriteScale: number
}

const ELECTRON_ORBITS: ElectronCfg[] = [
  { radius: 1.6, speed: 11, tiltX: 58, tiltY: 35, color: PURPLE, count: 2, spriteScale: 0.38 },
  { radius: 2.3, speed: 16, tiltX: 28, tiltY: 68, color: PINK,   count: 2, spriteScale: 0.32 },
  { radius: 3.0, speed: 22, tiltX: 62, tiltY: 18, color: ACCENT, count: 3, spriteScale: 0.28 },
]

const TRAIL_SEGS = 52

// ─── Component ───────────────────────────────────────────────────────────────

export default function AtomCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    mount.appendChild(renderer.domElement)

    // Scene & Camera
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 9)

    // ── Lighting ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x080818, 2.5))

    const keyLight = new THREE.PointLight(ACCENT, 90, 22, 2)
    keyLight.position.set(3, 4, 5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(PURPLE, 55, 20, 2)
    fillLight.position.set(-4, -2, 3)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight(PINK, 32, 16, 2)
    rimLight.position.set(0, -5, -3)
    scene.add(rimLight)

    const nucleusLight = new THREE.PointLight(ACCENT, 22, 9, 2)
    nucleusLight.position.set(0, 0, 0)
    scene.add(nucleusLight)

    // ── Nucleus ───────────────────────────────────────────────────────────
    const nucleusGroup = new THREE.Group()
    scene.add(nucleusGroup)

    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x071520,
      emissive: new THREE.Color(ACCENT),
      emissiveIntensity: 0.65,
      metalness: 0.92, roughness: 0.08,
    })
    nucleusGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 64, 64), nucleusMat))

    const glowMat = new THREE.SpriteMaterial({ map: makeGlowTex('#00e5ff'), transparent: true, opacity: 0.32, depthWrite: false })
    const glow1   = new THREE.Sprite(glowMat); glow1.scale.setScalar(1.7)
    nucleusGroup.add(glow1)

    const glowMat2 = new THREE.SpriteMaterial({ map: makeGlowTex('#7b61ff'), transparent: true, opacity: 0.18, depthWrite: false })
    const glow2    = new THREE.Sprite(glowMat2); glow2.scale.setScalar(2.5)
    nucleusGroup.add(glow2)

    // ── Electron orbits ───────────────────────────────────────────────────
    type ED = {
      sprite:    THREE.Sprite
      trailLine: THREE.Line
      trailPos:  Float32Array
      group:     THREE.Group
      cfg:       ElectronCfg
      angle:     number
      offset:    number
      history:   THREE.Vector3[]
    }

    const electrons: ED[] = []

    ELECTRON_ORBITS.forEach((cfg) => {
      const group = new THREE.Group()
      group.rotation.x = THREE.MathUtils.degToRad(cfg.tiltX)
      group.rotation.y = THREE.MathUtils.degToRad(cfg.tiltY)
      scene.add(group)

      group.add(new THREE.Line(
        makeRingGeom(cfg.radius),
        new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.2 })
      ))

      const hex  = `#${cfg.color.toString(16).padStart(6, '0')}`
      const spread = (Math.PI * 2) / cfg.count

      for (let i = 0; i < cfg.count; i++) {
        // Electron glow sprite
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: makeGlowTex(hex), transparent: true, opacity: 0.95, depthWrite: false })
        )
        sprite.scale.setScalar(cfg.spriteScale)
        group.add(sprite)

        // Tapered trail line
        const { line, positions } = makeTaperedTrail(cfg.color, TRAIL_SEGS)
        group.add(line)

        electrons.push({
          sprite, trailLine: line, trailPos: positions,
          group, cfg,
          angle: spread * i, offset: spread * i,
          history: Array.from({ length: TRAIL_SEGS }, () => new THREE.Vector3()),
        })
      }
    })

    // ── Mouse ─────────────────────────────────────────────────────────────
    const mouse       = { x: 0, y: 0 }
    const smoothMouse = { x: 0, y: 0 }

    const onMouseMove  = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - r.left) / r.width  - 0.5) * 2
      mouse.y = ((e.clientY - r.top)  / r.height - 0.5) * 2
    }
    const onMouseLeave = () => { mouse.x = 0; mouse.y = 0 }

    mount.addEventListener('mousemove',  onMouseMove)
    mount.addEventListener('mouseleave', onMouseLeave)

    // ── Render loop ───────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let raf: number

    function animate() {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05

      scene.rotation.x += (smoothMouse.y * 0.28                  - scene.rotation.x) * 0.04
      scene.rotation.y += (smoothMouse.x * 0.42 + t * 0.055      - scene.rotation.y) * 0.04

      // Nucleus breathe
      const pulse = 1 + Math.sin(t * 2.1) * 0.055
      nucleusGroup.scale.setScalar(pulse)
      nucleusMat.emissiveIntensity = 0.55 + Math.sin(t * 2.1) * 0.14
      glowMat.opacity              = 0.26 + Math.sin(t * 1.7) * 0.07
      glowMat2.opacity             = 0.14 + Math.sin(t * 1.3) * 0.05
      nucleusLight.intensity       = 19   + Math.sin(t * 2.4) * 5

      // Floating lights
      keyLight.position.x  = Math.cos(t * 0.38) * 4.5
      keyLight.position.z  = Math.sin(t * 0.38) * 4.5 + 3
      fillLight.position.x = Math.cos(t * 0.28 + Math.PI) * 5
      fillLight.position.z = Math.sin(t * 0.28) * 3

      // Electrons + tapered trails
      electrons.forEach((ed) => {
        const speed = (Math.PI * 2) / ed.cfg.speed
        ed.angle = ed.offset + t * speed

        const ex = Math.cos(ed.angle) * ed.cfg.radius
        const ey = Math.sin(ed.angle) * ed.cfg.radius
        ed.sprite.position.set(ex, ey, 0)

        // Shift history: newest point at index 0
        for (let i = ed.history.length - 1; i > 0; i--) {
          ed.history[i].copy(ed.history[i - 1])
        }
        ed.history[0].set(ex, ey, 0)

        // Write into BufferGeometry positions
        for (let i = 0; i < TRAIL_SEGS; i++) {
          const p = ed.history[i]
          ed.trailPos[i * 3]     = p.x
          ed.trailPos[i * 3 + 1] = p.y
          ed.trailPos[i * 3 + 2] = p.z
        }
        ed.trailLine.geometry.attributes.position.needsUpdate = true

        // Drive opacity via uniform
        const mat = ed.trailLine.material as THREE.ShaderMaterial
        mat.uniforms.uOpacity.value = 0.85
      })

      renderer.render(scene, camera)
    }

    animate()

    // Resize
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      mount.removeEventListener('mousemove',  onMouseMove)
      mount.removeEventListener('mouseleave', onMouseLeave)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={mountRef} className="w-full h-full" />
  )
}
