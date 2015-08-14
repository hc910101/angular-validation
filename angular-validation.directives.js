(function(){
	'use strict';

	angular.module('angular-validation').directive('validate',['$compile',validate]);

	function validate($compile){
		return{

			restrict:'A',

			link:function(scope, element, attrs, controllers){
				//console.log(element);
				//console.log(scope);
				//console.log(attrs);

			},
			compile: function compile(tElement, tAttrs, transclude) {
				return {
					pre: function preLink(scope, iElement, iAttrs, controller) { 

						var element= iElement[0];
						var parentDiv = element.parentNode;
						var compiled=$compile('<span ng-show="' +iAttrs.ngModel + '">asda {{' + iAttrs.ngModel +' }}</span>');
						var contentTr = angular.element(compiled(scope));
						parentDiv.insertBefore(contentTr[0],element.nextSibling);


					},
					post: function postLink(scope, iElement, iAttrs, controller) { 
					}
				}

      // or
      // return function postLink( ... ) { ... }
  },
  			controller:function control($scope, $element){
				console.log('controller');
      			$scope.name = $scope.name + "Second ";
    		}
}

};
})()