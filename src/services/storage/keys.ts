export const STORAGE_KEYS = {
  allocationState: 'allocationState',
} as const

export type StorageKey = keyof typeof STORAGE_KEYS
