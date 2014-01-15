'use strict';

/* Controllers */

var puppetdbControllers = angular.module('puppetdbControllers', []);

puppetdbControllers.controller('NodeListCtrl', ['$scope', 'Nodes','NodeSummaries', 'Stats',
  function($scope, Nodes, NodeSummaries, Stats) {
    $scope.nodes = Nodes.query();
    $scope.stats = Stats.query();
    var summaries = NodeSummaries.query(function() {
	    var keyedSummaries = {};
	    angular.forEach(summaries, function(value, index){
	    	keyedSummaries[value['subject']['title']] = value;
		}, null);
		$scope.nodeSummaries = keyedSummaries;
    });    
    $scope.orderProp = 'name';
    $scope.nodeStatus = function (node) {
    	if (!$scope.nodeSummaries[node.name] || !node['report_timestamp']) {
    		return 'unreported';
    	} else if($scope.nodeSummaries[node.name]['failures'] > 0) {
    		return 'failed';
    	} else {
    		return 'success';
    	}
    }
  }]);

puppetdbControllers.controller('NodeDetailCtrl', ['$scope', '$routeParams', 'NodeFacts', 'NodeReports',
  function($scope, $routeParams, NodeFacts, NodeReports) {
  	$scope.nodeId =  $routeParams.nodeId;
    $scope.facts = NodeFacts.query({nodeId: $routeParams.nodeId});
    $scope.reports = NodeReports.query({nodeId: $routeParams.nodeId});
}]);

puppetdbControllers.controller('ReportDetailCtrl', ['$scope', '$routeParams', 'ReportEvents',
  function($scope, $routeParams, ReportEvents) {
  	$scope.reportId =  $routeParams.reportId;
  	$scope.nodeId =  $routeParams.nodeId;
    $scope.events = ReportEvents.query({reportId: $routeParams.reportId});
}]);

puppetdbControllers.controller('LatestReportCtrl', ['$scope', '$routeParams', 'LatestReportEvents',
  function($scope, $routeParams, LatestReportEvents) {
  	$scope.nodeId =  $routeParams.nodeId;
    $scope.events = LatestReportEvents.query({nodeId: $routeParams.nodeId});
}]);
