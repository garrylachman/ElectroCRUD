'use strict';

/**
 * @ngdoc directive
 * @name electroCrudApp.directive:angularIcheck2
 * @description
 * # angularIcheck2
 */
angular.module('electroCrudApp')
    .directive('iCheck', [function () {
        return {
            restrict: 'EA',
            transclude: true,
            require: 'ngModel',
            replace: true,
            template: '<div class="angular-icheck">\n    <div class="checkbox icheckbox_flat-blue"></div>\n    <div class="label" ng-transclude></div>\n</div>',
            link: function (scope, ele, attrs, ctrl) {
                var box = angular.element(ele[0].querySelector('.checkbox'));
                ele.bind("click", function () {
                    box.toggleClass("checked");
                    ctrl.$setViewValue(box.hasClass("checked"));
                });
                ctrl.$render = function () {
                    if (ctrl.$viewValue) {
                        box.addClass("checked");
                    } else {
                        box.removeClass("checked");
                    }
                };
                // https://github.com/angular/angular.js/issues/2594
                // override $isEmpty method
                ctrl.$isEmpty = function(value) {
                    return value === false;
                };
                ctrl.$setViewValue(box.hasClass("checked"));
                ctrl.$validate();
            }
        }
    }]);
