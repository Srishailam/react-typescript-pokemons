import React, { Component } from 'react'
import UserInterface from '../../interfaces/UserInterface';

interface SearchState {
  error: boolean;
  pokemon: Pokemon | any
}
interface Pokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

export default class PokemonSearch extends Component<UserInterface, SearchState> {

  pokemonRef: React.RefObject<HTMLInputElement>

  constructor(props: UserInterface) {
    super(props);
    this.state = {
      error: false,
      pokemon: null
    }
    this.pokemonRef = React.createRef();
  }

  onSearchClick = (): void => {
    const inputValue = this.pokemonRef.current?.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            error: true
          })
        }
        res.json().then(data => {
          this.setState({
            error: false,
            pokemon: {
              numberOfAbilities: data.abilities.length,
              name: data.name,
              baseExperience: data.base_experience,
              imageUrl: data.sprites.front_default
            }
          })
        })
      })
  }

  render() {
    const { name: userName, numberOfPokemons } = this.props;
    const {
      error,
      pokemon
    } = this.state;

    let resultMarkup;
    if (error) {
      resultMarkup = <p>Pokemon not found, please try again</p>
    } else if (this.state.pokemon) {
      resultMarkup =
        <div className="">
          <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
          <p>
            {pokemon.name} has {pokemon.numberOfAbilities} abilities and {pokemon.baseExperience} base experience points
          </p>
        </div>
    }
    return (
      <div className="PokemonSearch">
        <p> User has {userName} {numberOfPokemons} pokemons</p>
        <input
          type="text"
          ref={this.pokemonRef}
        />
        <button onClick={this.onSearchClick} className="my-button">Search</button>
        {resultMarkup}
      </div>
    )
  }
}

