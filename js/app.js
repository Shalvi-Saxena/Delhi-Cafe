//JavaScript

function googleError() 
{
	$('#lists').hide();
    $('#summary').text("Error in Loading Google Maps");
}

String.prototype.contains=function(other) 
{	return this.indexOf(other)!==(-1);	};

function makeMarker(Color) 
{
    var Image=new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+Color+'|40|_|%E2%80%A2',
        new google.maps.Size(21,34),	new google.maps.Point(0,0),
        new google.maps.Point(10,34),	new google.maps.Size(21,34)
	);
    return Image;
}

var dIcon;
var Fs; 
var marker;		

Fs = function (cafe, map) 
{
    var self=this;
    self.name=ko.observable(cafe.name);
    self.location=cafe.location;
    self.lng=self.location.lng;
    self.lat=self.location.lat;
    self.map_location=ko.computed(function () 
	{
		if (self.lat === 0 || self.lon === 0) 	return null;
        else 	return new google.maps.LatLng(self.lat, self.lng);	
	});
    self.formattedPhone=ko.observable(cafe.contact.formattedPhone);
    self.formattedAddress=ko.observable(self.location.formattedAddress);
    self.marker=(function(cafe) 
	{
       if (cafe.map_location()) 
            marker = new google.maps.Marker(
			{ 
				map: map,
				position: cafe.map_location(),
                icon: dIcon
            });
        return marker;	})
	(self);
	self.id=ko.observable(cafe.id);
    self.url=ko.observable(cafe.url);
    self.formattedInfoWindowData=function() 
	{
        return '<div class="info-window-content">'+'<a href="'+(self.url()===undefined?'/':self.url()) + '">'+
			   '<span class="info-window-header"><h4>'+(self.name()===undefined?'Cafe name not available':self.name())+ 
			   '</h4></span>'+'</a><h6>'+(self.formattedAddress()===undefined?'No address available':self.formattedAddress())+
			   '<br>'+(self.formattedPhone()===undefined?'No Contact Info':self.formattedPhone())+'</h6>'+'</div>';
    };};

var map;

function initMap() 
{
	map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat:  28.629329, lng: 77.215673},
        styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
    });
    ko.applyBindings(new AppModel());
}

var hIcon;
var infoWindow;
var data;

var AppModel = function () 
{
	 function fetchCafe() 
	 {
        $.ajax(
		{
            url:'https://api.foursquare.com/v2/venues/search',
            dataType:'json',
            data:'client_id=ZY4CDJNSF1SWOWSP1AYCW3WKA5CEAUR1YBRCRE4LTGNQN5ZG&client_secret=OBRHMM00CX5DGDRTKTMMEDST1U00PA33UCQXMD0HBMCQQCAC&v=20130815%20&ll=28.613939,77.209021%20&query=cafe',
            async:true,
        }
		).done(function(response) 
		{
            data=response.response.venues;
            data.forEach(function(coffeehouse) 
			{
                foursquare=new Fs(coffeehouse,map);
                self.cafesList.push(foursquare);
            });
            self.cafesList().forEach(function (coffeehouse) {
                if (coffeehouse.map_location()) 
				{
                    google.maps.event.addListener(coffeehouse.marker,'click',function() 
					{
                        self.selectCafe(coffeehouse);
                    });
                }
            });
        }).fail(function (response, status, error) {
            $('#summary').text('Coffee Houses could not load...');
        });
    }
	
    function init() 
	{	fetchCafe();	}
	if (typeof google!==('object') || typeof google.maps!==('object'));
	else 
	{
        dIcon=makeMarker('bf7c7c');
        hIcon=makeMarker('8bc18b');
        infoWindow=new google.maps.InfoWindow();
        google.maps.event.addDomListener(window,'load',init);
    }
    self.queryResult=ko.observable('');
	self.query=ko.observable('');
    self.search=function() {};
    self.cafesList=ko.observableArray([]);
    self.FilteredcafeList=ko.computed(function() 
	{
        self.cafesList().forEach(function (coffeehouse) 
		{	coffeehouse.marker.setMap(null);	});
		
        var results = ko.utils.arrayFilter(self.cafesList(),function (coffeehouse) 
		{	return coffeehouse.name().toLowerCase().contains(self.query().toLowerCase());	});
        
		results.forEach(function (coffeehouse) 
		{	coffeehouse.marker.setMap(map);	});
        if (results.length > 0) 
		    if (results.length == 1) 
                self.queryResult(results.length+" Coffee House ");
            else 
                self.queryResult(results.length +" Coffee House ");
        else 
		    self.queryResult("No Coffee House Available");
        
		return (results);
    });
    self.queryResult( "Loading Coffee Houses, Please wait..." );
    self.selectCafe=function(coffeehouse) 
	{
        infoWindow.setContent(coffeehouse.formattedInfoWindowData());
        infoWindow.open(map, coffeehouse.marker);
        map.panTo(coffeehouse.marker.position);
        coffeehouse.marker.setAnimation(google.maps.Animation.BOUNCE);
        coffeehouse.marker.setIcon(hIcon);
        self.cafesList().forEach(function (unselected_cafe) {
            if (coffeehouse!=unselected_cafe) 
			{
                unselected_cafe.marker.setAnimation(null);
                unselected_cafe.marker.setIcon(dIcon);
            }
        });
    };
};



