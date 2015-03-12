<?php
header("Access-Control-Allow-Origin: *");
?>

<html>
    <head>
        <title>GeoIP</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" type="text/css" href="ip.css">
    </head>
    <body>

        <div id ="displace">
            Chose API:
            <select>
                <option value="Utrace">Utrace</option>
                <option value="ip-api">ip-api.com</option>
                
            </select> 
            <div id ='ipSearch'> Enter ip <input type="text" placeholder="ip address" id="ipInput" maxlength="30">
                <button id ="ipSubmit">submit</button>
                <ul id ="list"></ul>
            </div>
        </div>


        <div id="map-canvas"></div>



        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery.ui.all.css" />
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
        <script src='ip.js'></script>
    </body>

    <script>
        var ip = "<?php
if (isset($_GET['ip'])) {
    echo $_GET['ip'];
}
?>";
        var test = "hello";
    </script>

</html>

