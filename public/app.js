//import 3rd party modules
import 'bootstrap/dist/css/bootstrap.css';
import 'angular/angular';
import 'angular-route/angular-route';

//import controllers
import homeController from './angular/controllers/homeController';
import incomeController from './angular/controllers/incomeController';
import expensesController from './angular/controllers/expensesController';
import overviewController from './angular/controllers/overviewController';

//create app
var app = angular.module('budgetApp', ['ngRoute']);

//create controllers
app.controller('homeController', ['$scope', '$http', homeController]);
app.controller('incomeController', ['$scope', incomeController]);
app.controller('expensesController', ['$scope', expensesController]);
app.controller('overviewController', ['$scope', overviewController]);

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
    .when('/expenses', {
        templateUrl: './angular/views/expenses.html',
        controller: 'expensesController'
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
