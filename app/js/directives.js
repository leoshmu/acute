'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

angular.module('myApp.directives', []).
  directive('resizeable', function($compile){
    var resize = function (scope, elm, ev){
          if(scope.y_resizing){
            var min_height = 0;
            var delta_height = (scope.resize_top ? -1 : 1) * (ev.pageY-scope.start_position.ypos);
            var new_height = scope.start_size.height + delta_height;
            var constraints_met = false;
            if(new_height > min_height){
              constraints_met =  true
            }
            if (constraints_met){
              if(scope.resize_top){
                var new_top = ev.pageY-scope.parent_start_position.top
                elm.css('top', new_top +'px')
              }
              elm.height(new_height);
            }
          }


          if(scope.x_resizing){
            var min_width = 0;
            var delta_width = (scope.resize_left ? -1 : 1) * (ev.pageX-scope.start_position.xpos)
            var new_width = scope.start_size.width + delta_width;
            // left edge
            var constraints_met = false;
            if(new_width>min_width){
              constraints_met = true
            }
            if (constraints_met){
              if(scope.resize_left){
                var new_left = ev.pageX-scope.parent_start_position.left;
                elm.css('left', new_left +'px');
              }
              elm.width(new_width);
            }



          }
        }
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'partials/resize-template.html',
      replace: true,
      transclude: true,
      link: function(scope, elm, attrs){
        var handles = (attrs.handles.match(/[^ |,]+/g)) || ['s', 'sw', 'w'];

        _(handles).each( function( value, key, handles ) {
          var active_handle = elm.find('.hndl-'+value);
          active_handle.show();
          active_handle.bind('mousedown', function(ev){
            ev.preventDefault();
            scope.handle = value;

            // track start position and size
            console.log(elm);

            scope.parent_start_position = elm.position();
            scope.start_position = {xpos: ev.pageX, ypos:ev.pageY};
            scope.start_size = {width: elm.width(), height: elm.height()};

            // tell the directive that we are actively resizing


            scope.y_resizing = (value.indexOf("n") > -1 || value.indexOf("s") > -1) ? true : false;
            scope.x_resizing = (value.indexOf("e") > -1 || value.indexOf("w") > -1) ? true : false;

            // special considerations exist if we're moving top or left edges
            scope.resize_left = (value.indexOf("w")>-1) ? true : false;
            scope.resize_top = (value.indexOf("n")>-1) ? true : false;


          }).bind('mouseup', function(ev){
            // tell the directive that we are no longer actively resizing
            // scope.start_position = {xpos: ev.pageX, ypos:ev.pageY};
            console.log('new_start', scope.start_position);
            scope.start_size = {width: elm.width(), height: elm.height()};
            scope.x_resizing = false;
            scope.y_resizing = false;
          });
        scope.$watch('handle', function(){
          console.log('changed!');
        })

        })
        scope.handles = handles
        scope.resize_contents = elm.width();

        $(document).bind('mousemove', function(ev){
          // if we are in resize mode and the mouse is clicked, then resize
          if((scope.x_resizing || scope.y_resizing) && ev.which==1){
             resize(scope, elm, ev);
          }
        });


      }

    }
  })
