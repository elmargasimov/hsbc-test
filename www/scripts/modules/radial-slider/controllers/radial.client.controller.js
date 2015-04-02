(function() {
    'use strict';

    // Index Controller
    angular.module('SteroidsApplication').controller('RadialController', RadialController);

    //RadialController.$inject = ['$scope'];

    function RadialController() {
        var vm = this;
        vm.navbarTitle = "Welcome to Supersonic!";
    }

})();