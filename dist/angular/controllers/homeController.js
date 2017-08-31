module.exports = function($scope, $http) {
    $scope.name = 'Chris';
    $http.get('/', function(req, res) {
        res.send('get method from homeController');
    });
}