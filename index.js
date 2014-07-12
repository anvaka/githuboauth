module.exports = require('an').directive( githuboauth, 'githuboauth');
var Cookies = require('cookies-js');

function githuboauth() {
  return {
    restrict: 'ACE',
    replace: true,
    scope: {},
    template: require('fs').readFileSync(__dirname + '/index.html', 'utf8'),
    link: function ($scope, element, attr) {
       $scope.isAuthenticated = Cookies.get('accessToken');
       $scope.clientId = attr.clientId;
    }
  };
}
