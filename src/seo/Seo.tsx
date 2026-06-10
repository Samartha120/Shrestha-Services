import type { ReactNode } from 'react'

export type SeoProps = {
  children?: ReactNode
}

export default function Seo({ children }: SeoProps) {
  return <>{children}</>
}
