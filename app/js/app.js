'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives'])//.
  // config(['$routeProvider', function($routeProvider) {
  //   $routeProvider.when('/resize', {templateUrl: 'partials/resize-demo.html', controller: MyCtrl1});
  //   $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
  //   $routeProvider.otherwise({redirectTo: '/'});
  // }]);


$(function() {


	var $window = $(window);
   

	$(document).ready(function($) {

		// Disable certain links in docs
		$('section [href^=#]').click(function (e) {
			e.preventDefault();
		});

		// Sidebar
		// var $sidenav = $('.bs-docs-sidenav'), offset = $sidenav.offset();
		// $sidenav.affix({offset: {top: offset.top - ($window.width() <= 979 ? 20 : 70), bottom: 270}}).addClass('animated');

	$('.ng-demo-sidenav').affix({
        offset: {
          top: $('.jumbotron').position().top+$('.jumbotron').height()
        }
	})
		// Make code pretty
		window.prettyPrint && window.prettyPrint();

})
});	