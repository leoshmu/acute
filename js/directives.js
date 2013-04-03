'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

angular.module('myApp.directives', []).
  directive('resizeable', function(){
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'partials/resize-template.html',
      replace: true,
      transclude: true,
      link: function(scope, elm, attrs){
        console.log(scope, elm, attrs);      
        scope.resize_contents = elm.width();
        
        var bottom_edge = elm.find('.resize-bottom-edge');
        bottom_edge.bind('mousedown', function(ev){   
          ev.preventDefault();       
          // track start position and size
          scope.start_position = {xpos: ev.pageX, ypos:ev.pageY};
          scope.start_size = {width: elm.width(), height: elm.height()};
          // tell the directive that we are actively resizing
          scope.resizing = true;
          console.log('scope', scope);
        });
        console.log('binding');
        $(document).bind('mousemove', function(ev){

          // if(scope.resizing){
          //   console.log('moving', ev);
          //   console.log(ev.pageX, ev.pageY);
           
          // }
          if(scope.resizing && ev.which==1){
             resize(scope, elm, ev);
          }
        });
        bottom_edge.bind('mouseup', function(ev){
          // tell the directive that we are no longer actively resizing
          scope.resizing = false;
          console.log('resizing should be false');
        });
        scope.$watch('resizing', function(newValue, oldValue){
          console.log(newValue, oldValue);
        });
        var resize = function (scope, elm, ev){
          elm.height(ev.pageY-scope.start_position.ypos + scope.start_size.height);
        }        
      }

    }
  })
