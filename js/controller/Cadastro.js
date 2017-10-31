//TELA INICIAL
App.prototype.CadastroScreen = function() {
	var self = this;


	//BOTAO DO LOGIN
	var CadastroForm = $("#register-form");
	CadastroForm.unbind('submit').on('submit', function(e){self.CadastroAction(e)});
	var btnCadastro = $("#btnCadastro");
	btnCadastro.unbind('click').on('click', function(e){self.CadastroAction(e)});
};

//ACAO DO REGISTRO
App.prototype.CadastroAction = function(e) {
	e.preventDefault();
	e.stopImmediatePropagation();
	var self = this;

	$("#btnCadastro").attr("disabled",true);
	var email = $("#register_email").val();
	var password = $("#register_password").val();
	var name = $("#register_name").val();
	var CadastroResult = window.Usuario.register(email,password,name);
	CadastroResult.then(function(result) {
		$("#btnCadastro").attr("disabled",false);
		if(result.status==true){
			var CadastroResult = window.Usuario.login(email,password,name);
			CadastroResult.then(function(result) {
				console.log(result);
				if(result.status==true){
					//localStorage.token = result.obj.token;
					//localStorage.email = email;
					//localStorage.password = password;
					//mainView.router.loadPage('views/Home.html');
				}else{
					myApp.alert(result.msg,self.defaultMsgTitle);
				}
			});
		}else{
			myApp.alert(result.msg,self.defaultMsgTitle);
		}
	});
};
