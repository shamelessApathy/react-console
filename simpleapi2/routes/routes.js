var faker = require("faker");

var appRouter = function (app) {

	app.get("/user", function (req,res){
		var data =({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			username: faker.internet.userName(),
			email: faker.internet.email()
		});
		res.status(200).send(data);
	});

	app.get("/users/:num", function (req,res){
		var users = [];
		var num = req.params.num;

		if (isFinite(num) && num > 0) {
			for (i =0; i<= num-1; i++) {
				users.push({
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					username: faker.internet.userName(),
					email: faker.internet.email()
				});
			}
			res.status(200).send(users);
		} else {
			res.status(400).send({ message: 'invalid number supplied'});
		}
	});
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
				console.log("In createCourse on Node side");
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