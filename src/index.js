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
			<div>
				<table>
				{this.props.value}
				</table>
			</div>
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
	
	createStudent()
	{
		console.log("inside createStudent() function");
		let studentName = document.getElementById('student-name');
		if (studentName.value !== "")
		{
			let student = studentName.value;
			axios.post("http://localhost:3001/students/create", {student})
			  .then(response => console.log(response))
		}
	}

	renderStudents()
	{
		if (this.state.students !== 0)
		{
		
				let table = []
				let children = []
				table.push(<thead key="table-head"><tr key="heading-row"><th key="id-head">ID</th><th key="name-head">NAME</th><th key="options-head">OPTIONS</th></tr></thead>);
			 	//Inner loop to create children
      			for (let j = 0; j < this.state.students.length; j++) 
      			{
        			children.push(<tr key={"student" + j.toString()}><td key="id">{this.state.students[j].id}</td><td key={"name" + j.toString()}>{this.state.students[j].name}</td><td key={"options"+j.toString()}><button key={"update" + j.toString}>Update</button><button key={"delete"+j}>Delete</button></td></tr>);
      			}
      			table.push(<tbody key="tbody">{children}</tbody>);

      			return (
      				<div>
	      				<Students 
	      					value={table}
	      				/>
	      				<button onClick={()=> this.createStudent()}>Create New Student</button><input className="student-name" id="student-name" placeholder="New Student Name Here" type="text"/>
      				</div>
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
