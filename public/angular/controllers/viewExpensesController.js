module.exports = function($scope, $http) {
    $scope.fromDate = null;
    $scope.toDate = new Date();

    var getExpenses = function() {
        $http.get('/expense/').then(function success(res) {
            $scope.doc = '';
            $scope.expenses = res.data;
            console.log('successfully got all expenses');
            console.log(res);            
        }, function error(res) {
            console.error('failed to get all expenses');
        });
    }
    getExpenses();

    $scope.searchAll = function() {
        $scope.fromDate = null;
        getExpenses();
    }

    $scope.search = function() {
        console.log('from date: ',$scope.fromDate.toISOString());
        console.log('to date: ',$scope.toDate.toISOString());
        $http.get('/expense/'+$scope.fromDate.toISOString()+'/'+$scope.toDate.toISOString()).then(function success(res) {
            $scope.doc = '';  
            $scope.expenses = res.data;
            console.log('view expenses search success');
            console.log('view expenses search res',res);
        }, function error(res) {
            console.log('view expenses search error');
        });
    }
}