import React, { useState,useEffect} from 'react'
import Search from './Components/Search'
import Pokemons from './Components/Pokemons'
import Pagination from './Components/Pagination'
import "./App.css"

function App() {
  const [searchPokemon, setSearchPokemon] = useState("")
  const [pokemonStats, setPokemonStats] = useState({
    pokemonsName: "",
    avatar: "",
    stats1Name:"",
    stats1: "",
    stats2Name:"",
    stats2: "",
    type: "",
    weight: "",
    items1: "",
    items2: "",
    moves:""
  })
  const [isPokemonSearched, setIsPokemonSearched] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [currentUrl,setCurrentUrl] =useState( "https://pokeapi.co/api/v2/pokemon")
  const [prevUrl,setPrevUrl] =useState( "")
  const [nextUrl, setNextUrl] = useState("")
  const [loading,setLoading]=useState(true)
  
  const handleChange = (e) => {
    setSearchPokemon(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPokemonSearched(true)
    
    const name = searchPokemon.toLowerCase()
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${name}`
      const response = await fetch(url)
      const data = await response.json();
      setPokemonStats({
        pokemonsName: data.species.name,
        avatar: data.sprites.front_default,
        stats1Name: data.stats[0].stat.name,
        stats1: data.stats[0].base_stat,
        stats2Name: data.stats[1].stat.name,
        stats2: data.stats[1].base_stat,
        type: data.types[0].type.name,
        weight: data.weight,
        items1: data.held_items[0].item.name,
        items2: data.held_items[1].item.name,
        moves: data.moves[0].move.name
      })
      setSearchPokemon("")
    } catch (error) {
      alert(`Pokemon not found`)
    }
  }
  useEffect(() => {
    setLoading(true)
    //use async await function to prevent race condition
    const fetchAllPokemons = async () => {
      const url = currentUrl
      const response = await fetch(url)
      const data = await response.json();
      setLoading(false)
      setPokemons(data.results)
      setPrevUrl(data.previous)
      setNextUrl(data.next)
    }
    fetchAllPokemons()
  }, [currentUrl])

  const prevPage = async() => {
    setCurrentUrl(prevUrl)
  }
  const nextPage = async() => {
    setCurrentUrl(nextUrl)
  }
  const displayPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase()));
  
  return (
    <div className="app">
      { loading && <div className="loading"><h1>Loading...</h1></div>}
      {!isPokemonSearched && <div className="mainContainer">
          <h1>Pokemon</h1>
          <Search handleChange={handleChange} handleSubmit={handleSubmit} />
          <Pokemons pokemons={displayPokemons} />
          <Pagination prevPage={prevUrl?prevPage:null}
            nextPage={nextUrl?nextPage:null} />
        </div>
      }
      {isPokemonSearched && <div className="pokemonDetails">
          <h1>{pokemonStats.pokemonsName.charAt(0).toUpperCase()+ pokemonStats.pokemonsName.slice(1)}</h1>
          <img src={pokemonStats.avatar} alt="Avatar" />
          <p>{pokemonStats.type.charAt(0).toUpperCase()+ pokemonStats.type.slice(1)}</p>
          <p>Weight: { pokemonStats.weight}</p>
          <p>{pokemonStats.stats1Name.charAt(0).toUpperCase()+ pokemonStats.stats1Name.slice(1)}: Stats Size {pokemonStats.stats1 }</p>
          <p>{pokemonStats.stats2Name.charAt(0).toUpperCase()+ pokemonStats.stats2Name.slice(1)}: Stats Size {pokemonStats.stats2}</p>
          <p>Items Owned: {pokemonStats.items1} and {pokemonStats.items2}</p>
          <p>{pokemonStats.pokemonsName.charAt(0).toUpperCase()+ pokemonStats.pokemonsName.slice(1)} moves: { pokemonStats.moves}</p> 
          <button onClick={ ()=>setIsPokemonSearched(!isPokemonSearched)}>Back Home</button>
        </div>
      }
    </div>  

  )
}

export default App
