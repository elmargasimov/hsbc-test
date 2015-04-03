(function () {
    'use strict';

    angular
        .module('SteroidsApplication')
        .factory('SliderConfig', SliderConfig);

    function SliderConfig() {
        return [
            {
                multiplier: 3,
                day: 31,
                value: 93,
                type: 'large',
                options: {
                    lineCap: 'round',
                    max: 71,
                    displayInput: false,
                    width: 540,
                    height: 540,
                    thickness: ".055",
                    bgColor: "#fff",
                    fgColor: "#3e505a"
                }
            },
            {
                multiplier: 4,
                day: 50,
                value: 200,
                type: 'medium',
                options: {
                    lineCap: 'round',
                    max: 71,
                    displayInput: false,
                    width: 440,
                    height: 440,
                    thickness: ".068",
                    bgColor: "#fff",
                    fgColor: "#2f7490"
                }
            },
            {
                multiplier: 5,
                day: 36,
                value: 180,
                type: 'small',
                options: {
                    lineCap: 'round',
                    max: 71,
                    displayInput: false,
                    width: 340,
                    height: 340,
                    thickness: ".088",
                    bgColor: "#fff",
                    fgColor: "#820008"
                }
            }
        ];
    }

})();
