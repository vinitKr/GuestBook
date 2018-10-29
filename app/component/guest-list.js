
(function (angular) {
  'use strict';
  function GuestListController($scope, $element, $attrs, $http) {
    const ctrl = this;
    const baseUrl = 'http://localhost:8080';

    // This would be loaded by $http etc.
    ctrl.guestList = [];
    ctrl.pageNumber = 1;
    ctrl.showAdd = false;
    ctrl.showPagination = false;
    ctrl.numberOfPages = 0;

    ctrl.getGuests = function () {
      ctrl.showAdd = false;
      $http.get(baseUrl + '/api/guest/' + ctrl.pageNumber).then(function (res) {
        let guests = res.data;
        if (guests.code == 200) {
          ctrl.guestList = guests.data;
          ctrl.numberOfPages = guests.numberOfPages;
          ctrl.showPagination = (guests.total > guests.data.length);
        }
      }, function (err) {
        console.error('Error - Something went wrong while getting record!');
      })
    }
    ctrl.getGuests();

    ctrl.onPrev = function () {
      ctrl.pageNumber--;
      ctrl.getGuests();
    }
    ctrl.onNext = function () {
      ctrl.pageNumber++;
      ctrl.getGuests();
    }

    ctrl.addGuest = function (guest) {
      ctrl.pageNumber = 1;
      ctrl.getGuests();
    }

    ctrl.deleteGuest = function (guest) {
      var idx = ctrl.guestList.indexOf(guest);
      if (idx >= 0) {
        $http.delete(baseUrl + '/api/guest/' + ctrl.guestList[idx].id).then(function (res) {
          let resp = res.data;
          if (resp.code == 200) {
            ctrl.pageNumber = 1;
            ctrl.getGuests();
          }
        }, function (err) {
          console.error('Error - Something went wrong while deleting record!');
        })
      }
    };
  }

  angular.module('guestBook').component('guestList', {
    templateUrl: 'component/guest-list.html',
    controller: GuestListController
  });
})(window.angular);