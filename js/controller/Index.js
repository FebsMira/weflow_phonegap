//TELA INICIAL
App.prototype.IndexScreen = function() {
	var self = this;

	//LOGIN AUTOMATICO
	if(localStorage.token){
		mainView.router.loadPage('views/Home.html');
	}else{
		//ESCONDE SPLASH
		if(navigator.splashscreen){
			navigator.splashscreen.hide();
		}
	}
	//BOTAO DO LOGIN
	var IndexForm = $("#index-form");
	IndexForm.unbind('submit').on('submit', function(e){self.LoginAction(e)});
	var BtnLogin = $("#btnLogin");
	BtnLogin.unbind('click').on('click', function(e){self.LoginAction(e)});
};

//INICIALIZACAO
App.prototype.Index = function() {
	var self = this;

	moment.locale('pt-br');

	myApp.onPageBeforeInit('*', function (page) {
		//USAR EM TODOS OS APPS, EVITA BUGS DE RECARREGAR A TELA
		if(page.fromPage.name==page.name){
			$(".page-content").eq(0).html("")
		}

		//ESCONDE TECLADO SEMPRE AO ABRIR UMA NOVA TELA
		if(window.cordova){
			window.cordova.plugins.Keyboard.close();
		}

	});

	//EVITA ARRASTAR E SELECIONAR
	function touchStart(e) {
		if (e.target.tagName != 'SELECT') {
			e.preventDefault();
		}
	}

	//CUSTOM BACK BUTTON
	document.addEventListener("backbutton", function(){
		myApp.closeModal();
		if(mainView.activePage.name!="Home"){
			mainView.router.back();
		}
	}, false);

	//EXECUTA AS ACOES DE CADA TELA
	self.IndexScreen();
	myApp.onPageAfterAnimation('index', function (page) {
		self.IndexScreen();
	});
	myApp.onPageAfterAnimation('Register', function (page) {
		self.RegisterScreen();
	});
	myApp.onPageAfterAnimation('Home', function (page) {
		self.HomeScreen();
	});
};

//ACAO DO LOGIN
App.prototype.LoginAction = function(e) {
	mainView.router.loadPage('views/Home.html');
	/*
	e.preventDefault();
	e.stopImmediatePropagation();
	var self = this;
	$("#btnLogin").attr("disabled",true);
	var email = $("#login_email").val();
	var password = $("#login_password").val(); 
	var LoginResult = window.Fisioterapeuta.login(email,password);
	LoginResult.then(function(result) {
		$("#btnLogin").attr("disabled",false);
		if(result.status==true){
			localStorage.token = result.obj.token;
			mainView.router.loadPage('views/Home.html');
		}else{
			myApp.alert(result.msg,self.defaultMsgTitle);
		}
	});
	*/		
};

//ACAO DO LOGOUT
App.prototype.LogoutAction = function() {
	var LogoutResult = window.Fisioterapeuta.logout();
	LogoutResult.then(function(result) {
		localStorage.clear();
		mainView.router.loadPage('index.html');
	});		
};

//ATUALIZA O TOKEN
App.prototype.RefreshTokenAction = function(result) {
	var self = this;
	console.log(result);
	if(result.msg=="token_expired"){
		var LoginResult = window.Fisioterapeuta.refreshToken();
		LoginResult.then(function(result) {
			if(result.status==true){
				localStorage.token = result.obj.token;
				eval("self."+mainView.activePage.name+"Screen()");
			}else{
				self.LogoutAction();
			}
		});
	}else{
		self.LogoutAction();
	}
};

