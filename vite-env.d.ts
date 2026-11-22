/// <reference types="vite/client" />

declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module './script' {
  export const CMS_CONFIG: { projectId: string; dataset: string }
  export function safeUrl(u: any): string | null
  export function embedUrl(u: any): string | null
  export function youtubeId(u: any): string | null
  export function youtubeThumb(id: string, quality?: string): string
  export const CARD_COLORS: string[][]
  export const TILE_COLORS: string[]
  export const TILE_X: number[]
  export const TILE_Y: number[]
  export const DEFAULT_FILMES: any[]
  export const DEFAULT_NOVELAS: any[]
  export function fetchSanityList(type: string): Promise<any>
}

declare module '../../../script' {
  export const CMS_CONFIG: { projectId: string; dataset: string }
  export function safeUrl(u: any): string | null
  export function embedUrl(u: any): string | null
  export function youtubeId(u: any): string | null
  export function youtubeThumb(id: string, quality?: string): string
  export const CARD_COLORS: string[][]
  export const TILE_COLORS: string[]
  export const TILE_X: number[]
  export const TILE_Y: number[]
  export const DEFAULT_FILMES: any[]
  export const DEFAULT_NOVELAS: any[]
  export function fetchSanityList(type: string): Promise<any>
}

