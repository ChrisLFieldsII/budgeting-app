module.exports = function($scope, $http) { 
    //console.log('example iso string date: ',new Date().toISOString())
    var d = new Date();
    console.log('date',d)    
    var isoDate = d.toISOString();
    var convertedIsoDate = d.toISOString().slice(0,23)+'+05:00'; //WORKS
    console.log('convertedIsoDate',new Date(convertedIsoDate))
    console.log(convertedIsoDate)
    console.log('iso date',isoDate)
    var offSet = d.getTimezoneOffset();
    var hrs = offSet/60;
    var dHrs = d.getHours();
    console.log('time zone offset',offSet)
    console.log('hours offset', hrs)


    //defaults
    $scope.income = 0;
    $scope.date = new Date();
    $scope.category = 'Job'; //defaulting to job
    $scope.desc = 'Raytheon paycheck';

    $scope.submit = function() {  
        $scope.incomeObj = {
            income: $scope.income,
            date: convertToLocal($scope.date),
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