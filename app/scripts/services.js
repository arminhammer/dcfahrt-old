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
  .factory('RailService', function($http, $resource, $q) {

    var lines = {};
    lines.GR = { id: 'GR', color: 'Green' };
    lines.BL = { id: 'BL', color: 'Blue' };
    lines.SV = { id: 'SV', color: 'Silver' };
    lines.RD = { id: 'RD', color: 'Red' },
    lines.OR = { id: 'OR', color: 'Orange' };
    lines.YL = { id: 'YL', color: 'Yellow' };

    console.log('Starting RailIncidentsService');
    var railIncidents = {};

    railIncidents.getLines = function() {

      return lines;
      /*
      {
        { 'GR': { color: 'Green' },
        { id: 'BL', color: 'Blue' },
        { id: 'SV', color: 'Silver' },
        { id: 'RD', color: 'Red' },
        { id: 'OR', color: 'Orange' },
        { id: 'YL', color: 'Yellow' }
      };
      */
    };

    railIncidents.getStations = function(lineId) {

      console.log('Start getting stations');

      var deferred = $q.defer();

      var url = 'http://wmataapibeta.azure-api.net/Rail.svc/json/jStations?LineCode=' + lineId + '&api_key=kfgpmgvfgacx98de9q3xazww';

      console.log(url);

      $http.get(url)
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

    railIncidents.getRailIncidents = function() {

      console.log('Start getting incidents');

      var deferred = $q.defer();

      var url = 'http://wmataapibeta.azure-api.net/Incidents.svc/json/Incidents?api_key=kfgpmgvfgacx98de9q3xazww';

      $http.get(url)
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
