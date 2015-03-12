

$(function () {
    
    "use strict";
    var map,
            lat,
            lon,
            requestHotel,
            infowindow = new google.maps.InfoWindow(),
            service,
            addr,
            phone,
            name,
            countMarkers = 0,
            LatLngList = new Array();
    $('#displace').resizable({
        resize: function (event, ui) {
            google.maps.event.trigger(map, 'resize');
        }
    });
    //if ip is set in main then run right away
    if (ip) {
        getIpInfo(ip);
    }


    $('#ipSubmit').click(function () {
        var ip = $('#ipInput').val();
        getIpInfo(ip);
    })
    function initialize() {
        var mapOptions = {
            center: {lat: 34.063112, lng: -118.221622},
            zoom: 15
        }
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    function getIpInfo(ip) {
        var whichAPI=$("select").val();
        console.log(whichAPI);
        $.get("http://ip-api.com/json/" + ip, function (data) {
            if (data.status==="fail"){
                alert(ip+" is not a valid ip address")
                return;
            }
            console.log(data);
            lat = data.lat;
            lon = data.lon;
            setBlueMarker(); //also currenly centers map there

            //send request for hotels in area
            requestHotel = {
                location: {lat: lat, lng: lon},
                //radius: 2000,
                rankBy: google.maps.places.RankBy.DISTANCE,
                types: ['lodging']
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(requestHotel, displayPlaces)
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    function  displayPlaces(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            $("#list").empty();
            for (var i = 0; i < 9; i++) {
                var wrapperFunc = (function (value) {

                    console.log(value + " in wrapper");
                    getDetailedResults(value, results);
                })(i);

            }
        }

    }

    function createMarker(place) {
        var placeLoc = place.geometry.location,
                website = place.website || "no url given",
                contentString = '<div id="content">' +
                "<b>" + name + '</b><br>' +
                addr + "<br>" +
                phone + "<br>" +
                website;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(contentString);
            infowindow.open(map, this);
        });
    }


    function setBlueMarker() {
        map.setCenter(new google.maps.LatLng(lat, lon));
        var size = new google.maps.Size(26, 50),
                icon = {url: "http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png", scaledSize: size};
        var blueMarker = new google.maps.Marker({
            position: {lat: lat, lng: lon},
            map: map,
            title: "IP Location!",
            icon: icon
        });
    }

    function getDetailedResults(i, results) {



        console.log("  getting results for  " + i);
        setTimeout(function () {
            service.getDetails({placeId: results[i].place_id}, function (dataDetails, status) {

                console.log(" ---" + i + "---" + status);
                LatLngList.push(new google.maps.LatLng( dataDetails.geometry.location.k,dataDetails.geometry.location.D));




                console.log(dataDetails);
                addr = dataDetails.formatted_address;
                phone = dataDetails.formatted_phone_number || "phone # not known";
                name = dataDetails.name;
                var info = "<b><li>" + name + "<br>" +
                        phone + "<br>" +
                        addr + "</li><br><br>";
                $("#list").append(info);
                //clearMarkers();

                createMarker(dataDetails);

                if (countMarkers === 8) {
                    boundIt();
                }
                console.log(countMarkers++)
            }


            );
        }, 2);





    }
    function boundIt() {
        var bounds = new google.maps.LatLngBounds()
        for (var i = 0; i<LatLngList.length; i++) {
            bounds.extend(LatLngList[i]);
           

        }
         console.log(bounds);
        map.setCenter(bounds.getCenter())
       map.fitBounds(bounds);
    }

});