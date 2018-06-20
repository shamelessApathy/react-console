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
	checkCourseResponse(response)
	{
		if (response.data === "success")
		{
			console.log("got a success message!");
			this.hideCoursesUpdateContainer();
			this.getCourses();
		}
	}
	createCourse()
	{
		console.log("inside createCourse() function");
		let courseName = document.getElementById('course-name');
		if (courseName.value !== "")
		{
			let course = courseName.value;
			axios.post("http://localhost:3001/courses/create", {course})
			  .then(response => this.checkCourseResponse(response))
		}
	}
	updateCourse(event)
	{
		console.log('in update course function');
		console.log(event);
		let button = event.target;
		let input = document.getElementsByClassName('course-input')[0];
		let newName = input.value;
		let courseId = button.getAttribute('data-id');
		console.log(newName);
		console.log(button);

		// Send Update request to Node Express Server
		axios.post("http://localhost:3001/courses/update", {courseId, newName})
			  .then(response => this.checkCourseResponse(response)) 
	}
	// Sends request to express server to delete the course
	deleteCourse()
	{
		console.log('in the delete course function');
	}
	// Show the delete course container with Yes/No buttons for confirmation before deletion
	showCoursesDeleteContainer(courseId, courseName)
	{
		let container = document.getElementsByClassName('course-delete-container')[0];
		container.setAttribute('style','display:block');
		let deleteMsg = document.getElementsByClassName('delete-confirmation-message')[0];
		deleteMsg.innerHTML = "<p> Are you sure you want to delete: "+ courseName.courseName +"?</p>";
		let yesButton = document.getElementsByClassName('course-delete-yes')[0];
		yesButton.setAttribute('data-id', courseId.courseId);
	}
	// Show the courseUpdateContainer, add in the input with placeholders
	showCoursesUpdateContainer(courseId, courseName)
	{
		let container = document.getElementsByClassName('courses-update-container')[0];
		let name = courseName.courseName;
		let id = courseId.courseId;
		let idLabel = document.getElementsByClassName('label-course-update')[0];
		let input = document.getElementsByClassName('course-input')[0];
		let finalUpdate = document.getElementsByClassName('course-final-update')[0];
		idLabel.innerHTML = "Course ID: " + id;
		container.setAttribute('style','display:block');
		input.setAttribute('placeholder',name);
		finalUpdate.setAttribute('data-id',courseId.courseId); 
	}
	hideDeleteCourseContainer()
	{
		let container = document.getElementsByClassName('course-delete-container')[0];
		container.setAttribute('style','display:none');
		let yesButton = document.getElementsByClassName('course-delete-yes')[0];
		yesButton.setAttribute('data-id',' ');
	}
	hideCoursesUpdateContainer()
	{
		let container = document.getElementsByClassName('courses-update-container')[0];
		let input = document.getElementsByClassName('course-input')[0];
		input.value = "";
		container.setAttribute('style','display:none');
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
      			let courseId = this.state.courses[j].id;
      			let courseName = this.state.courses[j].name;
        		children.push(<tr key={"student" + j.toString()}><td key="id">{this.state.courses[j].id}</td><td key={"name" + j.toString()}>{this.state.courses[j].name}</td><td key={"options"+j.toString()}><button data-id={this.state.courses[j].id} data-name={this.state.courses[j].name} key={"update" + j.toString} onClick={() => this.showCoursesUpdateContainer({courseId},{courseName})}>Update</button><button data-id={this.state.courses[j].id} onClick={()=> this.showCoursesDeleteContainer({courseId}, {courseName})} key={"delete"+j}>Delete</button></td></tr>);
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
				<div className="courses-update-container">
					<h4 className="title">Courses Update Container</h4><br />
					<label className="label-course-update"></label><br />
					<input className="course-input" type="text" placeholder=" "/>
					<button className="course-final-update" onClick={(event) => this.updateCourse(event)}>Update</button>
				</div>
				<div className="course-delete-container">
					<h4 className="title">Course Delete Confirmation</h4><br />
					<div className="delete-confirmation-message"></div>
					<button className="course-delete-yes" onClick={()=> this.deleteCourse()}>YES</button><button onClick={()=> this.hideDeleteCourseContainer()}>NO</button>
				</div>
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
