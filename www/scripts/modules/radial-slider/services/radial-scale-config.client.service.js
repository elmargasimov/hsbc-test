(function () {
    'use strict';

    angular
        .module('SteroidsApplication')
        .factory('scaleConfig', scaleConfig);

    function scaleConfig() {
        var JSON = [
            {
                "id": "three",
                "name": "Calc 3",
                "topTenPercent": 11,
                "startDay": 36,
                "startValue": 180,
                "deltaValue": 0,
                "deltaDay": 0,
                "colour": "#830008",
                "multiplier": 5,
                "class": "hs-calc-3"
            },
            {
                "id": "two",
                "name": "Calc 2",
                "topTenPercent": 16,
                "startDay": 50,
                "startValue": 200,
                "deltaValue": 0,
                "deltaDay": 0,
                "colour": "#2f7490",
                "multiplier": 4,
                "class": "hs-calc-2"
            },
            {
                "id": "one",
                "name": "Calc 1",
                "topTenPercent": 27,
                "startDay": 31,
                "startValue": 93,
                "deltaValue": 0,
                "deltaDay": 0,
                "colour": "#3f505b",
                "multiplier": 3,
                "class": "hs-calc-1"
            }
        ];
        return JSON;
    }
})();
