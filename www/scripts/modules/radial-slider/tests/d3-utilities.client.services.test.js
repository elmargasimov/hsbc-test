describe("Service: d3Utils", function() {

    var d3Utils;

    function _inject() {
        inject(function (_d3Utils_) {
            d3Utils = _d3Utils_;
        });
    }

    beforeEach(module('SteroidsApplication', 'supersonic'));

    describe("the service api", function(){

        beforeEach(function () {
            _inject();
        });

        it('should contain an d3Utils service', function(){
            expect(d3Utils).toBeDefined();
        });

        it('should have a working api', function(){
            expect(d3Utils.toRadian).toBeDefined();
            expect(d3Utils.toDegrees).toBeDefined();
            expect(d3Utils.toDays).toBeDefined();
            expect(d3Utils.createSVG).toBeDefined();
            expect(d3Utils.createAxis).toBeDefined();
            expect(d3Utils.createDashedLines).toBeDefined();
            expect(d3Utils.createDigits).toBeDefined();
            expect(d3Utils.createCircle).toBeDefined();
            expect(d3Utils.createText).toBeDefined();
            expect(d3Utils.createArc).toBeDefined();
            expect(d3Utils.createMultipleRings).toBeDefined();
            expect(d3Utils.drawPath).toBeDefined();
        });

        it('should create an SVG', function() {
            var width = 800;
            var height = 800;
            var result = '<g transform="translate(400,400)"></g>';
            var svg = d3Utils.createSVG('body', width, height);
            expect(svg[0][0].outerHTML).toEqual(result);
        });

        it('should create an svg circle',function(){
            var radius = 10;
            var svg = d3Utils.createSVG('body', 100, 100);
            var result = '<circle r="'+radius+'"></circle>';
            var circle = d3Utils.createCircle(svg,10);
            expect(circle[0][0].outerHTML).toEqual(result);
        });

        // I haven't tested the entire API for the service, just enough to demonstrate that I can test a service.
    });
});