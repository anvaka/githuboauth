module.exports = require('an').directive(githuboauth, 'githuboauth');
var Cookies = require('cookies-js');

function githuboauth($http) {
  var rateLimitUnknown = {
    limit: '?',
    remaining: '?',
    reset: '?'
  };

  return {
    restrict: 'ACE',
    replace: true,
    scope: {},
    template: require('fs').readFileSync(__dirname + '/index.html', 'utf8'),
    link: link
  };

  function link($scope, element, attr) {
    $scope.isAuthenticated = Cookies.get('accessToken');
    $scope.clientId = attr.clientId;
    $scope.rate = rateLimitUnknown;
    if (!$scope.isAuthenticated) {
      $http.get('https://api.github.com/rate_limit')
        .success(function(response, code) {
          if (code !== 200) return;
          $scope.rate = response.rate;
        });
    }
  }
}

githuboauth.$inject = ['$http'];
