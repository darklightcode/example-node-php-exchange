# example-node-php-exchange
Pass node.js object to PHP and return a new object from PHP

### Install

1. Put 'app-php' or its contents in webroot.
2. In 'app-nodejs' folder edit from ./index.js the 'apachePHPconfig' to match with the php server.

const apachePHPconfig = {
	
	host: 'localhost', // default from apache
	port: 80, // default port for apache
	urlpath: '/Home/Workspace/Sites/Github/example-node-php-exchange/app-php/'    // path to your app-php/index.php
	
}
3. Go to 'app-nodejs' folder and start the app:  node ./index.js