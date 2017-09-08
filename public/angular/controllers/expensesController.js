module.exports = function($scope, $http) { 
    $scope.expense = 0;
    $scope.date = new Date();
    $scope.category = 'Food'; //defaulting to food
    $scope.desc = 'sushi';

    $scope.success;
    $scope.submit = function() {                
        $scope.expenseObj = {
            expense: $scope.expense,
            date: $scope.date,
            category: $scope.category,
            desc: $scope.desc
        };
        //console.log($scope.expenseObj);
        $http.post('/expense/', $scope.expenseObj).then(function success(res) {
            $scope.success = true;
            console.log('successfully post expense obj');
            console.log(res);
        }, function error(res) {
            console.error('failed to post expense obj');
        });
        //reset form
        $scope.expense = 0;
        $scope.date = new Date();
        $scope.category = 'Food'; //defaulting to food
        $scope.desc = 'sushi';
    }
}