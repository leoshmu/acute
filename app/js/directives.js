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
                var delta_top = ev.pageY-scope.start_position.ypos;
                var new_top = delta_top + parseInt(scope.start_top.split('px')[0]);
                elm.css('top', new_top);
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
                // left is defined relative to parent left
                var delta_left = ev.pageX-scope.start_position.xpos;
                var new_left = delta_left + parseInt(scope.start_left.split('px')[0]);
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

            scope.parent_start_position = elm.position();
            scope.start_position = {xpos: ev.pageX, ypos:ev.pageY};
            scope.start_size = {width: elm.width(), height: elm.height()};
            scope.start_left = (elm.css('left') == "auto") ? '0px' : elm.css('left')
            scope.start_top = (elm.css('top') == "auto") ? '0px' : elm.css('top')
            // tell the directive that we are actively resizing


            scope.y_resizing = (value.indexOf("n") > -1 || value.indexOf("s") > -1) ? true : false;
            scope.x_resizing = (value.indexOf("e") > -1 || value.indexOf("w") > -1) ? true : false;

            // special considerations exist if we're moving top or left edges
            scope.resize_left = (value.indexOf("w")>-1) ? true : false;
            scope.resize_top = (value.indexOf("n")>-1) ? true : false;


          }).bind('mouseup', function(ev){
            // tell the directive that we are no longer actively resizing
            // scope.start_position = {xpos: ev.pageX, ypos:ev.pageY};
            // console.log('new_start', scope.start_position);
            scope.start_size = {width: elm.width(), height: elm.height()};
            scope.start_left = (elm.css('left') == "auto") ? '0px' : elm.css('left')
            scope.start_top = (elm.css('top') == "auto") ? '0px' : elm.css('top')
            scope.x_resizing = false;
            scope.y_resizing = false;
          });
        scope.$watch('handle', function(){
          // console.log('changed!');
        })

        })
        scope.handles = handles
        scope.resize_contents = elm.width();

        $(document).bind('mousemove', function(ev){
          // if we are in resize mode and the mouse is clicked, then resize
          // console.log('move')
          if((scope.x_resizing || scope.y_resizing) && ev.which==1){
             resize(scope, elm, ev);
          }
        });


      }

    }
  })
