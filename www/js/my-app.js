// Initialize your app
var myApp = new Framework7({

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
       
    });
 
    $$('.open-right-panel').on('click', function (e) {
        // 'right' position to open Right panel
        myApp.openPanel('right');
        
    });


//autocomplete part
$$('#myplace').on('focusin', function (e) {
    
    $$('#myplace').val('');
    });
$$('#myplace').on('blur', function (e) {
    
    });


//marquer ma voiture
$$('.save-storage-data').on('click', function() {
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
          map.setCenter(location.latLng);
          map.setZoom(18);
};

var onError = function(msg) {
  alert("Erreur : on n'a pas pu localiser votre voiture");
};
map.getMyLocation(onSuccess, onError);   
});
//trouver ma voiture
$$('.get-storage-data').on('click', function() {
  var storedData = myApp.formGetData('localisation_du_voiture');
  if(storedData) {
    map.setCenter(new plugin.google.maps.LatLng(JSON.stringify(storedData.lat),JSON.stringify(storedData.lng)));
    map.setZoom(18);
        map.clear();
  showMapParkingData();
        map.addMarker({
    'position': new plugin.google.maps.LatLng(JSON.stringify(storedData.lat),JSON.stringify(storedData.lng)),
    'title': "Votre Voiture est ici",
      'icon' : 'www/icons/car.png',
  }, function(marker) {
    marker.showInfoWindow();
  });
  }  
  else {
    alert('Vous devez marquer votre voiture');
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

//panel closed


//les villes go


