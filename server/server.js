//import
const express = require('express');
const path = require('path');
//call express
const app = express();
//We get the path. We add '..' to go back first to the base folder
const publicFolder = path.join(__dirname, '..', 'public');
//we grab the port from Heroku
const port = process.env.PORT || 10800;

//We register middleware. Static uses the path to the public folder
app.use(express.static(publicFolder));

//Function runs when they do a GET action to our server
//* matches all unmatched stuff. get function has a request and response
app.get('*', (request, response)=> {
    response.sendFile(path.join(publicFolder, 'index.html'));
});

//Listen to port then run a function
app.listen(port, () => {
    console.log('Server is up!!');
});