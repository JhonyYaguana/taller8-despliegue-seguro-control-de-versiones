export function ApplicationsDrawer({ applications, onClearAll }) {
  return (
    <section className="applications-panel" aria-label="Solicitudes enviadas">
      <div className="panel-header">
        <div>
          <h2>Solicitudes registradas ({applications.length})</h2>
          <p className="pet-subtitle">
            Guardadas localmente en tu navegador para revisar el flujo de adopción.
          </p>
        </div>
        {applications.length > 0 && (
          <button type="button" className="link-danger" onClick={onClearAll}>
            Limpiar historial
          </button>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="empty-state-box">
          <p>Aún no has enviado solicitudes de adopción. Elige una mascota y haz clic en <strong>Solicitar adopción</strong>.</p>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app.id} className="application-item">
              <div className="application-top">
                <span className="application-pet">
                  {app.petEmoji} <strong>{app.petName}</strong> ({app.petSpecies})
                </span>
                <span className="status-pill">En revisión</span>
              </div>
              <p className="application-detail">
                <strong>Solicitante:</strong> {app.fullName} · {app.email} · {app.phone}
              </p>
              <p className="application-detail">
                <strong>Vivienda:</strong> {app.housingType} · <strong>Fecha:</strong> {app.createdAt}
              </p>
              {app.message && <p className="application-note">“{app.message}”</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
