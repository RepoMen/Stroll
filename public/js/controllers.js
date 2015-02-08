angular.module('stroll.controllers', [])

.controller('HomeController', function($scope, Sinch) {
  // Sinch.sendMessage();
  console.log('Sinch', Sinch);
})

.controller('mapCtrl', function($scope, geolocation, $http, Sinch) {


  $scope.sendMessage = function() {
  console.log('inside send message in mapctrl');
    Sinch.sendMessage();
  }

	var icons = {
		theft: './img/theft_sm.png',
		assault: './img/assault_sm.png'
	};

	$scope.crimeData = [];

	$http.get('/sfCrimeData').
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available

	    for(var k in data.features){
	    	var me = data.features[k];
	    	var thisCrimeType = "assault";

	    	for(var crimeType in icons){
	    		var regex = new RegExp(crimeType.toUpperCase(), "g");
	    		if(regex.test(me.properties.crime_type)){
	    			thisCrimeType = crimeType;
	    		}
	    	}
	    	me.longitude = me.geometry.coordinates[0];
	    	me.latitude = me.geometry.coordinates[1];
	    	me.icon = icons[thisCrimeType];
	    }

	    $scope.crimeData = data.features;
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });


  $scope.map = { center: { latitude: 37.78, longitude: -122.41 }, zoom: 13 };

  geolocation.getLocation().then(function(data) {
    $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
  }).then(function() {
    $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 16 };
  })

  //Google map styling
 	$scope.map.options = {
 		styles: [
		   {
		       "featureType": "all",
		       "elementType": "labels.text.fill",
		       "stylers": [
		           {
		               "color": "#ffffff"
		           }
		       ]
		   },
		   {
		       "featureType": "all",
		       "elementType": "labels.text.stroke",
		       "stylers": [
		           {
		               "visibility": "on"
		           },
		           {
		               "color": "#3e606f"
		           },
		           {
		               "weight": 2
		           },
		           {
		               "gamma": 0.84
		           }
		       ]
		   },
		   {
		       "featureType": "all",
		       "elementType": "labels.icon",
		       "stylers": [
		           {
		               "visibility": "off"
		           }
		       ]
		   },
		   {
		       "featureType": "administrative",
		       "elementType": "geometry",
		       "stylers": [
		           {
		               "weight": 0.6
		           },
		           {
		               "color": "#1a3541"
		           }
		       ]
		   },
		   {
		       "featureType": "administrative.land_parcel",
		       "elementType": "geometry.fill",
		       "stylers": [
		           {
		               "color": "#3bbfea"
		           }
		       ]
		   },
		   {
		       "featureType": "landscape",
		       "elementType": "geometry",
		       "stylers": [
		           {
		               "color": "#2c5a71"
		           }
		       ]
		   },
		   {
		       "featureType": "landscape.man_made",
		       "elementType": "geometry.fill",
		       "stylers": [
		           {
		               "lightness": "39"
		           },
		           {
		               "color": "#2fbcea"
		           }
		       ]
		   },
		   {
		       "featureType": "landscape.man_made",
		       "elementType": "labels.text.stroke",
		       "stylers": [
		           {
		               "weight": "0.01"
		           }
		       ]
		   },
		   {
		       "featureType": "landscape.natural",
		       "elementType": "geometry.fill",
		       "stylers": [
		           {
		               "lightness": "46"
		           },
		           {
		               "color": "#46d8f8"
		           }
		       ]
		   },
		   {
		       "featureType": "poi",
		       "elementType": "geometry",
		       "stylers": [
		           {
		               "color": "#406d80"
		           }
		       ]
		   },
		   {
		       "featureType": "poi",
		       "elementType": "geometry.fill",
		       "stylers": [
		           {
		               "lightness": "-16"
		           },
		           {
		               "color": "#3bbfea"
		           }
		       ]
		   },
		   {
		       "featureType": "poi",
		       "elementType": "labels.text.stroke",
		       "stylers": [
		           {
		               "weight": "0.01"
		           }
		       ]
		   },
		   {
		       "featureType": "poi.park",
		       "elementType": "geometry",
		       "stylers": [
		           {
		               "color": "#2c5a71"
		           }
		       ]
		   },
		   {
		       "featureType": "poi.park",
		       "elementType": "geometry.fill",
		       "stylers": [
		           {
		               "color": "#3bbfea"
		           }
		       ]
		   },
		   {
		       "featureType": "road",
		       "elementType": "geometry",
		       "stylers": [
		           {
		               "color": "#29768a"
		           },
		           {
		               "lightness": -37
		           }
		       ]
		   },
		   {
		       "featureType": "road",
		       "elementType": "labels.text.stroke",
		       "stylers": [
		           {
		               "weight": "0.01"
		           }
		       ]
		   },
		   {
		       "featureType": "road.highway",
		       "elementType": "geometry.fill",
		       "stylers": [
		           {
		               "lightness": "100"
		           }
		       ]
		   },
		   {
		       "featureType": "road.highway",
		       "elementType": "geometry.stroke",
		       "stylers": [
		           {
		               "lightness": "100"
		           },
		           {
		               "weight": "0.01"
		           }
		       ]
		   },
		   {
		       "featureType": "transit",
		       "elementType": "geometry",
		       "stylers": [
		           {
		               "color": "#406d80"
		           }
		       ]
		   },
		   {
		       "featureType": "transit",
		       "elementType": "labels.text.stroke",
		       "stylers": [
		           {
		               "weight": "0.01"
		           }
		       ]
		   },
		   {
		       "featureType": "transit.station",
		       "elementType": "geometry.fill",
		       "stylers": [
		           {
		               "color": "#3bbfea"
		           }
		       ]
		   },
		   {
		       "featureType": "water",
		       "elementType": "geometry",
		       "stylers": [
		           {
		               "color": "#193341"
		           }
		       ]
		   },
		   {
		       "featureType": "water",
		       "elementType": "geometry.fill",
		       "stylers": [
		           {
		               "color": "#21466d"
		           }
		       ]
		   }
		]
 	};

});
