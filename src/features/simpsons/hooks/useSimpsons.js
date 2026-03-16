import { useState, useEffect, useCallback } from 'react'
import {
  fetchCharacters,
  fetchCharacterById,
  fetchEpisodes,
  fetchEpisodeById,
  fetchLocations,
  fetchStats,
} from '@/services/simpsonsApi'

// ─── Characters (paginado) ───────────────────────────────
export function useCharacters() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async (p = 1) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchCharacters(p)
      setCharacters(res.data)
      setTotalPages(res.total_pages)
      setTotalItems(res.total_items)
      setPage(p)
    } catch {
      setError('No se pudieron cargar los personajes.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(1) }, [load])

  return { characters, page, totalPages, totalItems, loading, error, goToPage: load }
}

// ─── Character detail ────────────────────────────────────
export function useCharacterDetail(id) {
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    fetchCharacterById(id)
      .then(setCharacter)
      .catch(() => setError('No se pudo cargar el personaje.'))
      .finally(() => setLoading(false))
  }, [id])

  return { character, loading, error }
}

// ─── Episodes (paginado) ─────────────────────────────────
export function useEpisodes() {
  const [episodes, setEpisodes] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async (p = 1) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchEpisodes(p)
      setEpisodes(res.data)
      setTotalPages(res.total_pages)
      setTotalItems(res.total_items)
      setPage(p)
    } catch {
      setError('No se pudieron cargar los episodios.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(1) }, [load])

  return { episodes, page, totalPages, totalItems, loading, error, goToPage: load }
}

// ─── Locations (paginado) ────────────────────────────────
export function useLocations() {
  const [locations, setLocations] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async (p = 1) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchLocations(p)
      setLocations(res.data)
      setTotalPages(res.total_pages)
      setTotalItems(res.total_items)
      setPage(p)
    } catch {
      setError('No se pudieron cargar las ubicaciones.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(1) }, [load])

  return { locations, page, totalPages, totalItems, loading, error, goToPage: load }
}

// ─── Stats ───────────────────────────────────────────────
export function useStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch(() => setError('No se pudieron cargar las estadísticas.'))
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, error }
}
