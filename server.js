let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let ejs = require('ejs');

//const { request, response } = require('express');
//const bodyParser = require('body-parser');


let app = express()

//mes midlewares
app.set('view engine', 'ejs')
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(session({
    secret: 'azerrty',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(require('./middleweares/flash'))

//mes routes
app.get('/', (request,response) => {

    let Message = require('./models/message')

    Message.call((messages) => {
        response.render('page/index', {messages: messages})
    })
})

app.post('/',(request,response) => {
    if(request.body.message === undefined || request.body.message === ""){
        request.flash('error', "Il ya eu une errore lors de la soumission du message");
        response.redirect('/');
    }
    else{

        let Message = require('./models/message')

        Message.create(request.body.message, () => {
            request.flash('success', "Votre message est ebregistré avec succes");
            response.redirect('/');
        })
    }
})

app.listen(3030)