// =============== CORS ===============
const clientUrl = 'http://localhost:8081';
const cors = require('cors');

const corsOptions = {
    origin: clientUrl,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports.app = (app) =>{
    app.use(cors(corsOptions));
    app.all('/*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', clientUrl);
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
    });
};