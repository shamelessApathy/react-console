import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class Students extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render(container)
	{
		return (
			<table>
			{this.props.value}
			</table>
			);
	}
}
class Console extends React.Component {
	constructor(props)
	{
		super(props);
		this.state ={
			students: 0,
		}
	}
	renderStudents()
	{
		if (this.state.students !== 0)
		{
		
				let table = []
				let children = []
				table.push(<thead><tr><th>ID</th><th>NAME</th></tr></thead>);
			 	//Inner loop to create children
      			for (let j = 0; j < this.state.students.length; j++) 
      			{
        			children.push(<tr><td>{this.state.students[j].id}</td><td>{this.state.students[j].name}</td></tr>);
      			}
      			table.push(children);
      			return (
      				<Students 
      					value={table}
      				/>
      			);
		}
	}
	setStudents(students)
	{
		this.setState({
			students: students
		})
		console.log(this.state.students);
		console.log('length: ' + this.state.students.length);

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
