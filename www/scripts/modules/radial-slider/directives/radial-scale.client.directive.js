(function() {
    'use strict';

    angular.module('SteroidsApplication').directive('radialScale', radialScale);

    radialScale.$inject = ['d3Utils'];

    function radialScale (d3Utils) {

        var directive = {
            scope: {
                scaleData: "=hsData"
            },
            controller: 'RadialScaleController',
            controllerAs: 'hs',
            restrict: 'EA',
            link: link
        };

        return directive;

        ///////////////

        function link (scope, element, attrs) {

            var width = 700,
                height = 700,
                offset = 60,
                radius = Math.min(width, height) / 2 - offset, // => 690
                maxDays = 72,
                coreRadius = 106.5,
                marginCoreRadius = 35,
                marginSliders = 19,
                sliderThickness = 30,
                totalValue = scope.hs.totalValue,
                sliderJSON,
                toDays = d3Utils.toDays(maxDays),
                toDegrees = d3Utils.toDegrees(maxDays),
                toRadian = d3Utils.toRadian(maxDays),
                radian = Math.PI / 180;

            var svg,
                arc,
                core,
                slider,
                sliderPath,
                drag;

            activate();

            ////////////////

            function activate () {
                sliderJSON = scope.hs.scaleConfig;
                svg = d3Utils.createSVG(element[0], width, height);
                svg.attr('class', 'hs-base');
                createBackground(svg);
                createCore(svg);
                createSliders(svg);
            }

            function createBackground(svg) {
                var data = d3.range(0, 360, toDegrees(1));
                var axis = d3Utils.createAxis(svg, data);
                axis.attr('class', 'hs-axis');
                d3Utils.createDashedLines(axis, radius);
                d3Utils.createDigits(axis, radius, maxDays);
            }

            function createCore(svg) {
                core = svg.append('g');
                core.attr('class', 'hs-core');
                d3Utils.createCircle(core, coreRadius);

                var title = d3Utils.createText(core, 'Total');
                title.attr('class', 'hs-core-title');
                title.attr('y', '-15');

                var value = d3Utils.createText(core, totalValue);
                value.attr('class', 'hs-core-value');
                value.attr('y', '20');
            }

            function createSliders(svg) {
                var nestedData;
                var offsetFromCentre = coreRadius + marginCoreRadius;
                var startAngle = 0;

                // Create dynamic inner and outer radii independent of scale data json
                // So it works with 1 as well as n
                function innerRadius (d,i,j) {
                    // This refers to the sliderPath
                    var innerRadius = offsetFromCentre + (j*sliderThickness) + (j*marginSliders);
                    this.innerRadius = innerRadius;
                    return innerRadius;
                }

                function outerRadius(d,i,j){
                    // This refers to the sliderPath
                    var outerRadius = offsetFromCentre + (j+1) * sliderThickness + (j*marginSliders);
                    this.outerRadius = outerRadius;
                    return outerRadius;
                }

                function endAngle (d) {
                    return toRadian(d.startDay);
                }

                arc = d3Utils.createArc(innerRadius, outerRadius, startAngle, endAngle);

                slider = d3Utils.createMultipleRings(svg, sliderJSON);

                nestedData = function(d) {
                    // Because d3 needs an array, and d is an object
                    // We simply wrap it in an array and send it to create a path
                    return [d];
                };

                // Draws the arc path
                sliderPath = d3Utils.drawPath(slider, arc, nestedData);

                sliderPath
                    .attr('fill', function(d) {
                        return d.colour;
                    })
                    .each(function(d) {
                        // 'this' refers to sliderPath
                        // Set initial data
                        d.day = d.startDay;
                        d.value = d.day * d.multiplier;
                        d.currentRadian = toRadian(d.startDay);
                    });

                drag = d3.behavior.drag()
                    .on('drag', setAngle);

                sliderPath.call(drag);
            }

            function setAngle(d) {
                var angle = findAngle(d3.event.x, d3.event.y);
                // Create a new arc with the angle converted to a radian
                var newArc = d3Utils.createArc(this.innerRadius, this.outerRadius, 0, angle*radian);
                d3.select(this).attr('d', newArc);
                updateValues(angle, d);
            }

            function updateValues(newAngle, d) {
                d.day = parseInt(toDays(newAngle));
                d.value = d.day * d.multiplier;
                d.deltaValue = d.value - d.startValue;
                d.deltaDay = d.day - d.startDay;
                d.currentRadian = newAngle*radian;
                scope.$apply();
            }

            function findAngle(x, y) {
                var addAngle = x < 0 ? 270 : 90;
                return (Math.atan(y/x) * 180 / Math.PI) + addAngle;
            }
        }
    }
})();