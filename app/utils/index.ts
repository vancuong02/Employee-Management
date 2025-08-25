export function generateNumericId(): number {
    return Date.now() * 1000 + Math.floor(Math.random() * 1000)
}
