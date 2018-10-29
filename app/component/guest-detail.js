(function(angular) {
    'use strict';
  function GuestDetailController() {
    var ctrl = this;
  
    ctrl.delete = function() {
      ctrl.onDelete({guest: ctrl.guest});
    };
  
  }
  
  angular.module('guestBook').component('guestDetail', {
    templateUrl: 'component/guest-detail.html',
    controller: GuestDetailController,
    bindings: {
      guest: '<',
      onDelete: '&',
    }
  });
  })(window.angular);