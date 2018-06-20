var appRouter = function (app) {

	// Get list of all courses and return it
	app.get("/courses", function(req, res){
		var classes = [];
		var mysql = require('mysql');
		var con = mysql.createConnection({
			host: "localhost",
			user: "test",
			password: "test",
			database: "Hogwarts"
		});

		con.connect(function(err) {
			if (err) throw err;
			console.log("Connected in courses");
			con.query('SELECT * FROM Courses', function (err, result){
				if (err) throw err;
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			})
		})
	})
	// Create New Course Router and Function
	app.post("/courses/create", function(req, res){
				console.log("In createCourse on Node side");
				console.log(req.body.course);
				var course = req.body.course;

				var mysql = require('mysql');
				var con = mysql.createConnection({
					host:"localhost",
					user:"test",
					password:"test",
					database:"Hogwarts"
				});

				con.connect(function(err){
					if (err) throw err;
					console.log("Connected!");
					var sql = "INSERT INTO Courses (name) VALUES ('" + course +"');";
					console.log(sql);
					con.query(sql, function(err, result){
						if (err) throw err;
						if (result.affectedRows === 1)
						{
							res.header("Access-Control-Allow-Origin", "*");
							res.send("success");
						}
					})
				})				
	})
	// Update Existing Course Router and Function
	app.post("/courses/update", function(req, res){
				console.log("In updateCourse on Node side");
				console.log(req.body.courseId);
				var courseId = req.body.courseId;
				var newName = req.body.newName;

				var mysql = require('mysql');
				var con = mysql.createConnection({
					host:"localhost",
					user:"test",
					password:"test",
					database:"Hogwarts"
				});

				con.connect(function(err){
					if (err) throw err;
					console.log("Connected!");
					var sql = "UPDATE Courses SET name = '"+newName+"' WHERE id = "+courseId+";";
					console.log(sql);
					con.query(sql, function(err, result){
						if (err) throw err;
						if (result.affectedRows === 1)
						{
							res.header("Access-Control-Allow-Origin", "*");
							res.send("success");
						}
					})
				})				
	})
	// Delete Existing Course Router and Function
	app.post("/courses/delete", function(req, res){
				console.log("In deleteCourse on Node side");
				console.log(req.body.courseId);
				var courseId = req.body.courseId;
				var newName = req.body.newName;

				var mysql = require('mysql');
				var con = mysql.createConnection({
					host:"localhost",
					user:"test",
					password:"test",
					database:"Hogwarts"
				});

				con.connect(function(err){
					if (err) throw err;
					console.log("Connected!");
					var sql = "DELETE FROM Courses WHERE id = "+courseId+";";
					console.log(sql);
					con.query(sql, function(err, result){
						if (err) throw err;
						if (result.affectedRows === 1)
						{
							res.header("Access-Control-Allow-Origin", "*");
							res.send("success");
						}
					})
				})				
	})
	// Get list of all students and return it
	app.get("/students", function(req, res){
		var students = [];
		var mysql = require('mysql');
		var con = mysql.createConnection({
			host: "localhost",
			user: "test",
			password: "test",
			database: "Hogwarts"
		});

		con.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
			con.query('SELECT * FROM Students', function (err, result){
				if (err) throw err;
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);

			})
		})
	})
	// Delete Student Router and Function
	app.post("/students/delete", function(req, res){
				console.log("In deleteStudent on Node side");
				console.log(req.body.studentId);
				var studentId = req.body.studentId;

				var mysql = require('mysql');
				var con = mysql.createConnection({
					host:"localhost",
					user:"test",
					password:"test",
					database:"Hogwarts"
				});

				con.connect(function(err){
					if (err) throw err;
					console.log("Connected!");
					var sql = "DELETE FROM Students WHERE id = "+studentId+";";
					console.log(sql);
					con.query(sql, function(err, result){
						if (err) throw err;
						if (result.affectedRows === 1)
						{
							res.header("Access-Control-Allow-Origin", "*");
							res.send("success");
						}
					})
				})				
	})
	// Update Student Router and Function
	app.post("/students/update", function(req, res){
				console.log("In updateStudents on Node side");
				console.log(req.body.studentId);
				var studentId = req.body.studentId;
				var newName = req.body.newName;

				var mysql = require('mysql');
				var con = mysql.createConnection({
					host:"localhost",
					user:"test",
					password:"test",
					database:"Hogwarts"
				});

				con.connect(function(err){
					if (err) throw err;
					console.log("Connected!");
					var sql = "UPDATE Students SET name = '"+newName+"' WHERE id = "+studentId+";";
					console.log(sql);
					con.query(sql, function(err, result){
						if (err) throw err;
						if (result.affectedRows === 1)
						{
							res.header("Access-Control-Allow-Origin", "*");
							res.send("success");
						}
					})
				})				
	})
	// Create New Student Router and Function
	app.post("/students/create", function(req, res){
				console.log("In createStudents on Node side");
				console.log(req.body.student);
				var student = req.body.student;

				var mysql = require('mysql');
				var con = mysql.createConnection({
					host:"localhost",
					user:"test",
					password:"test",
					database:"Hogwarts"
				});

				con.connect(function(err){
					if (err) throw err;
					console.log("Connected!");
					var sql = "INSERT INTO Students (name) VALUES ('" + student +"');";
					console.log(sql);
					con.query(sql, function(err, result){
						if (err) throw err;
						if (result.affectedRows === 1)
						{
							res.header("Access-Control-Allow-Origin", "*");
							res.send("success");
						}
					})
				})				
	})
}

module.exports = appRouter;