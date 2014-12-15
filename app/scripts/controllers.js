'use strict';
angular.module('Dcfahrt.controllers', [])

  /*
   .config(function ( $httpProvider) {
   delete $httpProvider.defaults.headers.common['X-Requested-With'];
   $httpProvider.defaults.useXDomain = true;
   })
   */

  .controller('HomeCtrl', function($scope, RailService) {

    $scope.railIncidents = [];

    console.log('Starting here');

    RailService.getRailIncidents()
      .then(function(data) {
        console.log('Got data in controller:');
        console.log(data);
        $scope.railIncidents = data.Incidents;
      })

  })

  .controller('StationsCtrl', function($scope, RailService) {

    $scope.lines = RailService.getLines();

  })

  .controller('StationsLineCtrl', function($scope, $stateParams, RailService) {

    $scope.lineId = $stateParams.lineId;
    $scope.lineColor = RailService.getLines()[$scope.lineId];

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
