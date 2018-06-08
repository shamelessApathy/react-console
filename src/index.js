import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Console extends React.Component {
	constructor(props){
	  super(props);
	}
	search() {
	let searchText = document.getElementById('search-field').value;
	alert(searchText);
	}
	render(){
		return (
			<div class='console'>
				<h4 class='title'>React Console</h4>
				<input name='search-field' id='search-field' type='text'/>
				<button name='search-button' id='search-button' onClick={() => this.search()}>Search</button>
			</div>
			);
	}
}


ReactDOM.render(
  <Console />,
  document.getElementById('root')
);
