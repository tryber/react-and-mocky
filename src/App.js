import React from 'react'
import './App.css';
import CharacterCard from './components/CharacterCard';
import Loading from './components/Loading';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      characters:[],
      filteredCharacters:[],
      isLoading:true,
      search:''
    }
  }
  getCharacters = async () => {
    const endpoint = 'https://rickandmortyapi.com/api/character';
    const {results} = await fetch(endpoint).then(response => response.json())
    this.setState({isLoading:false, characters:results, filteredCharacters:results})
  }


  componentDidMount(){
    this.getCharacters()
  }

  handleOnChange = ({target:{value}}) => {
    this.setState({search:value})
  }

  handleFilterCharacters = (e) => {
    e.preventDefault()
    const { characters, search} = this.state;
    const filteredArray = characters.filter(({name})=> name.toUpperCase().includes(search.toUpperCase()))
    this.setState({filteredCharacters:filteredArray})
  }

  render(){
    const {filteredCharacters, isLoading} = this.state
    return (
      <div className="App">
        <form onSubmit={this.handleFilterCharacters}>
          <input type='text' placeholder='Rick Sanchez...' onChange={this.handleOnChange}/>
          <button type='submit' >Buscar</button>
        </form>
        {
          isLoading ? <Loading/> : 
          <section className='card-list'>
            {filteredCharacters.map(item=> <CharacterCard character={item} key={Math.random()} />)}
          </section>
        }
      </div>
    );
  }
}

export default App;
