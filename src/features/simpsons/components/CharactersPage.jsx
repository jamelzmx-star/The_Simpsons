import { useState } from 'react'
import { useCharacters } from '@/features/simpsons/hooks/useSimpsons'
import { getCharacterImage } from '@/services/simpsonsApi'
import Spinner from '@/components/ui/Spinner'
import Pagination from '@/components/ui/Pagination'
import CharacterModal from './CharacterModal'
import './Characters.css'

export default function CharactersPage() {
  const { characters, page, totalPages, totalItems, loading, error, goToPage } = useCharacters()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.occupation || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="characters-page">
      <div className="page-header">
        <h1 className="page-title">👥 Personajes de Springfield</h1>
        <p className="page-sub">{totalItems.toLocaleString()} personajes en total · Página {page} de {totalPages}</p>
      </div>

      <div className="char-controls">
        <input
          className="search-input"
          placeholder="🔍 Buscar por nombre u ocupación..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <div className="page-loading"><Spinner label="Conociendo a los personajes..." /></div>}
      {error && <div className="error-box">😵 {error}</div>}

      {!loading && (
        <>
          <div className="characters-grid">
            {filtered.map((char, i) => (
              <button
                key={char.id}
                className="char-card"
                style={{ animationDelay: `${i * 0.03}s` }}
                onClick={() => setSelected(char)}
              >
                <div className="char-avatar-wrap">
                  <img
                    src={getCharacterImage(char.portrait_path)}
                    alt={char.name}
                    className="char-avatar"
                    loading="lazy"
                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                  />
                  <div className="char-avatar-fallback" style={{display:'none'}}>🧑</div>
                </div>
                <div className="char-info">
                  <div className="char-name">{char.name}</div>
                  <div className="char-quote-count">{char.occupation || 'Springfield'}</div>
                </div>
                {char.status && (
                  <div className={`char-status ${char.status === 'Alive' ? 'alive' : 'deceased'}`}>
                    {char.status === 'Alive' ? '💚 Vivo' : '💀 Fallecido'}
                  </div>
                )}
                {char.phrases?.[0] && (
                  <div className="char-preview">"{char.phrases[0]}"</div>
                )}
              </button>
            ))}
          </div>

          {!search && (
            <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
          )}
        </>
      )}

      {selected && (
        <CharacterModal character={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
