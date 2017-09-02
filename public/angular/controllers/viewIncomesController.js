module.exports = function($scope, $http) {
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
}