import { useEffect, useMemo, useState } from "react";
import { PETS_DATA } from "./data/pets";
import { PetCard } from "./components/PetCard";
import { AdoptionModal } from "./components/AdoptionModal";
import { ApplicationsDrawer } from "./components/ApplicationsDrawer";

const STORAGE_FAVS_KEY = "huellitas_favorites_v1";
const STORAGE_APPS_KEY = "huellitas_applications_v1";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("Todos");
  const [sizeFilter, setSizeFilter] = useState("Todos");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_APPS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedPet, setSelectedPet] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAVS_KEY, JSON.stringify(favorites));
    } catch {
      // Ignorar errores de almacenamiento en entornos restringidos
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_APPS_KEY, JSON.stringify(applications));
    } catch {
      // Ignorar errores de almacenamiento en entornos restringidos
    }
  }, [applications]);

  const showToast = (msg) => {
    setToastMessage(msg);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToastMessage(""), 3200);
  };

  const handleToggleFavorite = (petId) => {
    setFavorites((prev) => {
      const exists = prev.includes(petId);
      const next = exists ? prev.filter((id) => id !== petId) : [...prev, petId];
      showToast(exists ? "Eliminado de favoritos" : "Agregado a favoritos");
      return next;
    });
  };

  const handleSubmitApplication = (newApp) => {
    setApplications((prev) => [newApp, ...prev]);
    showToast(`¡Solicitud enviada para ${newApp.petName}!`);
  };

  const handleClearApplications = () => {
    setApplications([]);
    showToast("Historial de solicitudes limpiado");
  };

  const filteredPets = useMemo(() => {
    return PETS_DATA.filter((pet) => {
      const matchesSpecies = speciesFilter === "Todos" || pet.species === speciesFilter;
      const matchesSize = sizeFilter === "Todos" || pet.size === sizeFilter;
      const matchesFav = !onlyFavorites || favorites.includes(pet.id);
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        pet.name.toLowerCase().includes(query) ||
        pet.breed.toLowerCase().includes(query) ||
        pet.location.toLowerCase().includes(query) ||
        pet.traits.some((t) => t.toLowerCase().includes(query));

      return matchesSpecies && matchesSize && matchesFav && matchesQuery;
    });
  }, [searchQuery, speciesFilter, sizeFilter, onlyFavorites, favorites]);

  const resetFilters = () => {
    setSearchQuery("");
    setSpeciesFilter("Todos");
    setSizeFilter("Todos");
    setOnlyFavorites(false);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-inner">
          <div className="brand-row">
            <span className="brand-logo" aria-hidden="true">🐾</span>
            <span className="brand-name">Huellitas</span>
            <span className="brand-tag">Adopción Responsable</span>
          </div>
          <h1>Encuentra a tu próximo mejor amigo</h1>
          <p className="hero-subtitle">
            Explora perros y gatos listos para un nuevo hogar, filtra por tamaño o especie y
            envía tu solicitud de adopción en minutos.
          </p>

          <div className="stats-bar">
            <div className="stat-card">
              <strong>{PETS_DATA.length}</strong>
              <span>Mascotas disponibles</span>
            </div>
            <div className="stat-card">
              <strong>{favorites.length}</strong>
              <span>Favoritos</span>
            </div>
            <div className="stat-card">
              <strong>{applications.length}</strong>
              <span>Solicitudes</span>
            </div>
          </div>
        </div>
      </header>

      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      <main className="main-content">
        <section className="filters-bar" aria-label="Filtros de búsqueda">
          <div className="search-box">
            <input
              type="search"
              placeholder="Buscar por nombre, raza, ciudad o rasgo (ej. juguetona, Durán)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar mascotas"
            />
          </div>

          <div className="filter-controls">
            <div className="segmented-group" role="group" aria-label="Filtrar por especie">
              {["Todos", "Perro", "Gato"].map((species) => (
                <button
                  key={species}
                  type="button"
                  className={`seg-btn ${speciesFilter === species ? "active" : ""}`}
                  onClick={() => setSpeciesFilter(species)}
                >
                  {species === "Todos" ? "Todos" : `${species}s`}
                </button>
              ))}
            </div>

            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              aria-label="Filtrar por tamaño"
              className="filter-select"
            >
              <option value="Todos">Tamaño: Todos</option>
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>

            <button
              type="button"
              className={`fav-filter-btn ${onlyFavorites ? "active" : ""}`}
              onClick={() => setOnlyFavorites((prev) => !prev)}
            >
              {onlyFavorites ? "♥ Solo favoritos" : "♡ Favoritos"}
            </button>

            {(searchQuery || speciesFilter !== "Todos" || sizeFilter !== "Todos" || onlyFavorites) && (
              <button type="button" className="reset-btn" onClick={resetFilters}>
                Limpiar filtros
              </button>
            )}
          </div>
        </section>

        <section aria-label="Listado de mascotas">
          <div className="section-heading">
            <h2>Mascotas en adopción ({filteredPets.length})</h2>
          </div>

          {filteredPets.length === 0 ? (
            <div className="empty-state-box">
              <p>No encontramos mascotas con los filtros seleccionados.</p>
              <button type="button" className="secondary-btn" onClick={resetFilters}>
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="pets-grid">
              {filteredPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  isFavorite={favorites.includes(pet.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectPet={(p) => setSelectedPet(p)}
                />
              ))}
            </div>
          )}
        </section>

        <ApplicationsDrawer
          applications={applications}
          onClearAll={handleClearApplications}
        />
      </main>

      <footer className="footer">
        <p>Huellitas · Proyecto React + Vite listo para desarrollo local con npm y despliegue en AWS Amplify.</p>
      </footer>

      <AdoptionModal
        pet={selectedPet}
        onClose={() => setSelectedPet(null)}
        onSubmitApplication={handleSubmitApplication}
      />
    </div>
  );
}
