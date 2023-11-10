const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const database = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'admin',
        database:'mobileapp',
    }
);
database.connect((err)=>{
    if(err){
        console.log('error  sql not connect '+ err.message)
    } else{
        console.log("connected to db")
    }
})

app.get('/users',(req,res)=>{
    database.query('select * from basic_info',(error,result,fields)=>{
        if(error){
            console.log(error)
        }
        res.json({user:result})
    })
})


app.get('/users/:id',(req,res)=>{
    const userid = req.params.id
    database.query('select * from basic_info where id = ?', [userid],(error,result,fields)=>{
        if(error){
            console.log(error)
        }
        res.json({user:result [0]})
    })
})


app.post('/users',(req,res)=>{
    const {id, name, age,mobile,email_id} = req.body
    database.query('insert into basic_info (id ,name, age, mobile, email_id) values(?,?,?,?,?)',
    [id,name,age,mobile,email_id],
    (error,results,fields)=>{
        if(error){
            console.log(error.message)
        }
        else{
            console.log("connectes")
        }
        
    })
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, mobile, email_id } = req.body;

    database.query(
        'UPDATE basic_info SET name=?, age=?, mobile=?, email_id=? WHERE id=?',
        [name, age, mobile, email_id, id],
        (error, results, fields) => {
            if (error) {
                console.log(error.message);
                res.status(500).json({ message: "Failed to update user information" });
            } else {
                console.log("User information updated");
                res.status(200).json({ message: "User information updated successfully" });
            }
        }
    );
});



app.delete ('/users/:id', (req, res) => {
    const id = req.params.id;
   
    database.query(
        'delete from basic_info where id =?',
        [id],
        (error, results, fields) => {
            if (error) {
                console.log(error.message);
                res.status(500).json({ message: "Failed to delete user information" });
            } else {
                console.log("User information updated");
                res.status(200).json({ message: "User information deleted successfully" });
            }
        }
    );
});


app.post('/login',(req,res) => {
    const { user_name , password } = req.body
    const sql = 'select user_name, password from Register where user_name = ? And password = ?'
    const value = [user_name,password]

    database.query(sql,value,(err,results, fields) =>{
        if(err){
            console.log(err.message)
            res.status(500).send("error on your query")
        }
        if(results.length > 0 ){
            res.send("home Page ")
            res.status(200).send("welcome to home page")
        }

        else {
            res.status(401).send ('enter the correct details ')
        }
    })
})



app.listen(5000,()=>{
    console.log('server is running')
})