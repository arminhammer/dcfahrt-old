'use strict';
angular.module('Dcfahrt.controllers', [])

  /*
  .config(function ( $httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.useXDomain = true;
  })
  */

  .controller('HomeCtrl', function($scope, RailIncidentsService) {

    $scope.railIncidents = [];

    console.log('Starting here');

    RailIncidentsService.getRailIncidents()
      .then(function(data) {
        console.log('Got data in controller:');
        console.log(data);
        $scope.railIncidents = data.Incidents;
      })

  })

  .controller('StationsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();
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
