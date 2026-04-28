export function simulateApiCall(ms = 900): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10)
}
