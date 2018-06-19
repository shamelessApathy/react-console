import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

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
				<table className="students">
				{this.props.value}
				</table>
			</div>
			); 
	}
}

class Courses extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render(container)
	{
		return (
			<div>
				<table className="courses">
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
			courses: 0,
		}
	}
	checkStudentResponse(response)
	{
		if (response.data === "success")
		{
			console.log("got a success message!");
			this.getStudents();
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
			  .then(response => this.checkStudentResponse(response))
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
        			children.push(<tr key={"student" + j.toString()}><td key="id">{this.state.students[j].id}</td><td key={"name" + j.toString()}>{this.state.students[j].name}</td><td key={"options"+j.toString()}><button data-id={this.state.students[j].id} key={"update" + j.toString}>Update</button><button data-id={this.state.students[j].id} key={"delete"+j}>Delete</button></td></tr>);
      			}
      			table.push(<tbody key="tbody">{children}</tbody>);

      			return (
      				<div>
	      				<Students 
	      					value={table}
	      				/>
	      				<button className="student-new-button" onClick={()=> this.createStudent()}>Create New Student</button><input className="student-name" id="student-name" placeholder="New Student Name Here" type="text"/>
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
	getCourses()
	{
		console.log('class button clicked');
			axios.get('http://localhost:3001/courses')
			.then(response => this.setCourses(response))
	}
	setCourses(response)
	{
		let courses = response.data;
		this.setState({
			courses: courses
		})
		console.log(this.state.courses);
		console.log("length: " + this.state.courses.length);
	}
	renderCourses()
	{
		if (this.state.courses !== 0)
		{
			console.log("courses state no longer equals 0");
			let table = []
			let children = []
			table.push(<thead key="table-head"><tr key="heading-row"><th key="id-head">ID</th><th key="name-head">NAME</th><th key="options-head">OPTIONS</th></tr></thead>);
			//Inner loop to create children
      		for (let j = 0; j < this.state.courses.length; j++) 
      		{
        		children.push(<tr key={"student" + j.toString()}><td key="id">{this.state.courses[j].id}</td><td key={"name" + j.toString()}>{this.state.courses[j].name}</td><td key={"options"+j.toString()}><button data-id={this.state.courses[j].id} key={"update" + j.toString}>Update</button><button data-id={this.state.courses[j].id} key={"delete"+j}>Delete</button></td></tr>);
      		}
      		table.push(<tbody key="tbody">{children}</tbody>);
   			return (
   				<div>
      				<Courses 
      					value={table}
      				/>
	   				<button className="course-new-button" onClick={()=> this.createCourse()}>Create New Course</button><input className="course-name" id="course-name" placeholder="New Course Name Here" type="text"/>
   				</div>
      			);	
		}
	}
	render()
	{
		return (
		<div>
			<div className="console">
				<h4 className="title">React Console</h4>
				<div className="container">
				<div className="row">
				<div className="col-sm">
				<button className="students-button" onClick={()=> this.getStudents()}>Get Students</button>
				{this.renderStudents()}
				</div>
				<div className="col-sm">
				<button className="classes-button" onClick={() => this.getCourses()}>Get Courses</button>
				{this.renderCourses()}
				</div>
				</div>
				</div>
			</div>
		</div>
		);
	}
}


ReactDOM.render(
  <Console />,
  document.getElementById('root')
);
