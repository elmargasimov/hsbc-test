(function() {
    'use strict';

    // Index Controller
    angular
        .module('SteroidsApplication')
        .controller('RadialScaleController', RadialScaleController);

    RadialScaleController.$inject = ['scaleConfig'];

    function RadialScaleController(scaleConfig) {
        var hs = this;
        hs.scaleConfig = null;

        initialise();

        ////////////////

        function initialise() {
            hs.scaleConfig = scaleConfig;
        }
    }

})();