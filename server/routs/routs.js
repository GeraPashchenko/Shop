const mongoMethods = require('../dbMethods/mongoMethods');

module.exports.app = (app)=>{

    app.get('/', async (req, res)=>{
        res.send(await mongoMethods.SelectAsync({}, "users"))
    });


}