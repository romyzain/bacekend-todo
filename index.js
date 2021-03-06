const express = require('express'); // framework API
const app = express(); // use framework
const bodyParser = require('body-parser'); // req.body untuk bisa kirim data ke front end
const port = 2000;
const cors = require('cors'); //react bisa interraksi dengan API bisa bikin endpoint / permission
const bearerToken = require('express-bearer-token'); //bisa pakai req.token
const { transporter, transportAwait } = require('./helper/nodemailer');

app.use(bodyParser());
app.use(bearerToken());
app.use(bodyParser.urlencoded({ extended : false }))
app.use(cors());
app.use(express.static('public')) // untuk uploader -- tentukan nama folder yang dipakai untuk disimpan 

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome to Todo API</h1>')
});

app.post('/send-mail', async (req,res) => {
    let to = req.query.email;
    let mailOptions = {
        from : 'Admin <admin@todo.com>',
        to,
        subject : 'Testing Nodemailer',
        html : '<h1>Success</h1>'
    };
    if(to){
        try{
            await transportAwait(mailOptions)
            res.status(200).send('Email Sent')
        }catch(err){
            res.status(500).send(err.message)
        }
        // transporter.sendMail(mailOptions, (err, results) => {
        //     if(err){
        //         res.status(500).send(err.message)
        //     }
        //     res.status(200).send('Email Sent')
        // })
    }else{
        res.status(404).send('Email Not Found')
    }

})

const {
    userRouter,
    todoRouter,
    mongoRouter
} = require('./router');

app.use('/users', userRouter); //localhost:2000/users/enfpoint yang di
app.use('/todo', todoRouter);
app.use('/mongo', mongoRouter);

app.listen(port, () => console.log(`API active at port ${port}`)); //nyalain API