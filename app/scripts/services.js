'use strict';
angular.module('Dcfahrt.services', ['ngResource'])

  //.config(function ( $httpProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //$httpProvider.defaults.useXDomain = true;
    //console.log('Set.');
    //console.log($httpProvider.defaults.useXDomain);
  //})

/**
 * A simple example service that returns some data.
 */
  .factory('Stations', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var friends = [
      { id: 0, name: 'Scruff McGruff' },
      { id: 1, name: 'G.I. Joe' },
      { id: 2, name: 'Miss Frizzle' },
      { id: 3, name: 'Ash Ketchum' }
    ];

    return {
      all: function() {
        return friends;
      },
      get: function(friendId) {
        // Simple index lookup
        return friends[friendId];
      }
    };
  })

/**
 * A simple example service that returns some data.
 */
  .factory('RailIncidentsService', function($http, $resource, $q) {
    // Might use a resource here that returns a JSON array

    //$http.defaults.useXDomain = true;
    //delete $http.defaults.headers.common['X-Requested-With'];
    console.log($http.defaults.headers);

    console.log('Starting RailIncidentsService');
    var railIncidents = {};

    railIncidents.getRailIncidents = function() {

      console.log('Start getting incidents');

      var deferred = $q.defer();


      console.log('In defer');
      //delete $http.defaults.headers.common['X-Requested-With'];
      //delete $http.defaults.headers.common['Origin'];

      /*
       var User = $resource('http://ricardohbin.com/cors/testcors.php', {
       userId: '@id'
       });
       User.get({
       userId: 123
       }, function(data) {
       alert(data.ok);
       });
       */

      $http({
        url: 'http://wmataapibeta.azure-api.net/Incidents.svc/json/Incidents?api_key=kfgpmgvfgacx98de9q3xazww',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .success(function(data) {
          console.log('Got data');
          console.log(data);
          deferred.resolve(data);
        })
        .error(function(err) {
          console.log('There was an error: %s', err);
          deferred.reject('There was an error: %s', err);
        });

      return deferred.promise;

    };

    return railIncidents;

  })


/**
 * A simple example service that returns some data.
 */
  .factory('Friends', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var friends = [
      { id: 0, name: 'Scruff McGruff' },
      { id: 1, name: 'G.I. Joe' },
      { id: 2, name: 'Miss Frizzle' },
      { id: 3, name: 'Ash Ketchum' }
    ];

    return {
      all: function() {
        return friends;
      },
      get: function(friendId) {
        // Simple index lookup
        return friends[friendId];
      }
    };
  });
