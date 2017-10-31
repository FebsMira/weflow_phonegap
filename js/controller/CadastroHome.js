//TELA INICIAL
App.prototype.CadastroHomeScreen = function() {
	var self = this;
	//BOTAO DO LOGIN
	var IndexForm = $("#login-form");
	IndexForm.unbind('submit').on('submit', function(e){self.LoginAction(e)});
	var BtnLogin = $("#btnLogin");
	BtnLogin.unbind('click').on('click', function(e){self.LoginAction(e)});

};

//ACAO DO LOGIN
App.prototype.LoginAction = function(e) {
	e.preventDefault();
	e.stopImmediatePropagation();
	var self = this;
	$("#btnLogin").attr("disabled",true);
	var email = $("#login_email").val();
	var password = $("#login_password").val();
	var LoginResult = window.Usuario.login(email,password);
	LoginResult.then(function(result) {
		console.log(result);
		$("#btnLogin").attr("disabled",false);
		if(result.status==true){
			//localStorage.token = result.obj.token;
			//mainView.router.loadPage('views/Home.html');
		}else{
			myApp.alert(result.msg,self.defaultMsgTitle);
		}
	});
};
