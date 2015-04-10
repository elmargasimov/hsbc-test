(function() {
    'use strict';

    angular.module('SteroidsApplication').directive('radialScale', radialScale);

    radialScale.$inject = ['d3Utils'];

    function radialScale (d3Utils) {

        var directive = {
            scope: {},
            controller: 'RadialScaleController',
            controllerAs: 'hs',
            restrict: 'EA',
            link: link
        };

        return directive;

        ///////////////

        function link (scope, element, attrs) {

            var width = 700, height = 700,
                offset = 60,
                radius = Math.min(width, height) / 2 - offset, // => 690
                coreRadius = 106.5,
                handleRadius = 16.5,
                marginCore = 35,
                marginSliders = 19,
                sliderThickness = 30,

                maxDays = 72,
                sliderJSON,
                toDays = d3Utils.toDays(maxDays),
                toDegrees = d3Utils.toDegrees(maxDays),
                toRadian = d3Utils.toRadian(maxDays),
                radian = Math.PI / 180,

                svg, arc, core, coreValue, deltaValue, slider, sliderPath, dragHandle;

            activate();

            ////////////////

            function activate () {
                sliderJSON = scope.hs.scaleConfig;
                scope.totalStartValue = 287;
                svg = d3Utils.createSVG(element[0], width, height);
                svg.attr('class', 'hs-base');
                createBackground(svg);
                createCore(svg);
                createSliders(svg);
                createHandles();
            }

            function createBackground(svg) {
                var data = d3.range(0, 360, toDegrees(1));
                var axis = d3Utils.createAxis(svg, data);
                axis.attr('class', 'hs-axis');
                d3Utils.createDashedLines(axis, radius);
                d3Utils.createDigits(axis, radius, maxDays);
            }

            function createCore(svg) {
                var totalValue = scope.totalStartValue;
                core = svg.append('g');
                core.attr('class', 'hs-core');
                d3Utils.createCircle(core, coreRadius);

                var title = d3Utils.createText(core, 'Total');
                title.attr('class', 'hs-core-title');
                title.attr('y', '-15');

                coreValue = d3Utils.createText(core, totalValue);
                coreValue.attr('class', 'hs-core-value');
                coreValue.attr('y', '20');

                deltaValue = d3Utils.createText(core, 0);
                deltaValue.attr('class', 'hs-total-delta-value');
                deltaValue.attr('y', '45');
            }

            function createSliders(svg) {
                var nestedData;
                var offsetFromCentre = coreRadius + marginCore;
                var startAngle = 0;

                function innerRadius (d,i,j) {
                    var innerRadius = offsetFromCentre + (j*sliderThickness) + (j*marginSliders);
                    d.innerRadius = innerRadius;
                    return innerRadius;
                }

                function outerRadius(d,i,j){
                    var outerRadius = offsetFromCentre + (j+1) * sliderThickness + (j*marginSliders);
                    d.outerRadius = outerRadius;
                    return outerRadius;
                }

                function endAngle (d) {
                    return toRadian(d.startDay);
                }

                arc = d3Utils.createArc(innerRadius, outerRadius, startAngle, endAngle);

                slider = d3Utils.createMultipleRings(svg, sliderJSON);

                nestedData = function(d) {
                    // Because d3 needs an array, and d is an object
                    // We wrap it in an array and send it to create a path
                    return [d];
                };

                sliderPath = d3Utils.drawPath(slider, arc, nestedData);

                sliderPath.attr('fill', function(d) {
                    return d.colour;
                });

                setInitialValues();
                calculateTotal();
            }

            function setInitialValues() {
                sliderPath.each(function(d) {
                    d.day = d.startDay;
                    d.value = d.day * d.multiplier;
                    d.currentRadian = toRadian(d.startDay);
                    d.currentAngle = toDegrees(d.startDay);
                    scope.hs[d.id] = {
                        value: d.value
                    }
                });
            }

            function createHandles() {
                dragHandle = d3.behavior.drag()
                    .on('drag', slideArc);

                var handle = d3Utils.createCircle(slider, handleRadius);

                handle.attr("fill", "#515151")
                    .each(function(d){
                        moveHandle(d.currentAngle, d, this)
                    })
                    .call(dragHandle);
            }

            function slideArc (data) {
                var sliderPath = d3.select(this.parentNode).select('path');
                var angle = findAngle(d3.event.x, d3.event.y);
                moveHandle(angle, data, this);
                setAngle(data, angle, sliderPath);
            }

            function findAngle(x, y) {
                var addAngle = x < 0 ? 270 : 90;
                return (Math.atan(y/x) * 180 / Math.PI) + addAngle;
            }

            function moveHandle(angle, data, el) {
                var radius = data.innerRadius + sliderThickness/2;
                var x = radius * Math.sin(angle * Math.PI / 180);
                var y = -radius * Math.cos(angle * Math.PI / 180);
                d3.select(el).attr('cx', x).attr('cy', y);
            }

            function setAngle(data, angle, el) {
                var newArc = d3Utils.createArc(data.innerRadius, data.outerRadius, 0, angle*radian);
                el.attr('d', newArc);
                updateValues(angle, data);
            }

            function updateValues(newAngle, d) {
                d.day = parseInt(toDays(newAngle));
                d.value = d.day * d.multiplier;
                d.deltaValue = d.value - d.startValue;
                d.deltaDay = d.day - d.startDay;
                d.currentRadian = newAngle*radian;
                scope.hs[d.id] = {
                    value: d.value
                };
                calculateTotal();
                scope.$apply();
            }

            function calculateTotal() {
                scope.totalValue = scope.hs.two.value + scope.hs.three.value - scope.hs.one.value;
                coreValue.text(function(){
                    return scope.totalValue;
                });
                calculateDelta();
            }

            function calculateDelta() {
                scope.deltaTotalValue = scope.totalValue - scope.totalStartValue;
                deltaValue.text(function(){
                    return scope.deltaTotalValue;
                });
            }
        }
    }
})();