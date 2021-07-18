const express = require('express');
const helmet = require('helmet');
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next) => {
  res.send('Sanity Check');
});

app.get('/login', (req, res, next)=>{
  res.render('login')
})

app.post('/process_login', (req, res, next) => {
  const password = req.body.password
  const username = req.body.username
  // check the db to see if user credentials are valid

  //if they are valid....
     //-save their usernameto a cookie (data is stored in the browswer) or session (stored on the server,browswer has key for it)
     //-send them to the welcome page


     if(password === "x"){
       res.cookie('username', username)
       res.redirect('/welcome')
     }else{
      res.redirect('/login?msg=fail')

     }

})

app.get('/welcome', (req, res, next)=>{
  res.render('welcome', {
    username: req.cookies.username
  })
})


app.listen(port, () => {
  console.log(` http://localhost:${port}`);
});




