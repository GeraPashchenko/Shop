const express = require("express");
const app = express();
const db = require('./services/mongodb');
const serverPort = process.env.PORT; // server port

require('dotenv').config(); // for reading env file
require('./middleware/cors.js'); // cors middleware wor cross origin requests
require('./routs/routs').app(app);


app.listen(serverPort, (err)=>{
    if(err) throw err;
    db.connect(() => { });//create a connection to mongodb
    console.log(`========== STARTED ON PORT ${serverPort} ==========`);
});
