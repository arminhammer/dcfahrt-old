'use strict';
angular.module('Dcfahrt.controllers', [])

  .controller('DashCtrl', function($scope) {
  })

  .controller('HomeCtrl', function($scope) {
    $scope.friends = 'test';
  })

  .controller('FriendsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();
  })

  .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
  })

  .controller('AccountCtrl', function($scope) {
  });
