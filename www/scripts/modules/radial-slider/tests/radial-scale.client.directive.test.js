'use strict';

(function(){
    describe('Directive: radialScale', function () {
        var element, scope, compile, defaultData;
        var validTemplate = '<radial-scale class="hs-svg-core"></radial-scale>';

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
                expect(element[0]).toBeDefined();
            });
        });
    });
}());
