$(function () {

	let posTop = 48;
	let posLeft = 48;
	let speed = '';
	let playerOne = '';
	let playerTwo = '';
	let scoreP1 = 0;
	let scoreP2 = 0;
	let rounds = 1;
	let winner = '';

	function mouve(event) {							// Fonction de déplacement
		e = event;
		switch (e.code) {
			case ('ArrowDown'):
				$('#duck').css({
					transform: 'rotate(180deg)'
				});
				posTop += speed;
				break;
			case ('ArrowUp'):
				$('#duck').css({
					transform: 'rotate(360deg)'
				});
				posTop -= speed;
				break;
			case ('ArrowLeft'):
				$('#duck').css({
					transform: 'rotate(270deg)'
				});
				posLeft -= speed;
				break;
			case ('ArrowRight'):
				$('#duck').css({
					transform: 'rotate(90deg)'
				});
				posLeft += speed;
				break;
		};

		if(posTop < -2)
			posTop = 90;
		if(posLeft < -2)
			posLeft = 98;
		if(posTop > 90)
			posTop = -5;
		if(posLeft > 98)
			posLeft = -2;

		$('#duck').css('top', posTop + 'vh');
		$('#duck').css('left', posLeft + 'vw');
	};

	function autoMouve(speed) {						// Fonction déplacement automatique
		interv = setInterval(function() {
			var randNum1 = getRandomInt(100);
			var randNum2 = getRandomInt(100);
			$('#duck').animate({
				top: randNum1 + 'vh',
				left: randNum2 + 'vw' 
			}, speed);
		}, speed);
	};

	function game() {								// Lancement du jeu

		$('#runner').runner({
			countdown: true,
			startAt: 30500,
			milliseconds: false
		});
		$('#runner').fadeIn();
		$('#contRunner').fadeIn();
		$('#runner').runner('start');

		$(this).hide();								// Cache bouton Start

		$('#duck').on('click', function(){			// OnClick du canarDonut
			clearTimeout(timout);
			$(this).css('font-size', '125px');
			speed = 1;
			scoreP1 += 1;
			rounds--;
			$('#duck').off('click');
			$('#runner').runner('stop');
			$('#runner').hide();
			$('#contRunner').hide();

			if (rounds == 0){
				if(scoreP1 > scoreP2){
					winner = playerOne;
				} else {
					winner = playerTwo;
				}

				$('#scoreP1').html('🍩 '+ playerOne + ' 🍩<br><span>Score:'+ scoreP1 +'</span>');
				$('#winner').html('🏆 ' + winner + ' a gagné ! 🏆').fadeIn(3000);
				$('#reset').slideDown().on('click', function(){
					location.reload();
				});
				$('#replay').slideDown().on('click', reInit);

			} else {
				$('#gro').show();
				$('#mouseWin').slideDown(2000);
				$('#scoreP1').html('🍩 '+ playerOne + ' 🍩<br><span>Score:'+ scoreP1 +'</span>');
				$('#restart').fadeIn();
			}
		});

		timout = setTimeout( function(){			// Compteur de temps
			$('#duck').html('🥦').css('font-size', '125px');
			$('#runner').runner('stop');
			$('#runner').fadeOut();
			$('#contRunner').fadeOut();
			speed = 1;
			scoreP2 += 1;
			rounds--;
			$('#duck').off('click');

			if (rounds == 0){
				if(scoreP1 > scoreP2){
					winner = playerOne;
				} else {
					winner = playerTwo;
				}

				$('#scoreP2').html('🍩 '+ playerTwo + ' 🍩<br><span>Score:'+ scoreP2 +'</span>');
				$('#winner').html('🥇 ' + winner + ' a gagné ! 🏆 ').fadeIn(3000);
				$('#reset').fadeIn().on('click', function(){
					location.reload();
				});
				$('#replay').fadeIn().on('click', reInit);

			} else {
				$('#leg').show();
				$('#keyWin').slideDown(2000);
				$('#scoreP2').html('🍩 '+ playerTwo + ' 🍩<br><span>Score:'+ scoreP2 +'</span>');
				$('#restart').fadeIn();
			}
		}, 30100);
	};

	function gameAuto() {								// Lancement du jeu automatique

		$('#runner').runner({
			countdown: true,
			startAt: 30500,
			milliseconds: false
		});
		$('#runner').fadeIn();
		$('#contRunner').fadeIn();
		$('#runner').runner('start');

		$(this).hide();								// Cache bouton Start

		$('#duck').on('click', function(){			// OnClick du canarDonut
			clearTimeout(timeout);
			$(this).css('font-size', '12vh');
			scoreP1 += 1;
			rounds--;
			$('#duck').off('click');
			$('#duck').stop();
			clearInterval(interv);
			autoMouve(1);
			$('#runner').runner('stop');
			$('#runner').hide();
			$('#contRunner').hide();
			console.log(rounds);

			if (rounds == 0){
				if(scoreP1 > scoreP2){
					winner = 'Tu as gagné !';
				} else {
					winner = 'Le Donut a gagné !';
				}

				$('#scoreP1').html('🍩 '+ playerOne + ' 🍩<br><span>Score:'+ scoreP1 +'</span>');
				$('#winner').html('🏆 ' + winner + ' 🏆').fadeIn(3000);
				$('#reset').slideDown().on('click', function(){
					location.reload();
				});
				// $('#replay').slideDown().on('click', function(){
				// 	$(this).hide();
				// 	init();
				// 	rounds=0;
				// 	scoreP1 = 0;
				// 	$('#scoreP1').html('🍩 '+ playerOne + ' 🍩<br><span>Score:'+ scoreP1 +'</span>');
				// 	scoreP2 = 0;
				// 	$('#scoreP2').html('🍩 '+ playerTwo + ' 🍩<br><span>Score:'+ scoreP2 +'</span>');
				// 	$('#nbRoundSolo').fadeIn();
				// });

			} else {
				$('#mouseWin').html('🍩 Miam miam 🍩<br><b>Gagné !</b>');
				$('#gro').show();
				$('#mouseWin').slideDown(2000);
				$('#scoreP1').html('🍩 '+ playerOne + ' 🍩<br><span>Score:'+ scoreP1 +'</span>');
				$('#restart2').fadeIn();
				$('#reset').slideDown().on('click', function(){
					location.reload();
				});
			}
		});

		timeout = setTimeout( function(){			// Compteur de temps
			$('#duck').html('🥦').css('font-size', '12vh');
			$('#runner').runner('stop');
			$('#runner').fadeOut();
			$('#contRunner').fadeOut();
			scoreP2 += 1;
			rounds--;
			$('#duck').stop();
			clearInterval(interv);
			autoMouve(1);
			$('#duck').off('click');

			if (rounds == 0){
				if(scoreP1 > scoreP2){
					winner = 'Tu as gagné !';
				} else {
					winner = 'Le Donut a gagné !';
				}

				$('#scoreP2').html('🍩 '+ playerTwo + ' 🍩<br><span>Score:'+ scoreP2 +'</span>');
				$('#winner').html('🏆 ' + winner + ' 🏆').fadeIn(3000);
				$('#reset').fadeIn().on('click', function(){
					location.reload();
				});
				// $('#replay').fadeIn().on('click', function() {
				// 	$(this).hide();
				// 	init();
				// 	scoreP1 = 0;
				// 	$('#scoreP1').html('🍩 '+ playerOne + ' 🍩<br><span>Score:'+ scoreP1 +'</span>');
				// 	scoreP2 = 0;
				// 	$('#scoreP2').html('🍩 '+ playerTwo + ' 🍩<br><span>Score:'+ scoreP2 +'</span>');
				// 	$('#nbRoundSolo').fadeIn();
				// });

			} else {
				$('#leg').show();
				$('#keyWin').html('🤷 Le Donut a disparu ! 🙆‍<br><b>Perdu !</b>')
				$('#keyWin').slideDown(2000);
				$('#scoreP2').html('🍩 '+ playerTwo + ' 🍩<br><span>Score:'+ scoreP2 +'</span>');
				$('#restart2').fadeIn();
				$('#reset').slideDown().on('click', function(){
					location.reload();
				});
			}
		}, 30100);

	};

	function reInit() {								// Fonction redémarrage
		$('#playersName').slideDown();
		$('#nbRound').slideDown();
		scoreP1 = 0;
		$('#scoreP1').html('🍩 '+ playerOne + ' 🍩<br><span>Score:'+ scoreP1 +'</span>');
		scoreP2 = 0;
		$('#scoreP2').html('🍩 '+ playerTwo + ' 🍩<br><span>Score:'+ scoreP2 +'</span>');
		$('#keyWin').slideUp();
		$('#mouseWin').slideUp();
		$('#leg').hide();
		$('#gro').hide();
		$('#winner').hide();
		$('#reset').hide();
		$('#replay').hide();
		$('#duck').html('🍩').css({
			fontSize: '5vw',
			top: "48vh",
			left: "48vw"
		});
		posTop = 50;
		posLeft = 50;
		speed = 3;
	};

	function init() {								// Fonction reset
		$('#keyWin').slideUp();
		$('#mouseWin').slideUp();
		$('#leg').hide();
		$('#gro').hide();
		$('#winner').hide();
		$('#reset').hide();
		$('#duck').html('🍩').css({
			fontSize: '5vh',
			top: "48vh",
			left: "48vw"
		});
		posTop = 50;
		posLeft = 50;
		speed = 3;
	};

	function initPlayers(event){					// Fonction initialisation joueurs
		event.preventDefault();
		init();
		if ($('#playerOne').val() == '') {
			playerOne = 'Joueur 1';
		} else {
			playerOne = $('#playerOne').val();
		}
		$('#formOne').slideUp();
		$('body').append('<div id="scoreP1">🍩 '+ playerOne + ' 🍩<br><span>Score:'+ scoreP1 +'</span></div>');
		$('#scoreP1').css('text-transform', 'capitalize');
		$('#scoreP1').slideDown();
		$('#formTwo').slideDown();

		$('#pTwo').on('click', function(event) {
			event.preventDefault();
			if ($('#playerTwo').val() == '') {
				playerTwo = 'Joueur 2';
			} else {
				playerTwo = $('#playerTwo').val();
			}
			$('#formTwo').slideUp();
			$('body').append('<div id="scoreP2">🍩 '+ playerTwo + ' 🍩<br><span>Score:'+ scoreP2 +'</span></div>');
			$('#scoreP2').css('text-transform', 'capitalize');
			$('#scoreP2').slideDown();
			$('#nbRound').slideDown();
			$('#rules').hide();

			$('#3rounds').on('click', function(){
				rounds = 3;
				$('#playersName').hide();
				$('#duck').fadeIn(1500);
				$('#start').fadeIn(1500);
			});

			$('#5rounds').on('click', function(){
				rounds = 5;
				$('#playersName').hide();
				$('#duck').fadeIn(1500);
				$('#start').fadeIn(1500);
			});
		})
	};

	function getRandomInt(max) {						// Fonction chiffre random
		return Math.floor( Math.random() * Math.floor(max) );
	};


	$(document).on('keydown', mouve);				// Lancement de la fonction moove

	$('body').css({									// Initialisation de la taille du body
		height: $(window).height() -3,
		width: $(window).width() -1
	});

	 $('#start').on('click', game);
	// $('#start2').on('click', gameAuto);

	$('#restart').on('click', function() {
		init();
		$(this).fadeOut();
		game();
	});

	$('#restart2').on('click', function() {
		init();
		$('#duck').stop();
		clearInterval(interv);
		$('#duck').clearQueue();
		autoMouve(speedy);
		console.log(speedy);
		$(this).fadeOut();
		gameAuto();
	});

	$('#multiPlayer').on('click', function() {
		$('#nbPlayer').slideUp();
		$('#playersName').fadeIn();
		$('#rules').fadeIn();
		$('#pOne').on('click', initPlayers);			// Lancement de la fonction initPlayers
	});

	$('#onePlayer').on('click', function() {			// Lancement fonction un joueur
		init();
		$('#nbPlayer').slideUp();
		$('#nbRoundSolo').fadeIn();
		$('#rules').html('<h2>Règles du jeu:</h2>Clique sur le Donut !<br>Vous avez <b>trente</b> secondes !');
		$('#rules').fadeIn();
		$('#rSolo').on('click', function() {
			$('#nbRoundSolo').slideUp();
			$('#rules').slideUp();
			rounds = $('#roundSolo').val();
			$('#duck').fadeIn();
			$('#speed').fadeIn();
			$('#speed1').on('click', function() {
				$('#speed').slideUp();
				autoMouve(1500);
				speedy = 1500;
				$('#start2').slideDown();
			});
			$('#speed2').on('click', function() {
				$('#speed').slideUp();
				autoMouve(1000);
				speedy = 1000;
				$('#start2').slideDown();
			});
			$('#speed3').on('click', function() {
				$('#speed').slideUp();
				autoMouve(500);
				speedy = 500;
				$('#start2').slideDown();
			});
			$('#start2').on('click', gameAuto);
			$(document).off('keydown', mouve);
			// autoMouve(800);
			playerOne = 'Toi';
			playerTwo = 'LeDonut';
			$('body').append('<div id="scoreP1">🍩 '+ playerOne + ' 🍩<br><span>Score:'+ scoreP1 +'</span></div>');
			$('body').append('<div id="scoreP2">🍩 '+ playerTwo + ' 🍩<br><span>Score:'+ scoreP2 +'</span></div>');
			$('#scoreP1').slideDown();
			$('#scoreP2').slideDown();
		})

	});

});








// $('body').awesomeCursor('tooth', {
//     color: '#2cb2da',
//     hotspot: 'top right'
// });
