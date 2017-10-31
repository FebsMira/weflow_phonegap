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
	myApp.onPageAfterAnimation('Cadastro', function (page) {
		self.CadastroScreen();
	});
	myApp.onPageAfterAnimation('CadastroHome', function (page) {
		self.CadastroHomeScreen();
	});
	myApp.onPageAfterAnimation('Home', function (page) {
		self.HomeScreen();
	});
	myApp.onPageAfterAnimation('Ofertas', function (page) {
		self.OfertasScreen();
	});
	myApp.onPageAfterAnimation('PlanejamentoCalendario', function (page) {
		self.PlanejamentoCalendarioScreen();
	});
	myApp.onPageAfterAnimation('PlanejamentoHorario', function (page) {
		self.PlanejamentoHorarioScreen();
	});

	self.HomeListar();
};



//LISTAR VIAGENS
App.prototype.HomeListar = function() {
	var self = this;
	var HomeScreenResult = window.Viagens.listar();
	HomeScreenResult.then(function(result) {
		console.log(result);
		$.get("templates/HomeListar.html", function(temp) {
			var div = $("#HomeListar");
				div.html("");
			var compiledTemplate = Template7.compile(temp);
			var html = compiledTemplate(result.obj);
			div.html(html);
		});
	});

};
