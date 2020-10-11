import React from 'react';
import './App.css';
import PokemonSearch from './components/PokemonSearch/PokemonSearch';

function App() {
  return (
    <div className="App">
      <PokemonSearch
        name={"Sri"}
        numberOfPokemons={5}
      />
    </div>
  );
}

export default App;
