export const colorScheme = $state<'dark' | 'light'>(globalThis.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    ? 'dark'
    : 'light')