'use strict';

/* Services */

var puppetdbServices = angular.module('puppetdbServices', ['ngResource']);

puppetdbServices.factory('Nodes', ['$resource',
  function($resource){
    return $resource('api/nodes', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });

  }]);

puppetdbServices.factory('NodeSummaries', ['$resource',
  function($resource){
    return $resource('api/node_summaries', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);

puppetdbServices.factory('NodeReports', ['$resource',
  function($resource){
    return $resource('api/nodes/:nodeId/reports', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);

puppetdbServices.factory('LatestReportEvents', ['$resource',
  function($resource){
    return $resource('api/reports/latest/:nodeId', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);

puppetdbServices.factory('ReportEvents', ['$resource',
  function($resource){
    return $resource('api/reports/:reportId', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);

puppetdbServices.factory('NodeFacts', ['$resource',
  function($resource){
    return $resource('api/nodes/:nodeId/facts', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);

puppetdbServices.factory('Stats', ['$resource',
  function($resource){
    return $resource('api/stats', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });

  }]);
