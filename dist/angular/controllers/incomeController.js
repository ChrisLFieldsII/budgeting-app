module.exports = function($scope, $http) { //might not need $http
    $scope.income = 10000;
    $scope.date = '';
    $scope.submit = function() {
        log([$scope.income, $scope.date]);
    }

    function log(msgs) {
        numMsgs = msgs.length;
        for (i = 0; i < numMsgs; i++) {
            console.log(msgs[i]);
        }
    }
}