import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class Buttons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'Query':''
		}
		this.students = [];

	}
	studentQuery()
	{
		console.log('butotn cliciked');
		  axios.get('http://localhost:3001/students')
    	.then(response => console.log(response))
	}
	classQuery()
	{
		console.log('class button clicked');
			axios.get('http://localhost:3001/courses')
			.then(response => console.log(response))
	}
	render()
	{
		return (
		<div>
			<div className="students">
				<button onClick={() => this.studentQuery()}>View Students</button>
			</div>
			<div className="classes">
				<button onClick={() => this.classQuery()}>View Courses</button>
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
				<Buttons />
			</div>
		</div>
		);
	}
}


ReactDOM.render(
  <Console />,
  document.getElementById('root')
);
