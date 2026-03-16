import { useAuth } from '@/store/AuthContext'
import { useStats } from '@/features/simpsons/hooks/useSimpsons'
import { NavLink } from 'react-router-dom'
import AnimatedBackground from '@/components/animated/AnimatedBackground'
import Spinner from '@/components/ui/Spinner'
import { getCharacterImage } from '@/services/simpsonsApi'
import './Dashboard.css'

const QUICK_LINKS = [
  { to: '/characters', emoji: '👥', label: 'Personajes',  desc: '1,182+ personajes de Springfield' },
  { to: '/episodes',   emoji: '📺', label: 'Episodios',   desc: '768+ episodios documentados' },
  { to: '/locations',  emoji: '🏙️', label: 'Ubicaciones', desc: '477+ lugares de Springfield' },
  { to: '/stats',      emoji: '📊', label: 'Estadísticas', desc: 'Resumen general de datos' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const { stats, loading } = useStats()

  return (
    <div className="dashboard-page">
      <AnimatedBackground />
      <div className="dashboard-inner">
        <div className="dashboard-hero">
          <div className="hero-text">
            <h1 className="hero-greeting">
              ¡Hola, <span className="hero-name">{user?.name}!</span>
            </h1>
            <p className="hero-sub">Bienvenido/a a Springfield. ¿Qué quieres explorar hoy?</p>
          </div>
          <div className="hero-character">🧔‍♂️</div>
        </div>

        {loading ? (
          <div className="stats-loading"><Spinner label="Cargando datos de Springfield..." /></div>
        ) : stats ? (
          <div className="stats-row">
            <StatCard emoji="👥" value={stats.totalCharacters.toLocaleString()} label="Personajes"  color="yellow" />
            <StatCard emoji="📺" value={stats.totalEpisodes.toLocaleString()}   label="Episodios"   color="blue"   />
            <StatCard emoji="🏙️" value={stats.totalLocations.toLocaleString()}  label="Ubicaciones" color="green"  />
            <StatCard emoji="🍩" value="100%" label="¡Ay caramba!" color="orange" />
          </div>
        ) : null}

        <h2 className="section-title">🗺️ Explora Springfield</h2>
        <div className="quick-links">
          {QUICK_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="quick-card">
              <span className="qcard-emoji">{l.emoji}</span>
              <div>
                <div className="qcard-label">{l.label}</div>
                <div className="qcard-desc">{l.desc}</div>
              </div>
              <span className="qcard-arrow">→</span>
            </NavLink>
          ))}
        </div>

        {stats?.featuredCharacters?.length > 0 && (
          <div className="top-section">
            <h2 className="section-title">⭐ Personajes Destacados</h2>
            <div className="featured-chars">
              {stats.featuredCharacters.map((c) => (
                <NavLink key={c.id} to="/characters" className="featured-char-card">
                  <img
                    src={getCharacterImage(c.portrait_path)}
                    alt={c.name}
                    className="featured-char-img"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div className="featured-char-name">{c.name}</div>
                  <div className="featured-char-job">{c.occupation || '—'}</div>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ emoji, value, label, color }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-emoji">{emoji}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
