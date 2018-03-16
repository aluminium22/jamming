import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term: this.getSessionTerm()
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  getSessionTerm(){
    let sTerm = sessionStorage.getItem("com.jammming.searchTerm")
    let termToSet = sTerm === null ? '': sTerm;
    this.setState({term: termToSet});
  }
  setSessionTerm(value){
    sessionStorage.setItem("com.jammming.searchTerm", value);
  }
  search(event){
    this.props.onSearch(this.state.term);
    this.setSessionTerm(this.state.term);
    event.preventDefault();
  }
  handleTermChange(event){
    this.setState({term: event.target.value});
  }
  render(){
    return(
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" value={this.state.term} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}


export default SearchBar;
