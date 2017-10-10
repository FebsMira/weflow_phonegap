//Custom loading
var wcDefaultLoading = Object.create(HTMLElement.prototype);
wcDefaultLoading.createdCallback = function() {
	this.innerHTML = window.App.defaultLoading;
};
var WebComponentDefaultLoading = document.registerElement('web-component-loading', {prototype: wcDefaultLoading});

