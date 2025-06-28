export async function queryWrapper<T>(fn: () => Promise<T>): Promise<T> {
  try {
    const LOG_QUERY = process.env.NODE_ENV !== "production" && process.env.LOG_QUERY === "true"
    const start = LOG_QUERY ? performance.now() : 0
    const result = await fn()
    if (LOG_QUERY) {
      console.log(`\x1b[44m\x1b[97m[Query Time] ${(performance.now() - start).toFixed(3)}ms\x1b[0m`)
    }
    return result
  } catch (e) {
    console.error("Error: ", e)
    throw new Error("Database query failed")
  }
}