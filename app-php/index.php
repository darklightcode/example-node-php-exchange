<?php
$max = @$_COOKIE["usrMob"];  // Taken from cookie
$min = 1111;

$number = rand($min, $max);  // Find random number
echo $number;   // Send back to Node Js

if( isset($_SERVER['HTTP_NODE_REQUEST'])){

   $req = json_decode($_SERVER['HTTP_NODE_REQUEST'], true);

   $data = array();

   // 'givemeanumber' is sent from Node.js server
   if( isset($req['givemeanumber']) ){

     $data = array(
         'number' => $number
     );
	 
   }

   header('NODE-RESPONSE: '. json_encode(array("req" => $req, "res"=> $data)));

}

?>