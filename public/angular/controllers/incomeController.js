module.exports = function($scope, $http) { 
    //console.log('example iso string date: ',new Date().toISOString())
    var d = new Date();
    console.log('date',d)    
    var isoDate = d.toISOString();
    console.log('iso date',isoDate)
    var offSet = d.getTimezoneOffset();
    var hrs = offSet/60;
    var dHrs = d.getHours();
    console.log('time zone offset',offSet)
    console.log('hours offset', hrs)



    $scope.income = 0;
    $scope.date = new Date();
    $scope.category = 'Job'; //defaulting to job
    $scope.desc = 'Raytheon paycheck';

    $scope.success;
    $scope.submit = function() {           
        $scope.incomeObj = {
            income: $scope.income,
            date: $scope.date.toISOString(),
            category: $scope.category,
            desc: $scope.desc
        };
        console.log($scope.incomeObj);
        $http.post('/income/', $scope.incomeObj).then(function success(res) {
            $scope.success = true;
            console.log('successfully post income obj');
            console.log('income res: ',res);
        }, function error(res) {
            console.error('failed to post income obj');
        });
        //reset form
        $scope.income = 0;
        $scope.date = new Date();
        $scope.category = 'Job'; //defaulting to job
        $scope.desc = 'Raytheon paycheck';    
    }
}