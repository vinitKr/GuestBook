(function (angular) {
  'use strict';
  function AddGuestController($http) {
    const ctrl = this;
    const baseUrl = 'http://localhost:8080';
    ctrl.guest = {}

    ctrl.add = function () {
      if (ctrl.guest.name && ctrl.guest.email) {
        $http.post(baseUrl + '/api/guest', ctrl.guest).then(function (res) {
          let resp = res.data;
          if (resp.code == 200) {
            ctrl.onAdd({ guest: ctrl.guest });
          }
        }, function (err) {
          console.error('Error - Something went wrong while deleting record!');
        })
      }
      else {
        alert('Please Enter the mandatory fields.')
      }
    };

    ctrl.cancel = function(){
      console.log('dddddddd')
      ctrl.onCancel({show:false});
    }

    ctrl.check= function(e){
      if (e.target.value.length == 256) e.preventDefault();
      // e.preventDefault();
    }

  }

  angular.module('guestBook').component('addGuest', {
    templateUrl: 'component/add-guest.html',
    controller: AddGuestController,
    bindings: {
      onAdd: '&',
      onCancel: '&'
    }
  });
})(window.angular);