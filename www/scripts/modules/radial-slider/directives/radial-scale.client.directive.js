(function() {
    'use strict';

    angular.module('SteroidsApplication').directive('radialScale', radialScale);

    radialScale.$inject = ['scaleUtils'];

    function radialScale (scaleUtils) {

        var directive = {
            scope: {
                scaleData: "=hsData"
            },
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
                totalValue = 0,
                sliderJSON,
                toDays = scaleUtils.toDays(maxDays),
                toDegrees = scaleUtils.toDegrees(maxDays),
                toRadian = scaleUtils.toRadian(maxDays);

            var svg,
                arc,
                slider,
                sliderPath,
                drag;

            var tau = Math.PI * 2,
                handleRadius = 16.5,
                radiansPerStep = tau/maxDays,
                animateDuration = 100;


            activate();

            ////////////////

            function activate () {
                sliderJSON = scope.scaleData;
                svg = scaleUtils.createSVG(element[0], width, height);
                createBackground(svg);
                createCore(svg);
                createSliders(svg);
            }

            function createBackground(svg) {
                var data = d3.range(0, 360, toDegrees(1));
                var axis = scaleUtils.createAxis(svg, data);
                scaleUtils.createDashedLines(axis, radius);
                scaleUtils.createDigits(axis, radius, maxDays);
            }

            function createCore(svg) {
                var core = svg.append('g');
                core.attr('class', 'hs-core');
                scaleUtils.createCircle(core, coreRadius);
                var text = scaleUtils.createText(core, totalValue);
                text.attr('text-anchor', 'middle');
            }

            function createSliders(svg) {
                var nestedData;
                var offsetFromCentre = coreRadius + marginCoreRadius;

                // This abstract the inner and outer radius away from the scale data
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
                    return toRadian(d.initialValue);
                }

                arc = scaleUtils.createArc(innerRadius, outerRadius, 0, endAngle);

                slider = scaleUtils.createMultipleRings(svg, sliderJSON);

                nestedData = function(d) {
                    // Because d3 needs an array, and d is an object
                    // We simply wrap it in an array and send it to create a path
                    return [d];
                };

                sliderPath = scaleUtils.drawPath(slider, arc, nestedData);

                sliderPath.attr('fill', function(d) {
                    return d.colour;
                });

                // Set slider data
                sliderPath.each(function(d) {
                    this.currentValue = d.initialValue;
                    this.currentRadian = toRadian(d.initialValue);
                });

                drag = d3.behavior.drag()
                    .on('drag', setAngleStep);

                sliderPath.call(drag);
            }

            function setAngleStep(d) {
                var angle = findAngle(d3.event.x, d3.event.y);
                var radian = angle * Math.PI / 180;
                //this.currentValue = parseInt(toDays(angle));

                var newArc = scaleUtils.createArc(this.innerRadius, this.outerRadius, 0, radian);
                d3.select(this).attr('d', newArc);

                g.datum(data).selectAll("path")
                    .data(pie).exit().remove();

            }

            function findAngle(x, y) {
                var addAngle = x < 0 ? 270 : 90;
                return (Math.atan(y/x) * 180 / Math.PI) + addAngle;
            }
        }
    }
})();