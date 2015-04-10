'use strict';

(function(){
    describe('Directive: radialScale', function () {
        var element, scope, compile, defaultData;
        var validTemplate = '<radial-scale class="hs-svg-core" hs-data="data"></radial-scale>';

        function createDirective(data, template) {
            var elm;

            // Setup scope state
            scope.data = data || defaultData;

            // Create directive
            elm = compile(template || validTemplate)(scope);

            // Trigger watchers
            scope.$apply();

            // Return
            return elm;
        }

        beforeEach(function () {
            // Load the directive's module
            module('SteroidsApplication', 'supersonic');

            // Reset data each time
            defaultData = [
                {
                    "initialValue": 36,
                    "colour": "#820008"
                },
                {
                    "initialValue": 50,
                    "colour": "#2f7490"
                },
                {
                    "initialValue": 31,
                    "colour": "#3e505a"
                }
            ];

            // Provide any mocks needed
            module(function ($provide) {
                //$provide.value('Name', new MockName());
            });

            // Inject in angular constructs otherwise,
            //  you would need to inject these into each test
            inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                compile = $compile;
            });
        });

        describe('when created', function () {
            it('should render the expected output', function () {
                element = createDirective();
                expect(element[0]).toBeTruthy();
            });
        });
    });
}());
