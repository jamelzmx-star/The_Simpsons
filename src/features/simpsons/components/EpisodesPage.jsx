import { useState } from 'react'
import { useEpisodes } from '@/features/simpsons/hooks/useSimpsons'
import { getEpisodeImage } from '@/services/simpsonsApi'
import Spinner from '@/components/ui/Spinner'
import Pagination from '@/components/ui/Pagination'
import './EpisodesPage.css'

export default function EpisodesPage() {
  const { episodes, page, totalPages, totalItems, loading, error, goToPage } = useEpisodes()
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = episodes.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    String(e.season).includes(search)
  )

  return (
    <div className="episodes-page">
      <div className="page-header">
        <h1 className="page-title">📺 Episodios de Los Simpson</h1>
        <p className="page-sub">{totalItems.toLocaleString()} episodios · Página {page} de {totalPages}</p>
      </div>

      <div className="char-controls">
        <input
          className="search-input"
          placeholder="🔍 Buscar episodio o temporada..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <div className="page-loading"><Spinner label="Cargando episodios..." /></div>}
      {error && <div className="error-box">😵 {error}</div>}

      {!loading && (
        <>
          <div className="episodes-list">
            {filtered.map((ep, i) => (
              <div
                key={ep.id}
                className={`episode-card ${expanded === ep.id ? 'open' : ''}`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <button className="ep-header" onClick={() => setExpanded(expanded === ep.id ? null : ep.id)}>
                  <div className="ep-img-wrap">
                    <img
                      src={getEpisodeImage(ep.image_path)}
                      alt={ep.name}
                      className="ep-img"
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <div className="ep-info">
                    <div className="ep-name">{ep.name}</div>
                    <div className="ep-meta">
                      <span className="ep-badge">T{ep.season}</span>
                      <span className="ep-badge">Ep. {ep.episode_number}</span>
                      <span className="ep-date">{ep.airdate}</span>
                    </div>
                  </div>
                  <span className="ep-arrow">{expanded === ep.id ? '▲' : '▼'}</span>
                </button>
                {expanded === ep.id && (
                  <div className="ep-body">
                    {ep.description && <p className="ep-desc">{ep.description}</p>}
                    {ep.synopsis && (
                      <div className="ep-synopsis">
                        <strong>Sinopsis:</strong> {ep.synopsis}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!search && (
            <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
          )}
        </>
      )}
    </div>
  )
}
