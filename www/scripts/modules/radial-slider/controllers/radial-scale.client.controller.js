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
        hs.totalValue = 0;
        hs.calculateTotal = calculateTotal;

        initialise();

        ////////////////

        function initialise() {
            hs.scaleConfig = scaleConfig;
            calculateTotal();
        }

        function calculateTotal(one, two, three) {
            hs.totalValue = two + three - one;
        }
    }
})();