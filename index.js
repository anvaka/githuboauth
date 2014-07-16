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
    var weGotCodeFromGithub = window.location.href.match(/code=([^&#]*)/);
    var cookieName = attr.cookiename || 'accessToken';

    $scope.$on('ratechanged', updateRateLimit);
    $scope.isAuthenticated = Cookies.get(cookieName);
    $scope.clientId = attr.clientid;
    $scope.rate = rateLimitUnknown;

    if ($scope.isAuthenticated) {
      updateUserInfo();
    } else if (weGotCodeFromGithub) {
      tradeCodeForToken(attr.oauthproxy, weGotCodeFromGithub[1]);
    }

    updateRateLimit();


    function updateUserInfo() {
      $http.get('https://api.github.com/user?access_token=' + Cookies.get(cookieName))
        .success(function(user, code) {
          if (code !== 200) return;
          $scope.user = user;
        });
    }

    function tradeCodeForToken(oauthProxy, code) {
      if (!oauthProxy) throw new Error('javascript based oauth is not supported by github. Please setup oauth proxy. See documentation: https://github.com/anvaka/githuboauth');

      var suffix = (oauthProxy[oauthProxy.length - 1] === '/' ? '' : '/') + code;
      $http.get(oauthProxy + suffix)
        .success(function(response, code) {
          if (code !== 200) return;
          if (response && response.token) {
            Cookies.set(cookieName, response.token);
            updateRateLimit();
          }
        });
    }

    function updateRateLimit(rateLimit) {
      if (rateLimit) {
        $scope.rate = rateLimit;
        return;
      }
      var suffix = '';
      var accessToken = Cookies.get(cookieName);
      if (accessToken) {
         suffix = '?access_token=' + accessToken;
      }
      $http.get('https://api.github.com/rate_limit' + suffix)
        .success(function(response, code) {
          if (code !== 200) return;
          $scope.rate = response.rate;
        });
    }
  }

}

githuboauth.$inject = ['$http'];
