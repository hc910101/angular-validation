(function(){
	'use strict';

	angular.module('angular-validation')
	.controller('myctrl', function($scope){
		console.log('myctrl');
		console.log($scope.myform);
				console.log($scope.myform.$dirty);
				console.dir($scope.myform.$$parentform);
		console.dir($scope.myform.hello);
	})
	.directive('validate',['$compile',validate]);

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

						var compiled=$compile('<span ng-show="myform.' +iAttrs.name + '.$invalid">asda {{' + iAttrs.ngModel +' }}</span>');
						var contentTr = angular.element(compiled(scope));
						var compiled2=$compile('<div >xxxxxxxxxxxxxxx</div>');
						var contentTr2 = angular.element(compiled2(scope));
						var sib=element.nextSibling;
						parentDiv.insertBefore(contentTr[0],sib);
						parentDiv.insertBefore(contentTr2[0],sib);

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