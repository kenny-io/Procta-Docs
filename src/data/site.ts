export interface SiteLink {
  label: string
  href: string
}

export type BrandPresetKey = 'primary' | 'secondary'

export interface BrandPalette {
  background: string
  foreground: string
  muted: string
  border: string
  accent: string
  accentForeground: string
  ring: string
  sidebarActiveBg: string
  sidebarActiveText: string
}

export interface BrandConfig {
  light: BrandPalette
  dark: BrandPalette
}

export interface SiteConfig {
  name: string
  description: string
  repoUrl: string
  links: Array<SiteLink>
  brand: BrandConfig
  brandPreset: BrandPresetKey
  brandPresets: Record<BrandPresetKey, BrandConfig>
}

const brandPresets: Record<BrandPresetKey, BrandConfig> = {
  primary: {
    light: {
      background: '#FFFFFF',
      foreground: '#0F172A',
      muted: '#FFF7ED',
      border: '#FED7AA',
      accent: '#EA580C',
      accentForeground: '#FFF7ED',
      ring: '#EA580C',
      sidebarActiveBg: '25 95% 90% / 0.55',
      sidebarActiveText: '#9A3412',
    },
    dark: {
      background: '#0B1220',
      foreground: '#F8FAFC',
      muted: '#111827',
      border: '#1F2937',
      accent: '#FB923C',
      accentForeground: '#0B1220',
      ring: '#FB923C',
      sidebarActiveBg: '25 70% 30% / 0.35',
      sidebarActiveText: '#FED7AA',
    },
  },
  secondary: {
    light: {
      background: '#FFFFFF',
      foreground: '#0F172A',
      muted: '#FFF7ED',
      border: '#FFEDD5',
      accent: '#F97316',
      accentForeground: '#FFFBEB',
      ring: '#EA580C',
      sidebarActiveBg: '25 95% 90% / 0.5',
      sidebarActiveText: '#9A3412',
    },
    dark: {
      background: '#0B1220',
      foreground: '#FFF7ED',
      muted: '#1A1008',
      border: '#2D1F0E',
      accent: '#FB923C',
      accentForeground: '#0B1220',
      ring: '#FB923C',
      sidebarActiveBg: '25 55% 32% / 0.3',
      sidebarActiveText: '#FED7AA',
    },
  },
}

const brandPreset: BrandPresetKey = 'primary'

export const siteConfig: SiteConfig = {
  name: 'Procta',
  description:
    'Trust and attestation layer for autonomous financial agents. KYA identity, verifiable credentials, real-time verification, and audit trails.',
  repoUrl: 'https://github.com/ArbX-Procta/procta',
  links: [
    { label: 'Get started', href: '/quickstart' },
    { label: 'Dashboard', href: 'https://app.procta.org' },
    { label: 'GitHub', href: 'https://github.com/ArbX-Procta/procta' },
    { label: 'Changelog', href: '/changelog' },
  ],
  brand: brandPresets[brandPreset],
  brandPreset,
  brandPresets,
}

