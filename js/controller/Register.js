//TELA INICIAL
App.prototype.RegisterScreen = function() {
	var self = this;
	var RegisterForm = $("#register-form");
	RegisterForm.unbind('submit').on('submit', function(e){self.RegisterAction(e)});
};

//ACAO DO REGISTRO
App.prototype.RegisterAction = function(e) {
	e.preventDefault();
	e.stopImmediatePropagation();
	var self = this;

	$("#btnRegister").attr("disabled",true);
	var email = $("#register_email").val();
	var password = $("#register_password").val(); 
	var RegisterResult = window.Fisioterapeuta.register(email,password);
	RegisterResult.then(function(result) {
		$("#btnRegister").attr("disabled",false);
		if(result.status==true){
			var LoginResult = window.Fisioterapeuta.login(email,password);
			LoginResult.then(function(result) {
				if(result.status==true){
					localStorage.token = result.obj.token;
					localStorage.email = email;
					localStorage.password = password;
					mainView.router.loadPage('views/Home.html');
				}else{
					myApp.alert(result.msg,self.defaultMsgTitle);
				}
			});		
		}else{
			myApp.alert(result.msg,self.defaultMsgTitle);
		}
	});		
};

