(function() {
    'use strict';

    // Index Controller
    angular
        .module('SteroidsApplication')
        .controller('RadialScaleController', RadialScaleController);

    RadialScaleController.$inject = ['scaleConfig', '$q'];

    function RadialScaleController(scaleConfig, $q) {
        var hs = this;
        hs.scaleConfig = null;

        initialise();

        ////////////////

        function initialise() {
            hs.scaleConfig = scaleConfig;
        }
    }
})();