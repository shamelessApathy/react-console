import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class Student extends React.Component {

	render()
	{
		return(
			<p>This is a student</p>

			);
	}
}
class Console extends React.Component {
	constructor(props)
	{
		super(props);
		this.state ={
			students: [],
		}
	}
	renderStudents()
	{
		for (let student of this.state.students)
		{
			<Student />
		}
	}
	setStudents(students)
	{
		this.setState({
			students: students
		})
		console.log(this.state.students);
		this.forceUpdate();

	}
	getStudents()
	{
		console.log('butotn cliciked');
		  axios.get('http://localhost:3001/students')
    	.then(response => this.setStudents(response.data))
	}
	getClasses()
	{
		console.log('class button clicked');
			axios.get('http://localhost:3001/courses')
			.then(response => console.log(response))
	}
	render()
	{
		return (
		<div>
			<div className="console">
				<h4 className="title">React Console</h4>
				<button onClick={()=> this.getStudents()}>Get Students</button>
				<button onClick={() => this.getClasses()}>Get Classes</button>
				{this.renderStudents()}
			</div>
		</div>
		);
	}
}


ReactDOM.render(
  <Console />,
  document.getElementById('root')
);
