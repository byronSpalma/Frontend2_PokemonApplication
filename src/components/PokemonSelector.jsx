import { useState } from 'react';
import '../styles/PokemonSelector.css';

export default function PokemonSelector({ pokemonList, onSelectPokemon }) {
  const [selectedId, setSelectedId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedId) {
      const selected = pokemonList.find((p) => p.name === selectedId);
      if (selected) onSelectPokemon(selected);
    }
  };

  return (
    <div className="pokemon-selector">
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemon-dropdown">Choose a Pokémon:</label>
        <select id="pokemon-dropdown" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">-- Select a Pokémon --</option>
          {pokemonList.map((pokemon) => (
            <option key={pokemon.name} value={pokemon.name}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!selectedId}>
          Get Pokémon
        </button>
      </form>
    </div>
  );
}
