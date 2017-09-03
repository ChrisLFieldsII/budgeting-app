module.exports = function($scope, $http) {
    $scope.fromDate = null;
    $scope.toDate = new Date();
    
    var getIncomes = function() {
        $http.get('/income/').then(function success(res) { 
            $scope.doc = '';  
            $scope.incomes = res.data;         
            console.log('successfully got all income docs');
        }, function error(res) {
            console.log('error getting all income docs');
        });
    };
    getIncomes();

    $scope.searchAll = function() {
        $scope.fromDate = null;
        getIncomes();
    }

    $scope.search = function() {
        console.log('from date: ',$scope.fromDate.toISOString());
        console.log('to date: ',$scope.toDate.toISOString());
        $http.get('/income/'+$scope.fromDate.toISOString()+'/'+$scope.toDate.toISOString()).then(function success(res) {
            $scope.doc = '';  
            $scope.incomes = res.data;
            console.log('view incomes search success');
            console.log('view incomes search res',res);
        }, function error(res) {
            console.log('view incomes search error');
        });
    }
}