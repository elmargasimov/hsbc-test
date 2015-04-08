'use strict';

(function () {

    angular
        .module('SteroidsApplication')
        .factory('scaleUtils', scaleUtils);

    function scaleUtils() {
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
            createMultipleRings: createMultipleRings
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
                .attr('class', 'hs-base')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
            return svg;
        }

        function createAxis (el,data) {
            var axis = el.append('g')
                .attr('class', 'hs-axis')
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

        function createArc(offset, sliderThickness, marginSliders, maxValue) {
            var arc = d3.svg.arc()
                .innerRadius(function(d,i,j) {
                    return offset + (j*sliderThickness) + (j*marginSliders);
                })
                .outerRadius(function(d,i,j){
                    return offset + (j+1) * sliderThickness + (j*marginSliders);
                })
                .startAngle(0)
                .endAngle(function(d,i,j) {
                    var toRadian = service.toRadian(maxValue);
                    return toRadian(d[j].initialValue);
                });
            return arc;
        }

        function createMultipleRings (el, arc, data) {
            var slider = el.selectAll('.hs-base')
                .data(data)
                .enter()
                .append('g')
                .attr('class', 'hs-slider');

            slider.selectAll('path')
                .data([data])
                .enter()
                .append('path')
                .attr('d', arc);

            return slider;
        }
    }

})();
