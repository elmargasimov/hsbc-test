(function() {
    'use strict';

    angular.module('SteroidsApplication').directive('radialScale', radialScale);

    radialScale.$inject = ['scaleUtils'];

    function radialScale (scaleUtils) {

        var directive = {
            scope: {
                twoWayBind: "=hsData"
            },
            restrict: 'EA',
            link: link
        };

        return directive;

        ///////////////

        function link (scope, element, attrs) {

            var svg,
                width = 700,
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
                toDegrees = scaleUtils.toDegrees(maxDays);

            var tau = Math.PI * 2,
                handleRadius = 16.5,
                currentStep,
                radianValuePerStep = tau/maxDays,
                animateDuration = 100;

            activate();

            ////////////////

            function activate () {
                sliderJSON = scope.twoWayBind
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
                var circle = scaleUtils.createCircle(core, coreRadius);
                circle.attr('class', 'hs-core');
                var text = scaleUtils.createText(core, totalValue);
                text.attr('text-anchor', 'middle');
            }

            function createSliders(svg) {
                var offsetFromCentre = coreRadius + marginCoreRadius;
                var arc = scaleUtils.createArc(offsetFromCentre, sliderThickness, marginSliders, maxDays);
                var slider = scaleUtils.createMultipleRings(svg, arc, sliderJSON);
                slider.attr('fill', function(d) {
                    return d.colour;
                });
            }

            //var handle = slider.selectAll('circle')
            //    .data(sliderJSON, function(d,i,j){
            //        return d[j];
            //    })
            //    .enter()
            //    .append("circle")
            //    .attr("r", handleRadius)
            //    .attr("fill", "#515151")
            //    .call(drag);
            //
            //function dragCircle () {
            //    var a = findAngle(d3.event.x, d3.event.y);
            //    moveCircle(a);
            //}
            //
            //currentStep = 2 * radianValuePerStep;
            //
            //setAngleStep(currentStep);
            //
            //function setAngleStep(step) {
            //    if (step > maxDays || step < 0) {
            //        return;
            //    }
            //
            //    //slider.transition()
            //    //    .duration(animateDuration)
            //    //    .ease("linear")
            //    //    .call(arcTween, anglePerStep * step, arc);
            //}
            //
            //function findAngle(x, y) {
            //    var addAngle = x < 0 ? 270 : 90;
            //    return (Math.atan(y/x) * 180 / Math.PI) + addAngle;
            //}
            //
            //function moveCircle(angle) {
            //    var r = (coreRadius + marginCoreRadius);
            //    var x = r * Math.sin(angle * Math.PI / 180);
            //    var y = -r * Math.cos(angle * Math.PI / 180);
            //    handle.attr("cx", x).attr("cy", y);
            //}

        }
    }
})();