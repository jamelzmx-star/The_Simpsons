import { useEffect } from 'react'
import { getCharacterImage } from '@/services/simpsonsApi'
import './CharacterModal.css'

export default function CharacterModal({ character, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-avatar-wrap">
            <img
              src={getCharacterImage(character.portrait_path)}
              alt={character.name}
              className="modal-avatar"
              onError={(e) => { e.target.style.display='none' }}
            />
          </div>
          <div className="modal-title-wrap">
            <h2 className="modal-char-name">{character.name}</h2>
            <p className="modal-char-sub">{character.occupation || 'Springfield'}</p>
            {character.status && (
              <span className={`char-status ${character.status === 'Alive' ? 'alive' : 'deceased'}`}>
                {character.status === 'Alive' ? '💚 Vivo' : '💀 Fallecido'}
              </span>
            )}
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Info pills */}
          <div className="modal-pills">
            {character.age && <span className="pill active">🎂 {character.age} años</span>}
            {character.gender && <span className="pill active">👤 {character.gender}</span>}
            {character.birthdate && <span className="pill active">📅 {character.birthdate}</span>}
          </div>

          {/* Description */}
          {character.description && (
            <div className="modal-section">
              <h3 className="modal-section-title">📖 Descripción</h3>
              <p className="modal-description">{character.description}</p>
            </div>
          )}

          {/* Phrases */}
          {character.phrases?.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">💬 Frases célebres</h3>
              <div className="modal-quotes-list">
                {character.phrases.map((phrase, i) => (
                  <div key={i} className="modal-quote-item">
                    <span className="modal-quote-num">{i + 1}</span>
                    <p className="modal-quote-text">"{phrase}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* First appearance */}
          {character.first_appearance_ep && (
            <div className="modal-section">
              <h3 className="modal-section-title">📺 Primera aparición</h3>
              <div className="modal-episode-card">
                <div className="mep-info">
                  <div className="mep-name">{character.first_appearance_ep.name}</div>
                  <div className="mep-meta">
                    Temporada {character.first_appearance_ep.season} · Ep. {character.first_appearance_ep.episode_number} · {character.first_appearance_ep.airdate}
                  </div>
                  <div className="mep-synopsis">{character.first_appearance_ep.synopsis}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
