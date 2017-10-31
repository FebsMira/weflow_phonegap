//TELA INICIAL
App.prototype.PlanejamentoCalendarioScreen = function() {
	var self = this;
	$('#divCalendario').fullCalendar({
		dayClick: function() {
			mainView.router.loadPage('views/PlanejamentoHorario.html');
		}
	})

};
