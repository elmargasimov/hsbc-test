(function () {
    'use strict';

    angular
        .module('SteroidsApplication')
        .factory('d3Utils', d3Utils);

    function d3Utils() {
        var tau = Math.PI * 2;

        var service = {
            toRadian: toRadian,
            toDegrees: toDegrees,
            toDays: toDays,
            createSVG: createSVG,
            createAxis: createAxis,
            createDashedLines: createDashedLines,
            createDigits: createDigits,
            createCircle: createCircle,
            createText: createText,
            createArc: createArc,
            createMultipleRings: createMultipleRings,
            drawPath: drawPath
        };

        return service;

        ////////////

        function toDegrees (value) {
            return d3.scale.linear()
                .domain([0, value])
                .range([0, 360]);
        }

        function toDays (value) {
            return d3.scale.linear()
                .domain([0, 360])
                .range([0, value]);
        }

        function toRadian(value) {
            return d3.scale.linear()
                .domain([0, value])
                .range([0,tau]);
        }

        function createSVG(el, width, height) {
            var svg = d3.select(el).append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
            return svg;
        }

        function createAxis (el,data) {
            var axis = el.append('g')
                .attr('transform', function() {
                    return 'rotate(-90)';
                })
                .selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('transform', function(d) {
                    return 'rotate(' + d + ')';
                });
            return axis;
        }

        function createDashedLines (el, radius) {
            return el.append('line')
                .attr('x2', radius);
        }

        function createDigits (el, radius, maxValue) {
            return el.append('text')
                .attr('x', radius)
                .text(function(d) {
                    var toDays = service.toDays(maxValue);
                    var tick = toDays(d);
                    return parseInt(tick);
                });
        }

        function createCircle (el, radius) {
           return el.append('circle')
                .attr('r', radius);
        }

        function createText(el, value) {
            return el.append('text')
                .text(function(){
                    return value;
                });
        }

        function createArc(innerRadius, outerRadius, startAngle, endAngle) {
            return d3.svg.arc()
                .innerRadius(innerRadius || 0)
                .outerRadius(outerRadius)
                .startAngle(startAngle || 0)
                .endAngle(endAngle);
        }

        function createMultipleRings (el, data) {
            return el.selectAll('.hs-base')
                .data(data)
                .enter()
                .append('g')
                .attr('class', 'hs-slider');
        }

        function drawPath (el, d, data) {
            return el.selectAll('path')
                .data(data)
                .enter()
                .append('path')
                .attr('d', d);
        }
    }
})();
