/**
 *  Middleware to get data from PHP
 */
const getFromPHP = (phpHost, phpPort, phpPath, phpObject) => {

    if (typeof phpHost === 'undefined') {
        throw new Error('phpHost was not defined');
    }
    if (typeof phpPort === 'undefined') {
        throw new Error('phpPort was not defined');
    }
    if (typeof phpPath === 'undefined') {
        phpPath = '/';
    }
    if (typeof phpObject !== 'object' ) {
        phpObject = {};
    }

    return (req, res, next) => {

        if (typeof req.php === 'undefined') {
            req.php = {};
        }

        const options = {
            hostname: phpHost, // change this to your php server host
            port: phpPort, // change this with your php server port
            path: phpPath, // change this with your php server path to script
            method: 'POST',
            headers: {
                // here we send 'NODE-REQUEST', it will be available in php unde $_SERVER global prefixed with HTTP_ string because is a custom client request header.
                'NODE-REQUEST': JSON.stringify(phpObject)
            }
        };

        const isJSON = (str ) => {
            try {

                let j = JSON.parse(str);

                return typeof j === 'object' && j !== null;

            } catch (e) {
                return false;
            }

        };

        const httpModule = require('http');
        let reqHttp = httpModule.request(options, (response) => {

            if( typeof response.headers['node-response'] === 'undefined' || !isJSON(response.headers['node-response'])){

                req.php = {};

            }else{

                req.php =  JSON.parse(response.headers['node-response']);
            }


            next();

        });

        reqHttp.on('error', (e) => {
            console.error(`problem with request to php server: ${e.message}`);
            next();
        });

        reqHttp.on('end', () => {
            next();
        });

        reqHttp.end();

    }

}

exports.getFromPHP = getFromPHP;

