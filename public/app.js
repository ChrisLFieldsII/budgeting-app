//import 3rd party modules
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-hover-dropdown';
import 'angular/angular';
import 'angular-route/angular-route';

//import controllers
import homeController from './angular/controllers/homeController';
import incomeController from './angular/controllers/incomeController';
import viewIncomesController from './angular/controllers/viewIncomesController';
import expensesController from './angular/controllers/expensesController';
import viewExpensesController from './angular/controllers/viewExpensesController';
import overviewController from './angular/controllers/overviewController';

//import filters
import dateFilter from './angular/filters/dateFilter';
import isoFilter from './angular/filters/isoFilter';

//create app
var app = angular.module('budgetApp', ['ngRoute']);

//create controllers
app.controller('homeController', ['$scope', '$http', homeController]);
app.controller('incomeController', ['$scope', '$http', incomeController]);
app.controller('viewIncomesController', ['$scope', '$http', viewIncomesController]);
app.controller('expensesController', ['$scope', '$http', expensesController]);
app.controller('viewExpensesController', ['$scope', '$http', viewExpensesController]);
app.controller('overviewController', ['$scope', '$http', overviewController]);

//create filters
app.filter('dateFilter', dateFilter); //useless ATM
app.filter('isoFilter', isoFilter); 

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: './angular/views/home.html',
        controller: 'homeController'
    })
    .when('/income', {
        templateUrl: './angular/views/income.html',
        controller: 'incomeController'
    })
    .when('/view_incomes', {
        templateUrl: './angular/views/view_incomes.html',
        controller: 'viewIncomesController'
    })
    .when('/expenses', {
        templateUrl: './angular/views/expenses.html',
        controller: 'expensesController'
    })
    .when('/view_expenses', {
        templateUrl: './angular/views/view_expenses.html',
        controller: 'viewExpensesController'
    })
    .when('/overview', {
        templateUrl: './angular/views/overview.html',
        controller: 'overviewController'
    })
    .otherwise({
        templateUrl: './angular/views/home.html',
        controller: 'homeController'
    });
});
