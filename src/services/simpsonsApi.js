import axios from 'axios'

// ─────────────────────────────────────────────────────────
//  BASE CONFIG
//  Documentación: https://thesimpsonsapi.com
// ─────────────────────────────────────────────────────────
const BASE_URL = 'https://thesimpsonsapi.com/api'
const CDN_URL  = 'https://cdn.thesimpsonsapi.com/500'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// ─── Image helpers ───────────────────────────────────────
export const getCharacterImage = (portrait_path) =>
  portrait_path ? `${CDN_URL}${portrait_path}` : null

export const getEpisodeImage = (image_path) =>
  image_path ? `${CDN_URL}${image_path}` : null

export const getLocationImage = (image_path) =>
  image_path ? `${CDN_URL}${image_path}` : null

// ─── Characters ──────────────────────────────────────────
// GET /api/characters?page=N  → { data: [...], total_pages, total_items, page }
export const fetchCharacters = async (page = 1) => {
  const { data } = await api.get(`/characters?page=${page}`)
  return data
}

// GET /api/characters/:id → personaje con frases, descripción, primer episodio
export const fetchCharacterById = async (id) => {
  const { data } = await api.get(`/characters/${id}`)
  return data
}

// ─── Episodes ────────────────────────────────────────────
// GET /api/episodes?page=N → { data: [...], total_pages, total_items, page }
export const fetchEpisodes = async (page = 1) => {
  const { data } = await api.get(`/episodes?page=${page}`)
  return data
}

// GET /api/episodes/:id → episodio con sinopsis, temporada, imagen
export const fetchEpisodeById = async (id) => {
  const { data } = await api.get(`/episodes/${id}`)
  return data
}

// ─── Locations ───────────────────────────────────────────
// GET /api/locations?page=N → { data: [...], total_pages, total_items, page }
export const fetchLocations = async (page = 1) => {
  const { data } = await api.get(`/locations?page=${page}`)
  return data
}

// GET /api/locations/:id
export const fetchLocationById = async (id) => {
  const { data } = await api.get(`/locations/${id}`)
  return data
}

// ─── Stats helper (primera página de cada sección) ───────
export const fetchStats = async () => {
  const [characters, episodes, locations] = await Promise.all([
    fetchCharacters(1),
    fetchEpisodes(1),
    fetchLocations(1),
  ])
  return {
    totalCharacters: characters.total_items,
    totalEpisodes:   episodes.total_items,
    totalLocations:  locations.total_items,
    featuredCharacters: characters.data.slice(0, 5),
  }
}

export default api
