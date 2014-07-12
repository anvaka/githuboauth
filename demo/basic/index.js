var angular = require('angular');

require('../../'); // require('githuboauth');

var ngApp = angular.module('basicDemo', []);

require('an').flush(ngApp);
angular.bootstrap(document, [ngApp.name]);
