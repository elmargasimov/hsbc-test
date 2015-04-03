(function() {
    'use strict';

    // Index Controller
    angular
        .module('SteroidsApplication')
        .controller('SlidersController', SlidersController);

    SlidersController.$inject = ['SliderConfig'];

    function SlidersController(SliderConfig) {
        var vm = this;
        vm.sliders = null;
        vm.large = null;
        vm.medium = null;
        vm.small = null;
        vm.total = null;
        vm.calculateSliderValue = calculateSliderValue;
        vm.calculateTotal = calculateTotal;
        vm.incrementTotal = incrementTotal;

        initialise();

        ////////////////

        function initialise() {
            vm.sliders = SliderConfig;
            vm.sliders.forEach(function(index) {
                calculateSliderValue(index)
            });
            calculateTotal();
        }

        function incrementTotal(slider) {
            calculateSliderValue(slider);
            calculateTotal();
        }

        function calculateSliderValue(slider) {
            vm[slider.type] = {
                value: slider.day * slider.multiplier
            };
        }

        function calculateTotal() {
            vm.total = vm.small.value + vm.medium.value - vm.large.value;
        }
    }

})();