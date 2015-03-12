<?php



$ip = "162.243.45.239";


//$r = new HttpRequest('http://xml.utrace.de/', HttpRequest::METH_GET);
//$r->addQueryData(array('query' => $ip));
//$result = $r->send();
//echo $result;


$response= file_get_contents("http://xml.utrace.de/?query=".$ip);

echo $response."<br><br>";
$xml=simplexml_load_string($response) or die("Error: Cannot create object");
print_r($xml->result);
$json = json_encode($xml->result);
echo "here is json<br>";
echo $json;



