'use strict';

/* App Module */

var puppetdbApp = angular.module('puppetdbApp', [
  'ngRoute',
  'puppetdbAnimations',
  'puppetdbControllers',
  'puppetdbFilters',
  'puppetdbServices'
]);

puppetdbApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/nodes', {
        templateUrl: '/app/partials/node-list.html',
        controller: 'NodeListCtrl'
      }).    
      when('/nodes/:nodeId', {
        templateUrl: '/app/partials/node-detail.html',
        controller: 'NodeDetailCtrl'
      }).      
      when('/nodes/:nodeId/reports/:reportId', {
        templateUrl: '/app/partials/report-detail.html',
        controller: 'ReportDetailCtrl'
      }).
      when('/reports/latest/:nodeId', {
        templateUrl: '/app/partials/report-detail.html',
        controller: 'LatestReportCtrl'
      }).
      otherwise({
        redirectTo: '/nodes'
      });
  }]);
