module.exports = function($scope, $http) { 
    $scope.expense = 0;
    $scope.date = new Date();
    $scope.category = 'food'; //defaulting to food
    $scope.desc = 'sushi';

    $scope.submit = function() {                
        $scope.expenseObj = {
            expense: $scope.expense,
            date: $scope.date,
            category: $scope.category,
            desc: $scope.desc
        };
        console.log($scope.expenseObj);
        $http.post('/expense/', $scope.expenseObj).then(function success(res) {
            console.log('successfully post expense obj');
            console.log(res);
        }, function error(res) {
            console.error('failed to post expense obj');
        });
    }

    //Ex format: Fri 9-1-2017
    function formatDate(date) {
        day = date.getDay();
        switch (day) {
            case 0:
                day = 'Sun';
                break;
            case 1:
                day = 'Mon';
                break;
            case 2:
                day = 'Tue';
                break;
            case 3:
                day = 'Wed';
                break;
            case 4:
                day = 'Thur';
                break;
            case 5:
                day = 'Fri';
                break;
            case 6:
                day = 'Sat';
                break;
        }

        var month = date.getMonth();
        month += 1;

        var dayNum = date.getDate()

        var year = date.getFullYear();
        return day + ' ' + month + '-' + dayNum + '-' + year;
    }
    
    
    
    
    function log(msgs) {
        numMsgs = msgs.length;
        for (i = 0; i < numMsgs; i++) {
            console.log(msgs[i]);
        }
    }
}