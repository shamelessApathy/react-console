import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class Students extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'Query':''
		}

	}
	studentQuery()
	{
		  axios.get('http://hogwarts.local/students/view')
    .then(response => console.log(response))
	}
	render()
	{
		return (
		<div>
			<div className="students">
				<button onClick={() => this.studentQuery()}>View Students</button>
			</div>
		</div>
		);
	}
}
class Console extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = null;
	}
	render()
	{
		return (
		<div>
			<div className="console">
				<h4 className="title">React Console</h4>
				<Students />
			</div>
		</div>
		);
	}
}


ReactDOM.render(
  <Console />,
  document.getElementById('root')
);
