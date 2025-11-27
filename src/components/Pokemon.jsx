import { useState, useEffect } from 'react';
import '../styles/Pokemon.css';

export default function Pokemon({ pokemonUrl }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(pokemonUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch Pokémon details');
      } finally {
        setLoading(false);
      }
    }

    if (pokemonUrl) fetchPokemonDetails();
  }, [pokemonUrl]);

  if (loading) return <p className="pokemon-loading">Loading details...</p>;
  if (error) return <p className="pokemon-error">Error: {error}</p>;
  if (!pokemon) return null;

  return (
    <div className="pokemon-detail">
      <div className="pokemon-card">
        <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="pokemon-image" />

        <div className="pokemon-info">
          <div className="info-row">
            <label>Type(s):</label>
            <div className="types">
              {pokemon.types.map((t) => (
                <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                  {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                </span>
              ))}
            </div>
          </div>

          <div className="info-row">
            <label>Weight:</label>
            <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
          </div>

          <div className="info-row">
            <label>Height:</label>
            <span>{(pokemon.height / 10).toFixed(1)} m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
