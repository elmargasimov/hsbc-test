'use strict';

(function(){
    describe('Directive: statusBox', function () {
        var element, scope, compile, template;
        var validTemplate = '<status-box></status-box>';

        function createDirective(template) {
            var elm;

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
            module('scripts/modules/status-box/views/status-box.client.view.html');

            // Inject in angular constructs otherwise,
            //  you would need to inject these into each test
            inject(function (_$rootScope_, _$compile_, $templateCache) {
                template = $templateCache.get('../www/scripts/modules/status-box/views/status-box.client.view.html');
                $templateCache.put('www/scripts/templates/status-box.client.view.html',template);
                scope = _$rootScope_.$new();
                compile = _$compile_;
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

