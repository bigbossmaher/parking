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
       map.setClickable( false );
    });
 
    $$('.open-right-panel').on('click', function (e) {
        // 'right' position to open Right panel
        myApp.openPanel('right');
        map.setClickable( false );
    });
$$('.panel-right').on('panel:closed', function () {
    myApp.alert('Left panel is closing!');
});


//autocomplete part
$$('#myplace').on('focusin', function (e) {
    map.setClickable( false );
    $$('#myplace').val('');
    });
$$('#myplace').on('blur', function (e) {
    map.setClickable( true );
    });


//marquer ma voiture
$$('.save-storage-data').on('click', function() {
      var onSuccess = function(location) {
          var storedData = myApp.formStoreData('localisation_du_voiture', {
    'lat': location.latLng.lat,
     'lng': location.latLng.lng    
        
  });
  map.addMarker({
    'position': location.latLng,
    'title': "Votre Voiture est ici"
  }, function(marker) {
    marker.showInfoWindow();
  });
   myApp.addNotification({
        title: 'Parking Tunisie',
        message: 'La localisation de votre voiture est bien enregistré.'
    });       
};

var onError = function(msg) {
  alert("Erreur : on n'a pas pu localiser votre voiture");
};
map.getMyLocation(onSuccess, onError);   
});
$$('.get-storage-data').on('click', function() {
  var storedData = myApp.formGetData('localisation_du_voiture');
  if(storedData) {
    myApp.alert(JSON.stringify(storedData));
  }
  else {
    alert('There is no stored data for this form yet. Try to change any field')
  }
    map.setZoom(7);
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