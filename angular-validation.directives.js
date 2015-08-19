/*
* Usage: <form><input type="text" hint="Please enter a integer" ng-pattern="/^\d+$/"/></form>
*
* what it does: :
* 			1. the input elements with the hint attribute will be set to $dirty when submit button is pressed
*           2. the first invalid element with the hint attribute will get the focus when submit button is pressed  
*			3. a <span> element containing the string value of the hint will be attached to the end of <input>
*/         
(function(){
	'use strict';
	var app=angular.module('form-hint');
	app.directive('hint',['$compile','$parse','$timeout',validate]);
	function validate($compile,$parse,$timeout){
		return{
			restrict:'A',
			require:'^form',
			compile: function compile(tElement, tAttrs, transclude) {
				return {
					pre: function preLink(scope, iElement, iAttrs, controller) { 
						scope.focused=false;
						var element= iElement[0];
						var parentDiv = element.parentNode;
						var errorMsg = angular.element($compile('<span class="form-hint-invalid" ng-show="'+iElement[0].form.name + '.' +iAttrs.name + '.$invalid && ('+iElement[0].form.name + '.' +iAttrs.name + '.$dirty || '+ iElement[0].form.name +'.$submitted)"  > {{' + iAttrs.hint +' }}</span>')(scope));
						var sib=element.nextSibling;
						parentDiv.insertBefore(errorMsg[0],sib);
						iElement.on('submit',function(){console.log("submitted")});
						var form=angular.element(iElement[0].form);
							form.on('submit',function(){
							scope[iElement[0].form.name][iAttrs.name].$setDirty();
							if(!scope.focused && scope[iElement[0].form.name][iAttrs.name].$invalid){
								iElement[0].focus();
								scope.focused=true;
								$timeout(function(){scope.focused=false});
							}
						});
					},
				}
			},
		}
	};
}
)()