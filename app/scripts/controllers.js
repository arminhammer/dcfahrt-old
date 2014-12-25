'use strict';
angular.module('Dcfahrt.controllers', [])

  /*
   .config(function ( $httpProvider) {
   delete $httpProvider.defaults.headers.common['X-Requested-With'];
   $httpProvider.defaults.useXDomain = true;
   })
   */

  .controller('HomeCtrl', function($scope, RailService) {

    console.log($scope.favoriteStations);
    $scope.railIncidents = [];

    console.log('Starting here');

    RailService.getRailIncidents()
      .then(function(data) {
        console.log('Got data in controller:');
        console.log(data);
        $scope.railIncidents = data.Incidents;
      });

    RailService.getFavoriteStations()
      .then(function(data) {
        $scope.favoriteStations = data;
        console.log('Favorite stations');
        console.log($scope.favoriteStations);
      });

  })

  .controller('StationsCtrl', function($scope, RailService) {

    $scope.lines = RailService.getLines();

  })

  .controller('MapCtrl', function($scope) {

  })

  .controller('StationsLineCtrl', function($scope, $stateParams, RailService) {

    $scope.lineId = $stateParams.lineId;
    $scope.lineColor = RailService.getLines()[$scope.lineId];
    $scope.stations = [];

    RailService.getStations($scope.lineId)
      .then(function(data) {
        $scope.stations = data.Stations;
      });

    console.log('id is %s and color is %s', $scope.lineId, $scope.lineColor);

    console.log('COntroller stations:');
    console.log($scope.stations);
    console.log('StationsLineCtrl has id %s', $stateParams.lineId);
    //$scope.friend = Friends.get($stateParams.friendId);

  })


  .controller('StationsDetailsCtrl', function($scope, $stateParams, RailService) {

    console.log('StationsDetailsCtrl');
    $scope.stationId = $stateParams.stationId;
    //$scope.station = {};

    $scope.pushFavoriteChange = function() {

      console.log('Favorite toggled: %s', $scope.station.favorite);

      if($scope.station.favorite) {
        RailService.addFavoriteStation($scope.station.Code);
      }

    };

    RailService.getStationDetails($scope.stationId)
      .then(function(data) {
        $scope.station = data;
        $scope.station.favorite = false;
        console.log('station scope');
        console.log($scope.station);
      });

    //console.log('Station:');
    //console.log($scope.station.Name);
  })

  // Remove all below

  .controller('DashCtrl', function($scope) {

  })

  .controller('FriendsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();

  })

  .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);

  })

  .controller('AccountCtrl', function($scope) {

  });
