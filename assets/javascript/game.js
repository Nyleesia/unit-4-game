// I will need to console log as I go along to ensure that the steps are 
// having the intended effects
// to make this easier, I will need to save the console log function 
// as a variable
var log = console.log;

$( document ).ready(function() {
// the first thing that my game will require is a list of characters
// I will store these in an object called "dadSquad"
// the following object contains 15 player characters (I will need an image for each)
let dadSquad = {
                dads:{
                theJetsons: {id: "jetsons", cartoon: "The Jetsons", firstName: "George", lastName:"Jetson", 
                    healthPoints: 50, attackPower: 25, counterAttackPower: 15, 
                    image:"assets/images/jetson-george.jpg"},
                    
                americanDad: {id: "americanDad", cartoon: "American Dad", firstName: "Stan", lastName:"Smith", 
                    healthPoints:75, attackPower: 10, counterAttackPower: 7, 
                    image:"assets/images/smith-stan.png"},

                theIncredibles: {id: "incredibles", cartoon: "The Incredibles", firstName: "Bob 'Mr. Incredible'", 
                    lastName:"Parr", healthPoints:100, attackPower: 8, 
                    counterAttackPower: 10, image:"assets/images/mr-incredible.jpg"},

                bobsBurgers:{id: "bobs", cartoon: "Bob's Burgers", firstName: "Bob", lastName:"Belcher", 
                    healthPoints:90, attackPower: 9, counterAttackPower: 9, 
                    image:"assets/images/belcher-bob.jpg"},
                
                familyGuy: {id: "famGuy",cartoon: "Family Guy", firstName: "Peter", lastName:"Griffin", 
                    healthPoints: 45, attackPower: 15, counterAttackPower: 5, 
                    image: "assets/images/griffin-peter.png"},
                
                rickAndMorty: {id: "rickAndMorty",cartoon: "Rick and Morty", firstName: "Rick",
                    lastName: "Sanchez", healthPoints: 80, attackPower:12, counterAttackPower:13,
                    image:" assets/images/sanchez-rick.png",},    
                
                theSimpsons: {id: "simpsons", cartoon: "The Simpsons", firstName:"Homer", 
                    lastName:"Simpson", healthPoints: 60, attackPower: 14, counterAttackPower: 15,
                    image: "assets/images/simpson-homer.png"}
                 }
            };

log(dadSquad);

let hpHero = 0
let attackBase = 0
let attackCurrent = 0;
let heroId = "";
let defenderId = "";

let hpAttacker = 0;
let counterAttack = 0;
let defeatedDads = [];
               


//////////////////////////////////////////////////////////////////////
// I want to add some music to my game
var audio = new Audio('assets/audio/music.mp3');
audio.volume = 0.1;
audio.loop = true;

// since I want to activate the sound by using a button, I have
// to add another event listener
document.addEventListener('click', function (event) {

    // next I have to add the conditions under which the sound will play
    // I have decided to use just one sound button, so I will need to check
    // if the sound is already playing or not, so that clicking the sound
    // button will trigger the opposite event (play/pause)
    if (event.target.matches('#sound')){
       if (audio.paused == true) {
            audio.play();
        }
        else {
            audio.pause();
        };
    };
});




// I made the list of dads in the object above a simple variable "dads"
let dadList = [dadSquad.dads.americanDad, dadSquad.dads.theJetsons, 
            dadSquad.dads.theIncredibles, dadSquad.dads.bobsBurgers,
            dadSquad.dads. familyGuy, dadSquad.dads.rickAndMorty,
            dadSquad.dads.theSimpsons];
let dads = [];

while (dads.length < 4) {
    var dadPos = Math.floor(Math.random() * dadList.length);
    if ($.inArray(dadList[dadPos],dads) !== -1) {
        continue;
    }
    dads.push(dadList[dadPos]);
}


$("#attack").hide();            


// the next thing I will need is a function that creates a "badge" for each character
// and allows the player to select the character they want to play as
function revealWarriors(){
    $("#warriors").show();
    $("#instructions").show();
    $("#announcement").show();
    $("#play").addClass("disabled");

        $.each(dads, function(cartoon, dad) {
            $("#warriors").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
                                        <div class="healthpoints"> "HP: " ${dad.healthPoints}</div> 
                                        </div>`
                                        );
        });

    $("#instructions").show(); 

    //$(".characters").off("click");
    $(".characters").click(heroSelect);
    

};



// next, I need to update the DOM, depending on which character is chosen first
function heroSelect(){
    $("#instructions").hide();
    $("#announcement").hide();

    $("#hero").append ('<div class="title">Mighty Hero</div>'); 
    let dadID = $(this).attr("id");
    $.each(dads, function(cartoon, dad) {
        if (dadID!==dad.id){
            return;
        }
        $("#hero").append(`<div class="characters col-md-3" id="${dad.id}">
                                <div>${dad.firstName} ${dad.lastName}</div>
                                <img src="${dad.image}" style="width:100px; height:100px;"/>
                                <div class="healthpoints"> "HP: " ${dad.healthPoints}</div> 
                                </div>`
                                            );
        hpHero = dad.healthPoints;
        attackBase = dad.attackPower;
        attackCurrent = dad.attackPower;
        heroId = dad.id;
    });                                   

    $("#challengers").append ('<div class="title">Challengers</div>') 
    $.each(dads, function(cartoon, dad) {
        if (dadID==dad.id){
            return;
        }
        $("#challengers").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
                                        <div class="healthpoints"> "HP: " ${dad.healthPoints}</div> 
                                        </div>`
                                        );
    });

    $("#challengers .characters").click(selectDefender);
 

    $("#warriors").hide();
    $("#instructions").hide();

    $("#hero").show();
    $("#fightMode").show();
    $("#defender").show();
    $("#challengers").show();
    $("#updates").show();
};


function selectDefender() {

    let dadID = $(this).attr("id")
    $("#defender").append ('<div class="title">Defender</div>') 
    $.each(dads, function(cartoon, dad) {
        if (dadID!=dad.id){
            return;
        }
        $("#defender").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
                                        <div class="healthpoints"> "HP: " ${dad.healthPoints}</div> 
                                        </div>`
                                        );       
                                        
        hpAttacker = dad.healthPoints;
        counterAttack = dad.counterAttackPower;
        defenderName = dad.firstName + ' ' + dad.lastName;
        defenderId = dad.id;
    });

    $("#challengers").empty();
    $("#challengers").append ('<div class="title">Challengers</div>') 
    $.each(dads, function(cartoon, dad) {
        if (dadID==dad.id){
            return;
        }
        if (heroId==dad.id){
            return;
        }
        if ($.inArray(dad.id,defeatedDads) !== -1) {
            return;
        }
        $("#challengers").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
                                        <div class="healthpoints"> "HP: " ${dad.healthPoints}</div> 
                                        </div>`
                                        );
    });

    $("#challengers .characters").click(selectDefender);

    $("#fightMode").append(); 

    $("#attack").show(); 

    $("#attack").off("click");
    $("#attack").click(attackDefender);
}

function attackDefender() {



    $("#attackResult").html("You attacked " + defenderName + " for " + attackCurrent + "<br> " +
                              defenderName + " attacked you for " + counterAttack);

    hpAttacker -= attackCurrent ;
    hpHero -= counterAttack; 

    // defender
    $("#defender .healthpoints").html("HP: " + hpAttacker);

    //hero 
    $("#hero .healthpoints").html("HP: " + hpHero);

    if (hpHero <= 0) {
        heroDefeated();
        $("#attack").hide();
    }

    if (hpAttacker <= 0) {
        defenderDefeated(defenderName);
    }
    
    if(defeatedDads.length >= 3) {
        $("#attack").hide();
        $("#defTitle").show();
        $("#challengers").hide();
        $("#defender").hide();
        $("#attackResult").append(" You are the best cartoon dad with three fingers!!!")
    }

    attackCurrent += attackBase;

}


function heroDefeated() {
    $("#attackResult").append(". You have lost!");

    $("#fightMode").hide();
    $("#defender").hide();
    $("#challengers").hide();
    $("#defeated").hide();
    $("#defTitle").hide();
    $("#attack").hide();

    //hero 
    $("#hero .healthpoints").html("KO");

}

function defenderDefeated(dadName) {

    $("#defeated").show();
    $("#defTitle").show();

    defeatedDads.push(defenderId);
    //defeatedDads
    $("#attackResult").append(". " + dadName + " has lost!");
    $("#defeated").empty();

    $.each(dads, function(cartoon, dad) {
        if ($.inArray(dad.id,defeatedDads) == -1) {
            return;
        }
            
        $("#defeated").append(`<div class="characters col-md-3" id="${dad.id}">
                                        <div>${dad.firstName} ${dad.lastName}</div>
                                        <img src="${dad.image}" style="width:100px; height:100px;"/>
                                        <div class="healthpoints"> "KO" </div> 
                                        </div>`
                                );
    });

    $("#defender").empty();

}

function resetGame(firsttime = false){
    var hpHero = 0
    var attackBase = 0
    var attackCurrent = 0;
    var heroId = "";

    var hpAttacker = 0;
    var counterAttack = 0;
    var defeatedDads = [];

    $("#warriors").hide();
    $("#hero").hide();
    $("#fightMode").hide();
    $("#defender").hide();
    $("#challengers").hide();
    $("#defeated").hide();
    $("#defTitle").hide();
    $("#updates").hide();
    $("#instructions").hide();
    $("#announcement").hide();

    $("#warriors").empty();
    $("#hero").empty();
    $("#fightMode").empty();
    $("#defender").empty();
    $("#challengers").empty();
    $("#defeated").empty();
    $("#play").removeClass("disabled");

}

// now that I have the function to create a "badge" for each character,
// I need to create an event listner to initiate the function, if 
// the player decides to hit the "PLAY" button
$("#reset").click(function() {
    location.reload();
}); 

$("#play").click(revealWarriors);


// setup first game
resetGame();



























// dadSquad.forEach (i=0; i<dadSquad.length; i++){
//    log (dadSquad.firstName, dadSquad.lastName, dadSquad.Cartoon);
// };

// character(dadSquad);
// log(characters);
// log(character);

// then, I will need is a function to call on each character when he is selected
// this will be an onclick function using jQuery to create new divs in the HTML page


}); // end of document ready