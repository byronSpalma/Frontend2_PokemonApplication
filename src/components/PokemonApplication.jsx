import { useState, useEffect } from 'react';
import PokemonSelector from './PokemonSelector';
import Pokemon from './Pokemon';
import '../styles/PokemonApplication.css';

export default function PokemonApplication() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchAllPokemon() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setAllPokemon(data.results || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch Pokémon');
      } finally {
        setLoading(false);
      }
    }

    fetchAllPokemon();
  }, []);

  return (
    <div className="pokemon-application">
      <header className="app-header">
        <h1>Pokédex</h1>
        <p>Select a Pokémon to view details</p>
      </header>

      <main className="app-content">
        {loading && <p className="status-message">Loading Pokémon data...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        {!loading && !error && (
          <>
            <PokemonSelector pokemonList={allPokemon} onSelectPokemon={setSelectedPokemon} />

            {selectedPokemon && <Pokemon pokemonUrl={selectedPokemon.url} />}
          </>
        )}
      </main>
    </div>
  );
}
