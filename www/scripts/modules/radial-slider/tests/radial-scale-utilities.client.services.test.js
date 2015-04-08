'use strict';

(function(){

    // Testing pattern is taken from https://github.com/daniellmb/angular-test-patterns/blob/master/patterns/service.md#unit-testing-angularjs-services

    describe('Service: scaleUtils', function () {
        var mySvc;

        // Use to provide any mocks needed
        function _provide(callback) {
            // Execute callback with $provide
            module(function ($provide) {
                callback($provide);
            });
        }

        // Use to inject the code under test
        function _inject() {
            inject(function (_mySvc_) {
                mySvc = _mySvc_;
            });
        }

        // Call this before each test, except where you are testing for errors
        function _setup() {
            // Mock any expected data
            _provide(function (provide) {
                provide.value('myVal', {});
            });

            // Inject the code under test
            _inject();
        }

        beforeEach(function () {
            // Load the service's module
            module('SteroidsApplication', 'supersonic');
        });

        describe('the service api', function () {
            beforeEach(function () {
                // Inject with expected values
                _setup();
            });

            it('should exist', function () {
                expect(!!mySvc).toBe(true);
            });

            // Add specs
        });

        describe('service errors', function () {
            it('should throw an error when required dependency is missing', function () {
                // Use an anonymous function to wrap the code that will fail
                function wrapper() {
                    // Inject WITHOUT providing required values
                    _inject();
                }
                expect(wrapper).toThrow('mySvc: myVal not provided');

                /*
                 Note: you can use Function.bind to avoid an anonymous function wrapper for inject,
                 however, you'll need a polyfill for PhantomJS such as: http://goo.gl/XSLOdx
                 var svc = function (mySvc) {};
                 expect(inject.bind(null, svc)).toThrow('mySvc: myVal not provided');
                 */
            });
        });
    });
}());
