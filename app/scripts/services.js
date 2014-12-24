'use strict';
angular.module('Dcfahrt.services', [])

  //.config(function ( $httpProvider) {
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //$httpProvider.defaults.useXDomain = true;
  //console.log('Set.');
  //console.log($httpProvider.defaults.useXDomain);
  //})

  // service from http://learn.ionicframework.com/formulas/localstorage/
  .factory('$localstorage', ['$window', function($window) {
    return {
      setString: function(key, value) {
        $window.localStorage[key] = value;
      },
      getString: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }])

  .factory('FavoriteStationsService', ['$http', '$q', '$localstorage', function($http, $q, $localstorage) {

    var favoriteStationsService = {};

    //favoriteStationsService.favoriteStations = $localstorage.getObject('favoriteStations') || {};

    favoriteStationsService.favoriteStations = {};

    favoriteStationsService.getFavoriteStations = function() {

      return favoriteStationsService.favoriteStations;

    };

    favoriteStationsService.addFavoriteStation = function(station) {

      favoriteStationsService.favoriteStations[station.Code] = station;

      //$localstorage.setObject('favoriteStations', favoriteStationsService.favoriteStations);

    };

    return favoriteStationsService;

  }])

/**
 * A simple example service that returns some data.
 */
  .factory('RailService', function($http, $q, ENV) {

    console.log('ENV:');
    console.log(ENV);

    console.log('Starting RailIncidentsService');
    var railService = {};

    railService.lines = {};
    railService.lines.GR = { id: 'GR', color: 'Green' };
    railService.lines.BL = { id: 'BL', color: 'Blue' };
    railService.lines.SV = { id: 'SV', color: 'Silver' };
    railService.lines.RD = { id: 'RD', color: 'Red' };
    railService.lines.OR = { id: 'OR', color: 'Orange' };
    railService.lines.YL = { id: 'YL', color: 'Yellow' };

    railService.getLines = function() {

      return railService.lines;

    };

    railService.getStationDetails = function(stationId) {

      console.log('Start getting stations');

      var deferred = $q.defer();

      var url = 'http://wmataapibeta.azure-api.net/Rail.svc/json/jStationInfo?StationCode=' + stationId + '&api_key=' + ENV.apiKey;

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

    railService.getStations = function(lineId) {

      console.log('Start getting stations');

      var deferred = $q.defer();

      var url = 'http://wmataapibeta.azure-api.net/Rail.svc/json/jStations?LineCode=' + lineId + '&api_key=' + ENV.apiKey;

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

    railService.getRailIncidents = function() {

      console.log('Start getting incidents');

      var deferred = $q.defer();

      var url = 'http://wmataapibeta.azure-api.net/Incidents.svc/json/Incidents?api_key=' + ENV.apiKey;

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

    return railService;

  });
