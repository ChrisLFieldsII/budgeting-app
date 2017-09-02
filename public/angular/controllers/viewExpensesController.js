module.exports = function($scope, $http) {
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
}