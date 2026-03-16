import { useStats } from '@/features/simpsons/hooks/useSimpsons'
import { getCharacterImage } from '@/services/simpsonsApi'
import Spinner from '@/components/ui/Spinner'
import './StatsPage.css'

export default function StatsPage() {
  const { stats, loading, error } = useStats()

  if (loading) return (
    <div className="stats-page">
      <div className="page-header"><h1 className="page-title">📊 Estadísticas</h1></div>
      <div className="page-loading"><Spinner label="Calculando datos de Springfield..." /></div>
    </div>
  )

  if (error) return (
    <div className="stats-page"><div className="error-box">😵 {error}</div></div>
  )

  if (!stats) return null

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1 className="page-title">📊 Estadísticas de Springfield</h1>
        <p className="page-sub">Datos reales de la API de Los Simpson</p>
      </div>

      {/* Summary */}
      <div className="summary-grid">
        <SummaryCard emoji="👥" label="Personajes" value={stats.totalCharacters.toLocaleString()} color="#FED90F" />
        <SummaryCard emoji="📺" label="Episodios"  value={stats.totalEpisodes.toLocaleString()}   color="#87CEEB" />
        <SummaryCard emoji="🏙️" label="Ubicaciones" value={stats.totalLocations.toLocaleString()} color="#A5D6A7" />
        <SummaryCard emoji="🍩" label="¡D'oh!" value="∞" color="#FFCC80" />
      </div>

      {/* Featured characters */}
      {stats.featuredCharacters?.length > 0 && (
        <div className="table-card" style={{ marginBottom: 24 }}>
          <h2 className="chart-title">⭐ Primeros Personajes de la API</h2>
          <div className="featured-stats-grid">
            {stats.featuredCharacters.map((c) => (
              <div key={c.id} className="fstat-card">
                <img
                  src={getCharacterImage(c.portrait_path)}
                  alt={c.name}
                  className="fstat-img"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="fstat-name">{c.name}</div>
                <div className="fstat-job">{c.occupation || '—'}</div>
                {c.status && (
                  <span className={`char-status ${c.status === 'Alive' ? 'alive' : 'deceased'}`}>
                    {c.status === 'Alive' ? '💚 Vivo' : '💀 Fallecido'}
                  </span>
                )}
                {c.age && <div className="fstat-age">🎂 {c.age} años</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API info */}
      <div className="table-card">
        <h2 className="chart-title">🌐 Información de la API</h2>
        <div className="api-info-grid">
          <ApiInfoCard label="URL Base" value="https://thesimpsonsapi.com/api" mono />
          <ApiInfoCard label="Autenticación" value="No requerida ✅" />
          <ApiInfoCard label="Formato" value="JSON · REST" />
          <ApiInfoCard label="Imágenes CDN" value="cdn.thesimpsonsapi.com" mono />
          <ApiInfoCard label="Paginación" value="20 items por página" />
          <ApiInfoCard label="Endpoints" value="/characters · /episodes · /locations" mono />
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ emoji, label, value, color }) {
  return (
    <div className="summary-card" style={{ '--sc-color': color }}>
      <div className="sc-emoji">{emoji}</div>
      <div className="sc-value">{value}</div>
      <div className="sc-label">{label}</div>
    </div>
  )
}

function ApiInfoCard({ label, value, mono }) {
  return (
    <div className="api-info-card">
      <div className="api-info-label">{label}</div>
      <div className={`api-info-value ${mono ? 'mono' : ''}`}>{value}</div>
    </div>
  )
}
