export function PetCard({ pet, isFavorite, onToggleFavorite, onSelectPet }) {
  return (
    <article className="pet-card">
      <div className="pet-card-media" style={{ backgroundColor: pet.accentBg }}>
        <span className="pet-emoji" role="img" aria-label={pet.species}>
          {pet.emoji}
        </span>
        <button
          type="button"
          className={`fav-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(pet.id)}
          aria-label={isFavorite ? `Quitar a ${pet.name} de favoritos` : `Guardar a ${pet.name} en favoritos`}
          title={isFavorite ? "En favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="pet-card-body">
        <div className="pet-card-header">
          <div>
            <h3>{pet.name}</h3>
            <p className="pet-subtitle">
              {pet.species} · {pet.breed}
            </p>
          </div>
          <span className="size-badge">{pet.size}</span>
        </div>

        <p className="pet-meta">
          {pet.age} · {pet.gender} · {pet.location}
        </p>

        <p className="pet-desc">{pet.description}</p>

        <div className="traits-row">
          {pet.traits.map((trait) => (
            <span key={trait} className="trait-chip">
              {trait}
            </span>
          ))}
        </div>

        <div className="pet-card-footer">
          <span className="health-status">
            {pet.vaccinated ? "✓ Vacunado/a" : "En esquema"}
            {pet.sterilized ? " · ✓ Esterilizado/a" : ""}
          </span>
          <button type="button" className="primary-btn" onClick={() => onSelectPet(pet)}>
            Solicitar adopción
          </button>
        </div>
      </div>
    </article>
  );
}
