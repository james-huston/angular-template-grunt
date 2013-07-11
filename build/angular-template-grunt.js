/**
 * Template for angular bower modules with Grunt build process'
 * @version v0.1.0-dev-2013-07-10
 */
(function (window, angular, undefined) {

/**
 * Default index file to get you started. Have fun!
 *
 * @author James Huston <jhuston@redventures.com>
 * @since 2013-07-10
 */

angular.module('angular-template-grunt', []);

angular.module('angular-template-grunt', ['index.tpl.html']);

angular.module("index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("index.tpl.html",
    "\n" +
    "<div>Go Go Magic Template!</div>\n" +
    "");
}]);
})(window, window.angular);