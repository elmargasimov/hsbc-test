(function() {
    'use strict';

    angular.module('SteroidsApplication').directive('statusBox', statusBox);

    function statusBox () {

        var directive = {
            restrict: 'EA',
            controller: 'StatusBoxController',
            controllerAs: 'hs',
            scope: {},
            templateUrl: 'scripts/modules/status-box/views/status-box.client.view.html'
        };

        return directive;
    }
})();