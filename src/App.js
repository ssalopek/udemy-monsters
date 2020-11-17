import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users") //take response
      .then((response) => response.json()) //convert to JSON format
      .then((users) => this.setState({ monsters: users })); //set 'monsters' to fetched array of 'users'
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  /* Anytime you use the map() function inside of render (or you have list of jsx elements in general) 
  you MUST use key atribute*/
  render() {
    /* set monsters and searchField = to this.state  
      LONGER WAY IS: 
      const monsters = this.state.monsters;
      const searchField = this.state.searchField;
    */
    const { monsters, searchField } = this.state;
    /* use filter function and filter monsters by name -> must use includes() function*/
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}
export default App;
