// Initialize your app
var myApp = new Framework7({
    modalButtonOk: 'Ok',
    modalButtonCancel: ' Annuler'
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}


//side panels
  $$('.open-left-panel').on('click', function (e) {
        // 'left' position to open Left panel
        myApp.openPanel('left');
      map.setClickable(false);
          if ($$('.picker-modal.modal-in').length > 0) {
    myApp.closeModal('.picker-modal.modal-in');
  }
       
    });
 
    $$('.open-right-panel').on('click', function (e) {
        // 'right' position to open Right panel
        myApp.openPanel('right');
        map.setClickable(false);
            if ($$('.picker-modal.modal-in').length > 0) {
    myApp.closeModal('.picker-modal.modal-in');
  }

    });
$$('.panel-right').on('closed', function () {
map.setClickable(true);
});
$$('.panel-left').on('closed', function () {
map.setClickable(true);
});


//autocomplete part
$$('#myplace').on('focusin', function (e) {
    $$('#myplace').val('');
    map.setClickable(false);
    });
$$('#myplace').on('blur', function (e) {
    map.setClickable(true);
    });


//marquer ma voiture
$$('.save-car-place').on('click', function() {
    var onSuccess = function(location) {
        var storedData = myApp.formStoreData('localisation_du_voiture', {
            'lat': location.latLng.lat,
            'lng': location.latLng.lng

        });
        map.clear();
        showMapParkingData();
        map.addMarker({
            'position': location.latLng,
            'title': "Votre Voiture est ici",
            'icon' : 'www/icons/car.png',
        }, function(marker) {
            marker.showInfoWindow();
        });
        myApp.addNotification({
            title: 'Parking Tunisie',
            message: 'La localisation de votre voiture est bien enregistré.'
        });
        map.setCameraTarget(location.latLng);
        map.setCameraZoom(18);
    };

    var onError = function(msg) {
        alert("Erreur : on n'a pas pu localiser votre voiture");
    };
    map.getMyLocation(onSuccess, onError);
});


//trouver ma voiture
$$('.get-car-place').on('click', function() {
  var storedData = myApp.formGetData('localisation_du_voiture');
  if(storedData) {

    map.setCameraTarget(new plugin.google.maps.LatLng(JSON.stringify(storedData.lat),JSON.stringify(storedData.lng)));
    map.setCameraZoom(18);
        map.clear();
  showMapParkingData();
        map.addMarker({
    'position': new plugin.google.maps.LatLng(JSON.stringify(storedData.lat),JSON.stringify(storedData.lng)),
    'title': "Votre Voiture est ici",
      'icon' : 'www/icons/car.png',
            'animation': plugin.google.maps.Animation.DROP,
  }, function(marker) {
    marker.showInfoWindow();
  });
ouvrir_iterature_de_voiture();
  }  
  else {
    myApp.alert('Vous devez marquer votre voiture');
  }

});

//facebook sidebar button
$$('#facook_page').on('click', function (e) {
    startApp.set({ /* params */
    "action": "ACTION_VIEW",
    "uri": "fb://facewebmodal/f?href=https://www.facebook.com/parkingtn/"
}).start(); 
    });

//notre sitewbe button
$$('#notre_siteweb').on('click', function (e) {
    startApp.set({ /* params */
    "action": "ACTION_VIEW",
    "uri": "http://www.parking.tn/v1/"
}).start();

    });



//preloader
function showPreloader(){
    var storedData = myApp.formGetData('run_first_time');
    if(storedData) {
  }
  else {
    myApp.showPreloader('Chargement pour la premiére exécution')
    setTimeout(function () {
        myApp.hidePreloader();
    }, 7000);
    var storedData = myApp.formStoreData('run_first_time', {
    'runned_before': 1

  });
      
  }
}

//open modal des villes
$$('#les-villes').on('click', function () {
  myApp.modal({
    title:  'Les villes',
    verticalButtons: true,
    buttons: [
      {
        text: 'Tunis',
        onClick: function() {
          map.animateCamera({
  'target': new plugin.google.maps.LatLng(36.793447, 10.172239),
  'tilt': 60,
  'zoom': 15,
  'bearing': 140
});
        }
      },
      {
        text: 'Ariana',
        onClick: function() {
          map.animateCamera({
  'target': new plugin.google.maps.LatLng(36.860530, 10.173859),
  'tilt': 60,
  'zoom': 15,
  'bearing': 140
});
        }
      },
      {
        text: 'Marsa',
        onClick: function() {
          map.animateCamera({
  'target': new plugin.google.maps.LatLng(36.887734, 10.318161),
  'tilt': 60,
  'zoom': 15,
  'bearing': 140
});
        }
      },
              {
        text: 'Sfax',
        onClick: function() {
          map.animateCamera({
  'target': new plugin.google.maps.LatLng(34.739475, 10.756454),
  'tilt': 60,
  'zoom': 15,
  'bearing': 140
});
        }
      },
              {
        text: 'Sousse',
        onClick: function() {
map.animateCamera({
  'target': new plugin.google.maps.LatLng(35.825164, 10.632297),
  'tilt': 60,
  'zoom': 15,
  'bearing': 140
});
        }
      },
                      {
        text: 'Monastir',
        onClick: function() {
          map.animateCamera({
  'target': new plugin.google.maps.LatLng(35.772350, 10.822063),
  'tilt': 60,
  'zoom': 15,
  'bearing': 140
});
        }
      }
    ]
  })
});






function ouvrir_iterature_de_voiture() {
    var storedData = myApp.formGetData('localisation_du_voiture');

    var onSuccess = function(location) {
        lat = location.latLng.lat;
        lng = location.latLng.lng;
        maposition = location.latLng.lat+","+location.latLng.lng;
        direction = JSON.stringify(storedData.lat)+","+JSON.stringify(storedData.lng);
        myApp.confirm('ouvrir itérature ?', 'Parking Tunisie',
            function () {
                plugin.google.maps.external.launchNavigation({
                    "from": maposition,
                    "to": direction
                });
            },
            function () {

            }
        );
    };

    var onError = function(msg) {
        alert("Erreur : ereur");
    };
    map.getMyLocation(onSuccess, onError);
    //alert(getDistanceBetweenPoints(lat,lng,JSON.stringify(storedData.lat),JSON.stringify(storedData.lng));
};

function calcCrow(lat1, lon1, lat2, lon2)  {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

// Converts numeric degrees to radians
function toRad(Value) {
        return Value * Math.PI / 180;
    }


//etat actuelle du parking
$$('.etat-actuelle-parking').on('click', function() {
var found_parking=0 ;   
var onSuccess = function(location) {

for(var i = 0; i < ParkingData.length; i++) {
  distance = calcCrow(ParkingData[i].position.lat, ParkingData[i].position.lng, location.latLng.lat, location.latLng.lng);    
if (distance <=0.1){
    found_parking =1;
      myApp.modal({
    title:  'pourcentage',
    text: ParkingData[i].mtitle,
    verticalButtons: true,
    buttons: [
      {
        text: '0%',
        onClick: function() {
                etat_add(0,ParkingData[i].id);
        }
      },{
        text: '25%',
        onClick: function() {
                etat_add(25,ParkingData[i].id);
        }
      },
      {
        text: '50%',
        onClick: function() {
                etat_add(50,ParkingData[i].id);
        }
      },
      {
        text: '75%',
        onClick: function() {
                etat_add(75,ParkingData[i].id);
        }
      },      {
        text: '100%',
        onClick: function() {
                etat_add(100,ParkingData[i].id);
        }
      },{
        text: 'Fermer',
          onClick: function() {
        }
      }
    ]
  })
      break;
}
    

}
    if (found_parking == 0){
        myApp.alert("il n y a pas un parkink prés de vous");
    }

    };

    var onError = function(msg) {
        alert("Erreur : on n'a pas pu localiser votre voiture");
    };
    map.getMyLocation(onSuccess, onError); 
    

});

//contact email send
$$('body').on('click', '#send_email', function (e) {
/* your code goes here */
       var name = document.getElementById("name").value;
       var email_add = document.getElementById("email_add").value;
       var message = document.getElementById("message").value;
       //jquery ajax to send values to php using POST
$$.post('http://autopost.besthost.tn/app/send.php', {name:name, email_add: email_add,message: message}, function (data) {
myApp.alert(data, 'Parking Tunisie');
});
});

//function that insert etat in database
function etat_add(val,idd){
    $$.post('http://autopost.besthost.tn/app/addetat.php', {etat:val,id:idd}, function (data,status) {
        if (status == 200){myApp.alert(data, 'Parking Tunisie')}else { myApp.alert("Vérifier votre connextion Internet")}

});
}

//popup du markers info window ( modal )
function show_parking_data() {
  // Check first, if we already have opened picker
  if ($$('.picker-modal.modal-in').length > 0) {
    myApp.closeModal('.picker-modal.modal-in');
  }
  myApp.pickerModal(
    '<div class="picker-modal">' +
      '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
          '<div class="left"></div>' +
          '<div class="right"><a href="#" class="close-picker">Close</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="picker-modal-inner">' +
        '<div class="content-block">' +
          '<p>Lorem ipsum dolor ...</p>' +
        '</div>' +
      '</div>' +
    '</div>'
  )
}

//run parking check distance every 10 sec
function check_parking_is_close() {
    var last_one_found=0;  
   setInterval(function(){ 
var found_parking=0 ;       
var onSuccess = function(location) {

for(var i = 0; i < ParkingData.length; i++) {
  distance = calcCrow(ParkingData[i].position.lat, ParkingData[i].position.lng, location.latLng.lat, location.latLng.lng);    
if ((distance <=0.1) && (last_one_found != ParkingData[i].id)){
    last_one_found = ParkingData[i].id;
    found_parking =1;
      myApp.modal({
    title:  'pourcentage',
    text: ParkingData[i].mtitle,
    verticalButtons: true,
    buttons: [
      {
        text: '0%',
        onClick: function() {
                etat_add(0,ParkingData[i].id);
        }
      },{
        text: '25%',
        onClick: function() {
                etat_add(25,ParkingData[i].id);
        }
      },
      {
        text: '50%',
        onClick: function() {
                etat_add(50,ParkingData[i].id);
        }
      },
      {
        text: '75%',
        onClick: function() {
                etat_add(75,ParkingData[i].id);
        }
      },      {
        text: '100%',
        onClick: function() {
                etat_add(100,ParkingData[i].id);
        }
      },{
        text: 'Fermer',
          onClick: function() {
                
        }
      }
    ]
  })
      break;
}
    

}

    };

    var onError = function(msg) {
        alert("Erreur : on n'a pas pu localiser votre voiture");
    };
    map.getMyLocation(onSuccess, onError); 
}, 30000);
}
//this autocoplete no done yet
var autocompleteDropdownAjax = myApp.autocomplete({
    input: '#autocomplete-dropdown-ajax',
    openIn: 'dropdown',
    preloader: true, //enable preloader
    valueProperty: 'id', //object's "value" property name
    textProperty: 'name', //object's "text" property name
    limit: 20, //limit to 20 results
    dropdownPlaceholderText: 'Try "JavaScript"',
    expandInput: true, // expand input
    source: function (autocomplete, query, render) {
        var results = [];
        if (query.length === 0) {
            render(results);
            return;
        }
        // Show Preloader
        autocomplete.showPreloader();
        // Do Ajax request to Autocomplete data
        $$.ajax({
            url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
            method: 'POST',
            dataType: 'jsonp',
            //send "query" to server. Useful in case you generate response dynamically
            data: {
                query: query,
                key: 'AIzaSyAUKl6LZ6sCoxUwK0pqd_5kZ_GDwTRaSM8',
            },
            success: function (data) {
                // Find matched items
                for (var i = 0; i < data.length; i++) {
                    //if (data[i].formatted_address.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                    console.log(data[i].formatted_address);
                }
                // Hide Preoloader
                autocomplete.hidePreloader();
                // Render items by passing array with result items
                render(results);
            }
        });
    }
});




