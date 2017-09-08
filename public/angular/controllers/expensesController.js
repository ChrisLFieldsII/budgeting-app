module.exports = function($scope, $http) { 
    $scope.expense = 0;
    $scope.date = new Date();
    $scope.category = 'Food'; //defaulting to food
    $scope.desc = 'sushi';

    $scope.success;
    $scope.submit = function() {                
        $scope.expenseObj = {
            expense: $scope.expense,
            date: convertToLocal($scope.date),
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

    var convertToLocal = function(date) {
        var dateString = date.toString();
        var offset = dateString.slice(28,33);
        //console.log('offset',offset);
        if (offset.slice(0,1) === '-') offset = '+'+offset.slice(1,5);
        else offset = '-'+offset.slice(1,5);
        //console.log('updated offset',offset);
        offset = offset.slice(0,3)+':'+offset.slice(3,5);
        //console.log('more updated offset',offset);
        var convertedIsoDate = date.toISOString().slice(0,23)+offset;
        return convertedIsoDate;        
    }
}