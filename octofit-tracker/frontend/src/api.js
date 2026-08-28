const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(component) {
  return `${API_BASE_URL}/api/${component}/`
}

export function toArray(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  return payload.data || payload.items || payload.results || payload.docs || []
}

export async function fetchCollection(component) {
  const response = await fetch(getApiUrl(component))
  if (!response.ok) throw new Error(`Could not load ${component}.`)
  return toArray(await response.json())
}
