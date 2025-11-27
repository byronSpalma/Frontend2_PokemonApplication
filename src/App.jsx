import { useState } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import PokemonApplication from './components/PokemonApplication';

function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <div className="app">
      {!showApp ? (
        <Welcome onStart={() => setShowApp(true)} />
      ) : (
        <PokemonApplication />
      )}
    </div>
  );
}

export default App;
