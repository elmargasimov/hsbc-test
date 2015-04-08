'use strict';

(function () {

    angular
        .module('SteroidsApplication')
        .factory('scaleConfig', scaleConfig);

    function scaleConfig() {
        var JSON = [
            {
                "initialValue": 36,
                "colour": "#820008",
                "multiplier": 3
            },
            {
                "initialValue": 50,
                "colour": "#2f7490",
                "multiplier": 4
            },
            {
                "initialValue": 31,
                "colour": "#3e505a",
                "multiplier": 5
            }
        ];
        return JSON;
    }

})();
