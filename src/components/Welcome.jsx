import '../styles/Welcome.css';

export default function Welcome({ onStart }) {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="pokemon-logo">
          <h1>GEN 1 POKÉDEX PROGRAM</h1>
        </div>

        <p className="welcome-text">Welcome to the World of Pokémon</p>

        <button className="start-button" onClick={onStart}>
          Start Pokemon App
        </button>
      </div>
    </div>
  );
}
