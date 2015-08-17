/**
 * 
 */

var module = angular.module("product", [ "angularGrid" ]);

module.controller("productCtrl", function($scope, $http) {
	var query;
	
	var columnDefs = [ {
		headerName : "productId",
		field : "productId",
		width : 150
	}, {
		headerName : "name",
		field : "name",
		width : 90
	}, {
		headerName : "description",
		field : "description",
		width : 120
	}, {
		headerName : "points",
		field : "points",
		width : 90
	}, {
		headerName : "startDate",
		field : "startDate",
		width : 110
	}, {
		headerName : "endDate",
		field : "endDate",
		width : 110
	},

	];

	$scope.gridOptions = {
		columnDefs : columnDefs,
		rowData : null,
		groupUseEntireRow : true,
		enableSorting : true,
		enableFilter : true,
		enableColResize : true,
		rowSelection : 'single',
		rowDeselection : true,
		rowSelected: rowSelectedFunc,

	};
	var productIdSelected;
	var nameSelected;
	var descriptionSelected;
	var effectiveStartSelected;
	var effectiveEndSelected;
	function rowSelectedFunc(row) {
		productIdSelected=row.productId;
		
		$scope.productName=row.name;
		$scope.description=row.description;
		$scope.points=row.points;
		$scope.effectiveStart=row.effectiveStart;
		$scope.effectiveEnd=row.effectiveEnd;
				
		effectiveStartSelected=row.effectiveStart;
		effectiveEndSelected=row.effectiveEnd;
    }

	$scope.productSearch = function() {
		query = "http://localhost:8080/viewproduct?";
		if ($scope.productName != undefined && $scope.productName != "") {
			query = query + "name=" + $scope.productName;
		}

		$http.get(query).then(function(res) {
			$scope.gridOptions.rowData = res.data;
			$scope.gridOptions.api.onNewRows();
		});
	};
	
	
	$scope.addProduct = function() {
		var dataObj = {
				name : $scope.productName,
				description : $scope.description,
				points : $scope.points,
				startDate : $scope.effectiveStart,
				endDate : $scope.effectiveEnd
				
		};	
			$http.post("http://localhost:8080/addproduct",dataObj).then(function(res) {
			$scope.gridOptions.rowData = res.data;
			$scope.gridOptions.api.onNewRows();
		});
	};
	
	
	$scope.updateProduct = function() {
		var dataObj = {
				name : $scope.productName,
				description : $scope.description,
				points : $scope.points,
				startDate : $scope.effectiveStart,
				endDate : $scope.effectiveEnd
				
		};	
			$http.put("http://localhost:8080/updateproduct/"+productIdSelected ,dataObj).then(function(res) {
				$scope.productSearch();
		});
	};
	
	
	$scope.deleteProduct = function() {
		
			$http.delete("http://localhost:8080/deleteproduct/"+productIdSelected).then(function() {;
			$scope.productSearch();
		});
	};
});
