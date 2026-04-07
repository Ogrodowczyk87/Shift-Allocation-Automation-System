export const STORAGE_KEYS = {
  allocationState: 'allocationState',
  assignmentHistory: 'assignmentHistory',
} as const

export type StorageKey = keyof typeof STORAGE_KEYS
