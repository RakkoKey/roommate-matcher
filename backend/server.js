require('dotenv').config({ path: '../.env' });
const { ObjectId } = require('mongodb');
const express = require('express'); //framework for server
const cors = require('cors'); 
const bodyParser = require('body-parser'); //parses incoming request bodies in a middleware before your handlers, available under the req.body property
const axios = require('axios')

const MongoClient = require('mongodb').MongoClient;
                                    //password                                    //database name
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();
const app = express();
app.use(cors());
app.use(bodyParser.json());




app.post('/api/registerUser', async (req, res, next) => {
    // Incoming: firstName, lastName, userName, password, email
    const { firstName, lastName, userName, password, email } = req.body;

    // Validate input: Ensure all fields are provided
    if (!firstName || !lastName || !userName || !password || !email) {
        return res.status(400).json({ error: 'All fields, including email, are required' });
    }

    // Additional validation: Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const newUser = {
        FirstName: firstName,
        LastName: lastName,
        Login: userName,
        Password: password,
        Email: email
    };

    try {
        const db = client.db();

        // Check for duplicate username
        const existingUser = await db.collection('Users').findOne({ Login: userName });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Check for duplicate email
        const existingEmail = await db.collection('Users').findOne({ Email: email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Insert the new user
        const result = await db.collection('Users').insertOne(newUser);
        console.log(result);
        return res.status(200).json(result);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding user' })

    }

    
});

app.post('/api/login', async (req, res, next) =>{
    //incoming: login, password
    //outgoing: id, firstName, lastName, error
    var error = '';

    const {username, password} = req.body;

    const db = client.db();
    const results = await db.collection('Users').find({Login:username,Password:password}).toArray();
    console.log(username + password);
    var id = -1;
    var fn = '';
    var ln = '';

    //results is an array of results of Users found with matching login and password
    if(results.length > 0){
        id = results[0]._id;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }
    var ret = {id:id, firstName:fn, lastName:ln, error:''};
    res.status(200).json(ret);
});
        


app.listen(process.env.LOCALHOST_PORT || 3000);