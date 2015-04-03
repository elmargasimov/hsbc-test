(function() {
    'use strict';

    angular.module('SteroidsApplication').directive('knob', knob);

    knob.$inject = ['supersonic', '$timeout'];

    function knob (supersonic, $timeout) {
        return {
            restrict: 'EA',
            replace: true,
            template: '<input value="{{knobData}}"/>',
            scope: {
                knobData: '=',
                knobOptions: '&',
                knobChange: '&',
                knobRelease: '&',
                knobDraw: '&'
            },
            link: function(scope, element) {
                var knobInit = scope.knobOptions() || {};

                knobInit.release = function(newValue) {
                    $timeout(function() {
                        scope.knobData = newValue;
                        scope.$apply();
                        scope.knobRelease();
                    });
                };

                knobInit.draw = function() {
                    $timeout(function() {
                        scope.knobDraw();
                    });
                };

                knobInit.change = function() {
                    $timeout(function() {
                        scope.knobChange();
                    });
                };

                scope.$watch('knobData', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $(element).val(newValue).change();
                    }
                });

                $(element).val(scope.knobData).knob(knobInit);
            }
        };
    }

})();