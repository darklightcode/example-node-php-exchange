const express = require("express");
const app = express();
const port = 9999;

const { getFromPHP } = require('./middleware.js');

const apachePHPconfig = {
	
	host: 'localhost',
	port: 80,
	urlpath: '/Home/Workspace/Sites/Github/example-node-php-exchange/app-php/'
	
}

app.get(
    '/',
    getFromPHP(apachePHPconfig.host, apachePHPconfig.port, apachePHPconfig.urlpath , {givemeanumber: 1}),
    function (req, res) {

        // here is your php object
        console.log('php', req.php);

        res.end();

    })

app.listen(port, () => {

    console.clear();
    console.log(`Example app listening on port ${port}!`)

})