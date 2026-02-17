import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <Image
        src="/images/procta-logo.png"
        alt="Procta"
        width={32}
        height={32}
        className="shrink-0"
      />
      {showText ? (
        <span className="text-lg font-bold tracking-tight text-foreground">Procta Docs</span>
      ) : null}
    </div>
  )
}

