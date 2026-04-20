import { Github, Linkedin, Facebook } from 'lucide-react'

const footerLinks = {
  Contact: ['hello@cwdevs.com', '+63 912 345 6789', 'Manila, Philippines'],
}

export default function Footer() {
  return (
    <footer className="relative bg-cw-dark border-t border-cw-border/50">
      <div className="max-w-site mx-auto section-padding py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-12 mb-16">
          {/* Logo & tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-0.5 mb-4">
              <span className="font-mono text-2xl font-bold text-cw-accent">CW</span>
              <span className="font-display text-2xl font-bold text-white">Devs</span>
            </div>
            <p className="text-sm text-cw-muted leading-relaxed mb-6">
              We Build the Systems That Build Your Business.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-cw-border flex items-center justify-center text-cw-muted hover:text-cw-accent hover:border-cw-accent/50 transition-colors"
                aria-label="GitHub"
                data-cursor-hover
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-cw-border flex items-center justify-center text-cw-muted hover:text-cw-accent hover:border-cw-accent/50 transition-colors"
                aria-label="LinkedIn"
                data-cursor-hover
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-cw-border flex items-center justify-center text-cw-muted hover:text-cw-accent hover:border-cw-accent/50 transition-colors"
                aria-label="Facebook"
                data-cursor-hover
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-bold text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-cw-muted hover:text-cw-accent transition-colors"
                      data-cursor-hover
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cw-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cw-muted">© 2026 CW Devs. All rights reserved.</p>
          <p className="text-xs text-cw-muted font-mono">Built with precision. Engineered to scale.</p>
        </div>
      </div>
    </footer>
  )
}
