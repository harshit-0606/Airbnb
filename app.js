const express = require('express');
const path = require('path');
const app = express();

//embedded js
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//local module
const userRouter = require('./routes/userRouter')
const {hostRouter} = require('./routes/hostRouter');
const {mongoConnect} = require('./utils/db.connect');

app.use((req, res, next) => {
    next();
})


// css file
app.use(express.static(path.join(__dirname ,"public")))

app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(hostRouter);

app.use((req,res,next)=>{
    res.status(404).render('404Page',{
        pageTitle:'Page not found'
    })
})

const port = 3000;

mongoConnect(()=>{
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
})

