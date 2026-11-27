import { useState } from "react";

export function AdoptionModal({ pet, onClose, onSubmitApplication }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    housingType: "Casa con patio",
    experience: "",
    message: ""
  });
  const [error, setError] = useState("");

  if (!pet) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Por favor completa tu nombre, correo electrónico y teléfono.");
      return;
    }
    setError("");
    onSubmitApplication({
      id: Date.now(),
      petId: pet.id,
      petName: pet.name,
      petSpecies: pet.species,
      petEmoji: pet.emoji,
      ...formData,
      createdAt: new Date().toLocaleString("es-EC", {
        dateStyle: "medium",
        timeStyle: "short"
      })
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span className="modal-tag">Solicitud de adopción</span>
            <h2 id="modal-title">
              {pet.emoji} Adoptar a {pet.name}
            </h2>
            <p className="pet-subtitle">
              {pet.species} · {pet.age} · {pet.location}
            </p>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="fullName">Nombre completo *</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Ej. Valeria Mendoza"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="valeria@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono / WhatsApp *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="099 123 4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="housingType">Tipo de vivienda</label>
            <select
              id="housingType"
              name="housingType"
              value={formData.housingType}
              onChange={handleChange}
            >
              <option value="Casa con patio">Casa con patio</option>
              <option value="Casa sin patio">Casa sin patio</option>
              <option value="Departamento">Departamento</option>
              <option value="Quinta / Terreno cercado">Quinta / Terreno cercado</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experiencia previa con mascotas</label>
            <input
              id="experience"
              name="experience"
              type="text"
              placeholder="Ej. He tenido perros y gatos antes"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">¿Por qué deseas adoptar a {pet.name}?</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Cuéntanos sobre tu rutina y el hogar que le ofrecerías..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary-btn">
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
