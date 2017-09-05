module.exports = function($scope, $http) {
    $scope.fromDate = null;
    $scope.toDate = new Date();

    var isoDate = new Date().toISOString();
    console.log(isoDate);
    console.log(new Date(isoDate.slice(0,10))); //2015-03-25T12:00:00-06:30

    var getIncomes = function() {
        $http.get('/income/').then(function success(res) { 
            $scope.doc = '';              
            $scope.incomes = res.data; 
            console.log(res.data)        
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

    $scope.edit = function(index) {
        $('#submit'+index).prop('disabled', false); //enable submit btn 
        $('#edit'+index).prop('disabled', true); 
        $('#income'+index).prop('readonly', false); //remove readonly property
        $('#date'+index).prop('readonly', false).prop('type', 'date');
        $('#category'+index).prop('disabled', false);
        $('#desc'+index).prop('readonly', false);        
    }

    $scope.submit = function(index, id) {
        $('#submit'+index).prop('disabled', true);
        $('#edit'+index).prop('disabled', false); //enable edit btn 
        $('#income'+index).prop('readonly', true);
        $('#date'+index).prop('readonly', true).prop('type', 'text');
        $('#category'+index).prop('disabled', true);
        $('#desc'+index).prop('readonly', true);        
        var editedObj = {
            income:$('#income'+index).val(),
            date:$('#date'+index).val(),
            category:$('#category'+index).val(),
            desc:$('#desc'+index).val()
        }
        $http.put('/income/'+id, editedObj).then(function success(res) {
            console.log('edit res',res);
            console.log('edit success');
        }, function error(res) {
            console.log('edit error');
        });     
        console.log('successfully edited with db id: ',id);        
    }

    $scope.delete = function(id) {
        if (confirm('Delete income doc?')) {
            console.log('deleted income doc with db id: ',id);
            $http.delete('/income/'+id).then(function success(res) {
                if ($scope.fromDate === null) $scope.searchAll();
                else $scope.search();
                console.log('income delete success');
            }, function error(res) {
                console.log('income delete error');
            });
        }
    }

    $scope.noConfirmDelete = function(id) {
        console.log('deleted income doc with db id: ',id);
        $http.delete('/income/'+id).then(function success(res) {
            if ($scope.fromDate === null) $scope.searchAll();
            else $scope.search();
            console.log('income delete success');
        }, function error(res) {
            console.log('income delete error');
        });
    }

    $scope.massDelete = function() {
        if (confirm('Mass delete docs?')) {
            var numIncomes = $scope.incomes.length;
            for (index=0; index<numIncomes; index++) {
                if (document.getElementById('massDelete'+index).checked) {
                    $scope.noConfirmDelete($scope.incomes[index]._id);
                }
            }    
        }
    }

    //enable checkbox tooltip
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip({html:true});
    });
}