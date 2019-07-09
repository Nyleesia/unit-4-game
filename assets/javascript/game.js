//initiate console.log function as a variable
let log = console.log;

// document.ready to ensure correct page load order
$(document).ready(function() {
	// the first thing required is a list of characters, these are stored in
	// the "dadSquad" object (8 dads)
	let dadSquad = {
		dads: {
			theJetsons: {
                id: "jetsons",
                cartoon: "a",
				firstName: "George",
				lastName: "Jetson",
				healthPoints: 50,
				attackPower: 25,
				counterAttackPower: 15,
				image: "assets/images/jetson-george.jpg"
			},

			americanDad: {
                id: "americanDad",
                cartoon: "b",
				firstName: "Stan",
				lastName: "Smith",
				healthPoints: 75,
				attackPower: 10,
				counterAttackPower: 7,
				image: "assets/images/smith-stan.png"
			},

			rickAndMorty1: {
                id: "rickAndMorty1",
                cartoon: "c",
				firstName: "Jerry",
				lastName: "Smith",
				healthPoints: 30,
				attackPower: 24,
				counterAttackPower: 22,
				image: " assets/images/smith-jerry.jpg"
			},

			bobsBurgers: {
                id: "bobs",
                cartoon: "d",
				firstName: "Bob",
				lastName: "Belcher",
				healthPoints: 90,
				attackPower: 9,
				counterAttackPower: 9,
				image: "assets/images/belcher-bob.jpg"
			},

			familyGuy: {
                id: "famGuy",
                cartoon: "e",
				firstName: "Peter",
				lastName: "Griffin",
				healthPoints: 45,
				attackPower: 15,
				counterAttackPower: 5,
				image: "assets/images/griffin-peter.png"
			},

			rickAndMorty2: {
                id: "rickAndMorty2",
                cartoon: "f",
				firstName: "Rick",
				lastName: "Sanchez",
				healthPoints: 25,
				attackPower: 24,
				counterAttackPower: 22,
				image: " assets/images/sanchez-rick.png"
			},

			theSimpsons1: {
                id: "simpsons1",
                cartoon: "g",
				firstName: "Homer",
				lastName: "Simpson",
				healthPoints: 60,
				attackPower: 14,
				counterAttackPower: 15,
				image: "assets/images/simpson-homer.png"
			},

			theSimpsons2: {
                id: "simpsons2",
                cartoon: "h",
				firstName: "Ned",
				lastName: "Flanders",
				healthPoints: 100,
				attackPower: 8,
				counterAttackPower: 12,
				image: "assets/images/flanders-ned.jpg"
			}
		}
	};
	//console log object above, to ensure that it is working as expected
	log(dadSquad);

	/////////////////////////////////////////////////////////////////////////////////
	// next, declare all variables, according to the psuedocode

	// dadList variable stores the dads using dot notation to find each dad
    let dadList = [
        dadSquad.dads.americanDad,
        dadSquad.dads.theJetsons,
        dadSquad.dads.theSimpsons1,
        dadSquad.dads.bobsBurgers,
        dadSquad.dads.familyGuy,
        dadSquad.dads.rickAndMorty1,
        dadSquad.dads.rickAndMorty2,
        dadSquad.dads.theSimpsons2
    ];

    log(dadList);

	// then, set dads variable as an empty array for pushing random order of dads per game
	let dads = [];

	/////////////////////////////////////

	// other variables
	let hpHero = 0;
	let attackBase = 0;
	let attackCurrent = 0;
	let heroId = "";
	let defenderId = "";

	let hpAttacker = 0;
	let counterAttack = 0;
	let defeatedDads = [];

	let heroTotalHealth = 0;
	let defenderTotalHealth = 0;
	///////////////////////////////////

	// variable to play audio
	let audio = new Audio("assets/audio/music.mp3");
	audio.volume = 0.1;
	audio.loop = true;

	/////////////////////////////////////////////////////////////////////////////////////////

	// function for sound
	function sound() {
		if (audio.paused == true) {
			audio.play();
		} else {
			audio.pause();
		}
	};

	// function to activate sound on click
	$("#sound").click(sound);

	// function to activate sound on load
	audio.play();
	////////////////////////////////////

	// loop to push 4/8 dads into dads
	while (dads.length < 8) {
		var dadPos = Math.floor(Math.random() * dadList.length);
		if ($.inArray(dadList[dadPos], dads) !== -1) {
			continue;
		}
		dads.push(dadList[dadPos]);
    }
    
    log(dads);

	///////////////////////////////////////////////////////////////////////////////////////////

	//divs revealed as needed
	$("#attack").hide();

	// function to initiate game play
	function revealWarriors() {
        // reveals the divs for the four fighters
        $(".lead").hide();
		$("#warriors").show();
		$("#instructions").show();
		$("#announcement").show();

		// disables play button until next reset or reload
		$("#play").addClass("disabled");

		//  function that creates a "badge" for each of 4 randomly selected fighters
		$.each(dads, function(cartoon, dad) {
			$("#warriors").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
                                        <div class="healthpoints"> "HP: " ${dad.healthPoints}</div> 
                                    </div>`);
		});

		// event that allows fighter to selected on click
        $(".characters").click(heroSelect);
        
        log(revealWarriors);
	};

	// creates that function executed above "heroSelect"
	function heroSelect() {
		// remove divs that are no longer needed
		$("#instructions").hide();
		$("#announcement").hide();
		$("#fightStats").hide();

		
        
        // moves the selected fighter to the fight space, leaving behind 3 challengers
        $(".hero").append('<div class="title">Mighty Hero</div>');
        
        // this attribute becomes the unique dad identifier within this function 
		let fighterID = $(this).attr("id");
		$.each(dads, function(cartoon, dad) {
			if (fighterID !== dad.id) {
				return;
            };
            
            // adds the identified (clicked) fighterID to the "hero" div (first fighter)
			$(".hero").append(`<div class="characters col-md-3" id="${dad.id}">
                                    <div>${dad.firstName} ${dad.lastName}</div>
                                    <img src="${dad.image}" style="width:100px; height:100px;"/>
                                    <div class="healthpoints"> HP:  ${dad.healthPoints}</div> 
									<progress id="healthbar" value="100" max="100">  </progress>
                                    </div>`);
            
                                // locates and reassigns simpler values to the health and attack stats
								hpHero = dad.healthPoints;
								heroTotalHealth = dad.healthPoints;
                                attackBase = dad.attackPower;
                                attackCurrent = dad.attackPower;
                                heroId = dad.id;
        });

        // moves the remaining three fighters to the challengers area, so that one can be chosen as the first defender
		$("#challengers").append('<div class="title">Challengers</div>');
		$.each(dads, function(cartoon, dad) {
			if (fighterID == dad.id) {
				return;
            };
            
			$("#challengers").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
										<div class="healthpoints"> HP:  ${dad.healthPoints}</div>
										<progress id="healthbar" value="100" max="100">  </progress>
                                        </div>`);
		});
        
        // selects first defender on click by executing the "selectDefender" function below
		$("#challengers .characters").click(selectDefender);

        // hides undeeded divs
		$("#warriors").hide();
		$("#instructions").hide();
        
        // reveals new divs
		$(".hero").show();
	    $(".defender").show();
		$("#challengers").show();
        $("#updates").show();
        
        log(heroSelect);
	};

    // repeats the procedure above to select the first defender
	function selectDefender() {
		if (hpAttacker>0){return;}
		let fighterID = $(this).attr("id");
		$(".defender").append('<div class="title">Defender</div>');
		$.each(dads, function(cartoon, dad) {
			if (fighterID != dad.id) {
				return;
            }
            
			$(".defender").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
                                        <div class="healthpoints"> HP:  ${dad.healthPoints}</div> 
										<progress id="healthbar" value="100" max="100">  </progress>
                                        </div>`);

										hpAttacker = dad.healthPoints;
										defenderTotalHealth = dad.healthPoints;
                                        counterAttack = dad.counterAttackPower;
                                        defenderName = dad.firstName + " " + dad.lastName;
                                        defenderId = dad.id;
		});
        
        // the remaining 2 fighters stay in the challengers area until either the hero or defender is defeated
		$("#challengers").empty();
		$("#challengers").append('<div class="title">Challengers</div>');
		$.each(dads, function(cartoon, dad) {
			if (fighterID == dad.id) {
				return;
            }
            
			if (heroId == dad.id) {
				return;
            }
            
			if ($.inArray(dad.id, defeatedDads) !== -1) {
                return;
                
			}
			$("#challengers").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
                                        <div class="healthpoints"> HP:  ${dad.healthPoints}</div> 
										<progress id="healthbar" value="100" max="100">  </progress>
                                        </div>`);
		});

        // executes the function to select a defender, reveals the attack button and appends the fightSpace
		$("#challengers .characters").click(selectDefender);
		$("#fightStats").show;
		$("#updates").show;
		$("#stats").show;
		$("#fightSpace").append();
		$("#attack").show();
		$("#attack").off("click");
        $("#attack").click(attackDefender);
        
        log(selectDefender)
	}

    // announces damage to each fighter's health points
	function attackDefender() {
        $("#attackResult").html(`</div class = "strike"> ${defenderName} has been attacked for ${attackCurrent} health points. </div>
                                    <br>
                                    <br>
                                </div class = "returned"> ${defenderName} counter attacked for  ${counterAttack} health points. </div>`
        );
		
		
		// updates the hero hp displayed below image
        hpHero -= counterAttack;
		$(".hero .healthpoints").html("HP: " + hpHero);
		$(".hero #healthbar").css("width" , hpHero/heroTotalHealth*100+"%");
        
        // updates the defender hp displayed below image
        hpAttacker -= attackCurrent;
		$(".defender .healthpoints").html("HP: " + hpAttacker);
		$(".defender #healthbar").css("width" , hpAttacker/defenderTotalHealth*100+"%");

        // sets conditions for winning and losing
        // hero loses if hp goes to less than 0
		if (hpHero <= 0) {
			heroDefeated();
			$("#attack").hide();
		}

        // the other guy also loses if hp goes to less than 0
		if (hpAttacker <= 0) {
			defenderDefeated(defenderName);
		}

        // hero wins only if he defeats all three other fighters AND has hp greater than 0
		if (defeatedDads.length >= 3 && hpHero >0 ) {
			$("#attack").hide();
			$("#defTitle").show();
			$("#challengers").hide();
			$(".defender").hide();
			$(".hero").append(
				`<div> We have a WINNER!!! </div>`
			);
		}

        // the current value of the hero's attack is then added to the base attach, 
        // effectively multiplying the number of attacks by the base attack value
		attackCurrent += attackBase;
	}

    // ends the game when the hero loses
	function heroDefeated() {
		$(".title").replaceWith(
            `<div class= "BOO"> MIGHTY ZERO. YOU DIED TOO!!! </div>`
		);


		$("#fightMode").hide();
		$(".defender").hide();
		$("#challengers").hide();
		$("#defeated").hide();
		$("#defTitle").hide();
		$("#attack").hide();

		//updates hero stats
		$(".hero .healthpoints").html("KO");
	}

    // sends the defeated challengers to purgatory (opacity)
	function defenderDefeated(dadName) {
		$("#defeated").show();
		$("#defTitle").show();

		defeatedDads.push(defenderId);
		//updates the alert space when a defender goes down
        $("#fightSpace").append(
            `<div id= "loserDad"> ${dadName} is a loser!</div>`
        );

        $("#defeated").empty();
        
        // checks to see whether a fighter (besides the hero) was defeated so that the 
        // function can be executed again
		$.each(dads, function(cartoon, dad) {
			if ($.inArray(dad.id, defeatedDads) == -1) {
				return;
            }
            
            // when a fighter is defeated, this appends them to purgatory
			$("#defeated").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
                                        <div class="healthpoints"> "KO" </div> 
                                        </div>`);
		});

        // clears the defender div for another fighter
        $(".defender").empty();
        $("#attack").hide();
	}

    // resets the game, very important: enables play button and empties fighter divs
	function resetGame(firsttime = false) {
		var hpHero = 0;
		var attackBase = 0;
		var attackCurrent = 0;
		var heroId = "";

		var hpAttacker = 0;
		var counterAttack = 0;
		var defeatedDads = [];

		$("#warriors").hide();
		$(".hero").hide();
		$("#fightMode").hide();
		$(".defender").hide();
		$("#challengers").hide();
		$("#defeated").hide();
		$("#defTitle").hide();
		$("#updates").hide();
		$("#instructions").hide();
		$("#announcement").hide();

		$("#warriors").empty();
		$(".hero").empty();
		$("#fightMode").empty();
		$(".defender").empty();
		$("#challengers").empty();
		$("#defeated").empty();
        $("#play").removeClass("disabled");
	}


	$("#reset").click(function() {
		location.reload();
	});

	$("#play").click(revealWarriors);

	// setup first game
    resetGame();
    
}); // end of document ready
