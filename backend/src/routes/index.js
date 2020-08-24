const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const {  ObjectID } = require('mongodb');
const User = require('../models/User');
user = new User();

const Time = require('../models/Time');
time = new Time();

const jwt = require('jsonwebtoken');
const { collection, db, findById } = require('../models/User');

router.get('/', (req, res) => res.send('Hello World'));



///////////////////////////////////////////////////////////
///////////////----MONGO TIME TRACK----///////////////////
/////////////////////////////////////////////////////////

let MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/tasks1', async (req, res) => {
    
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db('angular-auth');
            dbo.collection('times').find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
                
            });
            
        })
});

router.post('/savetasks', async (req, res) => {
    console.log(req.body);
    const { startTime, endTime, elapsedTime } = req.body;
    const newTime = new Time({startTime, endTime, elapsedTime});
    await newTime.save();
  
    const token = jwt.sign({ _id: newTime._id}, 'secretkey');
  
    res.status(200).json({token}); 
  
  });


  /////////////////////////////////////////////////////////////////////////
  ///////////comented code belove was my try to////////////////////////////
  //////////////////get timings saved under////////////////////////////////
  //////////////////// the loggedIn user////////////////////////////////
  //////////////////////////////////////////////////////////////////////

// router.post('/savetasks', async (req, res) => {

//     var mid = mongoose.Types.ObjectId(req.body._id);
    
//     const { startTime, endTime, elapsedTime } = req.body;
//     const newTime = await User.findOneAndUpdate({_id: mid}, {$addToSet: {timings: {startTime, endTime, elapsedTime}}}, 
//         {new: true}).exec;
    
//     const token = jwt.sign({ _id: newTime._id}, 'secretkey');

//     res.status(200).json({token}); 
//     console.log(req.body);

// });


///////////////////////////////////////////////////////////
///////////////----MONGO TIME TRACK----///////////////////
/////////////////////////////////////////////////////////

router.post('/signup', async (req, res) => {
   
    const { firstname, lastname, email, password, timings} = req.body;
    if (!firstname || !lastname || !email || !password) return res.status(401);
    const newUser = new User({firstname, lastname, email, password, timings});
    await newUser.save();
    
    const token = jwt.sign({ _id: newUser._id}, 'secretkey');

    res.status(200).json({token});    
});


router.post('/signin', async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({email})
    if (!user) return res.status(401).send("The email doesn't exist!");
    if (user.password !== password) return res.status(401).send("Wrong Password!");

    const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});


router.get('/profile', (req, res) => {
    res.send(req.userId);
});

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized Request');
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token === null) {
        return res.status(401).send('Unauthorized Request');
    }

    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id;
    next();
}



