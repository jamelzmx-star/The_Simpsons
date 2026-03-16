import { useState } from 'react'
import { useLocations } from '@/features/simpsons/hooks/useSimpsons'
import { getLocationImage } from '@/services/simpsonsApi'
import Spinner from '@/components/ui/Spinner'
import Pagination from '@/components/ui/Pagination'
import './LocationsPage.css'

export default function LocationsPage() {
  const { locations, page, totalPages, totalItems, loading, error, goToPage } = useLocations()
  const [search, setSearch] = useState('')

  const filtered = locations.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="locations-page">
      <div className="page-header">
        <h1 className="page-title">🏙️ Ubicaciones de Springfield</h1>
        <p className="page-sub">{totalItems.toLocaleString()} lugares · Página {page} de {totalPages}</p>
      </div>

      <div className="char-controls">
        <input
          className="search-input"
          placeholder="🔍 Buscar ubicación..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <div className="page-loading"><Spinner label="Explorando Springfield..." /></div>}
      {error && <div className="error-box">😵 {error}</div>}

      {!loading && (
        <>
          <div className="locations-grid">
            {filtered.map((loc, i) => (
              <div
                key={loc.id}
                className="loc-card"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="loc-img-wrap">
                  {loc.image_path ? (
                    <img
                      src={getLocationImage(loc.image_path)}
                      alt={loc.name}
                      className="loc-img"
                      loading="lazy"
                      onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                    />
                  ) : null}
                  <div className="loc-img-fallback" style={{ display: loc.image_path ? 'none' : 'flex' }}>🏠</div>
                </div>
                <div className="loc-info">
                  <div className="loc-name">{loc.name}</div>
                  {loc.description && (
                    <div className="loc-desc">{loc.description.substring(0, 100)}{loc.description.length > 100 ? '…' : ''}</div>
                  )}
                </div>
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
