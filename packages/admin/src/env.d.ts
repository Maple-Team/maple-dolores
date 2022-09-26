/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    DEV: boolean
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
