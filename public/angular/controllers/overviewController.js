module.exports = function($scope, $http) { 
    var getAllIncomes = function() {
        $http.get('/income/').then(function success(res) {
            var allIncomes = res.data;
            $scope.totalIncome = calcIncomes(allIncomes);
            console.log('all incomes:',allIncomes);
            console.log('get all incomes success');
        }, function error(res) {
            console.log('get all incomes error');
        });
    }
    getAllIncomes();

    var calcIncomes = function(allIncomes) {
        var totalIncome = 0;
        allIncomes.forEach(incomeDoc => {
            totalIncome += incomeDoc.income;
        });
        return totalIncome;
    }

    var getAllExpenses = function() {
        $http.get('/expense/').then(function success(res) {
            var allExpenses = res.data;
            $scope.totalExpenses = calcExpenses(allExpenses);
            console.log('all expenses:',allExpenses);
            console.log('get all expenses success');
        }, function error(res) {
            console.log('get all expenses error');
        });
    }
    getAllExpenses();

    var calcExpenses = function(allExpenses) {
        var totalExpenses = 0;
        allExpenses.forEach(expenseDoc => {
            totalExpenses += expenseDoc.expense;
        });
        return totalExpenses;
    }

    $scope.search = function() {
        var from = convertToLocal($scope.fromDate, 'from');
        var to = convertToLocal($scope.toDate, 'to');
        $http.get('/income/'+from+'/'+to).then(function success(res) {
            var allIncomes = res.data;
            $scope.totalIncome = calcIncomes(allIncomes);
            console.log('all incomes',allIncomes);
            console.log('successfully got all incomes from '+from.slice(0,10)+' to '+to.slice(0,10));
        }, function error(res) {
            console.log('error getting all incomes from '+from.slice(0,10)+' to '+to.slice(0,10));
        });

        $http.get('/expense/'+from+'/'+to).then(function success(res) {
            var allExpenses = res.data;
            $scope.totalExpenses = calcExpenses(allExpenses);
            console.log('all expenses', allExpenses);
            console.log('successfully got all expenses from '+from.slice(0,10)+' to '+to.slice(0,10));
        }, function error(res) {
            console.log('error getting all expenses from '+from.slice(0,10)+' to '+to.slice(0,10));            
        });
    }

    $scope.searchAll = function() {
        $scope.fromDate = null;
        $scope.toDate = null;
        getAllIncomes();
        getAllExpenses();
    }

    $scope.dateRange = function() {
        if ($scope.fromDate && $scope.toDate) {
            return $scope.fromDate.toISOString().slice(0,10)+' to '+$scope.toDate.toISOString().slice(0,10);
        }
        else return 'the beginning of time';
    }

    var convertToLocal = function(date, toOrFrom) {
        var dateString = date.toString();
        var convertedIsoDate = date.toISOString().slice(0,23);
        if (toOrFrom === 'from') 
            convertedIsoDate = convertedIsoDate.slice(0,11)+'00:00:00Z';            
        else 
            convertedIsoDate = convertedIsoDate.slice(0,11)+'23:59:59Z';
        console.log('converted iso date',convertedIsoDate)        
        return convertedIsoDate;        
    }
}