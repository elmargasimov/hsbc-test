(function() {
    'use strict';

    // Index Controller
    angular
        .module('SteroidsApplication')
        .controller('StatusBoxController', StatusBoxController);

    StatusBoxController.$inject = ['scaleConfig'];

    function StatusBoxController(scaleConfig) {
        var hs = this;
        hs.statusBoxes = null;

        initialise();

        ////////////////

        function initialise() {
            hs.statusBoxes = scaleConfig;
        }
    }
})();