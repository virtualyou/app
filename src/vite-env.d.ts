/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASEPATH_AUTH: string
    readonly VITE_API_BASEPATH_USER: string
    readonly VITE_USERAUTH_TARGET: string
    readonly VITE_TEST_TARGET: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}