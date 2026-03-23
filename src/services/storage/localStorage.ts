import { STORAGE_KEYS } from './keys'

type StorageValue = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

const isBrowser = typeof window !== 'undefined'

export function saveToLocalStorage<T>(key: StorageValue, value: T): void {
  if (!isBrowser) {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to save "${key}" in localStorage.`, error)
  }
}

export function loadFromLocalStorage<T>(key: StorageValue, fallbackValue: T): T {
  if (!isBrowser) {
    return fallbackValue
  }

  try {
    const storedValue = window.localStorage.getItem(key)

    if (!storedValue) {
      return fallbackValue
    }

    return JSON.parse(storedValue) as T
  } catch (error) {
    console.error(`Failed to read "${key}" from localStorage.`, error)
    return fallbackValue
  }
}
