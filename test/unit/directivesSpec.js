'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  var elm, scope;
  beforeEach(module('myApp.directives'));

  beforeEach(module('partials/resize-template.html'));

  describe('resizeable south handle', function() {
    // before each test, create a resizable handle with s handle
    beforeEach(inject(function($compile, $rootScope) {
        elm = angular.element('<div resizeable handles="s"><p>Resize Me</p></div>');
        $compile(elm)($rootScope);
        $rootScope.$digest();
      })
    );

    // confirm that south handle is the only visible one
    it('should show south handle', function() {
      expect(elm.find('.hndl-s').css('display')).toEqual('block');
    });
    it('should not show north handle', function() {
      expect(elm.find('.hndl-n').css('display')).toEqual('none');
    });
    it('should not show west handle', function() {
      expect(elm.find('.hndl-w').css('display')).toEqual('none');
    });
    it('should not show east handle', function() {
      expect(elm.find('.hndl-e').css('display')).toEqual('none');
    });
    it('should not show southeast handle', function() {
      expect(elm.find('.hndl-se').css('display')).toEqual('none');
    });
    it('should not show northeast handle', function() {
      expect(elm.find('.hndl-ne').css('display')).toEqual('none');
    });
    it('should not show southwest handle', function() {
      expect(elm.find('.hndl-sw').css('display')).toEqual('none');
    });
    it('should not show northwest handle', function() {
      expect(elm.find('.hndl-nw').css('display')).toEqual('none');
    });


    it('should get taller by 100px when south handle is moved down 100px', function(){
      var initial_height = elm.height();
      var delta_height = 100;

      var handle = elm.find('.hndl-s');
      var handle_position = handle.offset();
      var handle_center = {pageX: handle_position.left + handle.width()/2, pageY:  handle_position.top + handle.height()/2}
      // click on south handle
      handle.trigger($.Event('mousedown', handle_center))
      // set a mouse move event with mouse held down (which = 1)
      var mouse_move_object = {pageX: handle_center.pageX, pageY: handle_center.pageY+delta_height, which: 1}
      // move mouse to new position
      $(document).trigger($.Event('mousemove', mouse_move_object))
      // release mouse button
      handle.trigger($.Event('mouseup', handle_center))
      // check new height against expected height
      expect(elm.height()).toEqual(initial_height+delta_height);
    })
  });


});
