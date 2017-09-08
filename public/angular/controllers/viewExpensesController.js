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

    $scope.edit = function(index) {
        $('#submit'+index).prop('disabled', false); //enable submit btn 
        $('#edit'+index).prop('disabled', true); 
        $('#expense'+index).prop('readonly', false); //remove readonly property
        $('#date'+index).prop('readonly', false).prop('type', 'date');
        $('#category'+index).prop('disabled', false);
        $('#desc'+index).prop('readonly', false);        
    }

    $scope.submit = function(index, id) {
        $('#submit'+index).prop('disabled', true);
        $('#edit'+index).prop('disabled', false); //enable edit btn 
        $('#expense'+index).prop('readonly', true);
        $('#date'+index).prop('readonly', true).prop('type', 'text');
        $('#category'+index).prop('disabled', true);
        $('#desc'+index).prop('readonly', true);        
        var editedObj = {
            expense:$('#expense'+index).val(),
            date:$('#date'+index).val(),
            category:$('#category'+index).val(),
            desc:$('#desc'+index).val()
        }
        $http.put('/expense/'+id, editedObj).then(function success(res) {
            console.log('edit res',res);
            console.log('edit success');
        }, function error(res) {
            console.log('edit error');
        });     
        console.log('successfully edited with db id: ',id);        
    }

    $scope.delete = function(id) {
        if (confirm('Delete expense doc?')) {
            console.log('deleted expense doc with db id: ',id);
            $http.delete('/expense/'+id).then(function success(res) {
                if ($scope.fromDate === null) $scope.searchAll();
                else $scope.search();
                console.log('expense delete success');
            }, function error(res) {
                console.log('expense delete error');
            });
        }
    }

    var noConfirmDelete = function(id) {
        console.log('deleted expense doc with db id: ',id);
        $http.delete('/expense/'+id).then(function success(res) {
            if ($scope.fromDate === null) $scope.searchAll();
            else $scope.search();
            console.log('expense delete success');
        }, function error(res) {
            console.log('expense delete error');
        });
    }

    $scope.massDelete = function() {
        if (confirm('Mass delete docs?')) {
            var numExpenses = $scope.expenses.length;
            for (index=0; index<numExpenses; index++) {
                if (document.getElementById('massDelete'+index).checked) {
                    $scope.noConfirmDelete($scope.expenses[index]._id);
                }
            }    
        }
    }

    $scope.deleteAll = function() {
        if (confirm('Are you sure you want to delete all?')) {
            var numIncomes = $scope.expenses.length;
            for (index=0; index<numIncomes; index++) {
                noConfirmDelete($scope.expenses[index]._id);
            }
        }
    }

    //enable checkbox tooltip
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip({html:true});
    });
}