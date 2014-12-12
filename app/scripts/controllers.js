'use strict';
angular.module('Dcfahrt.controllers', [])

  .controller('HomeCtrl', function($scope) {

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
