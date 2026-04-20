interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-cw-border rounded-full font-mono text-xs tracking-widest uppercase text-cw-accent">
      {children}
    </span>
  )
}
