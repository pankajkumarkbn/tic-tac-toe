/*Global variables*/
var played = [];
var turn = 0 ; 
var gameFinished =1;

var debug = function(log){
	/*set to false to stop debug*/
	if (true) {
		console.log(log);
	};
};

function Player (name) {
	this.name = name ;
	this.moves = new Array() ;
};

//p1 = new Player(prompt("Enter first player's name !"));
//p2 = new Player(prompt("Enter second player's name !"));

p1 = new Player("Player1");
p2 = new Player("Player2");

var ifNotPresent = function (cellID) {
	for (var i = 0; i < played.length ; i++) {
		if(played[i]===cellID){
			return false;
		}
	}
	played[played.length]=cellID;
	if (!turn) {p1.moves[p1.moves.length]=cellID;} 
	else {p2.moves[p2.moves.length]=cellID};
	return true;
};

var find = function(A,m1){
	var r = A.indexOf(m1) > -1;
	//debug(A + " -> " + m1 + " = "+ r);
    return (r);
};

var checkMoves = function(A, m1, m2, m3){
	if (!find(A,m1)) {return false};
	if (!find(A,m2)) {return false};
	if (!find(A,m3)) {return false};
	return true;
};

var checkSequences = function (P1) {
	/*check if any one of eight combination has been 
	fullfilled*/
	if(checkMoves(P1.moves, "a1", "a2", "a3")){return true;}
	if(checkMoves(P1.moves, "b1", "b2", "b3")){return true;}
	if(checkMoves(P1.moves, "c1", "c2", "c3")){return true;}
	if(checkMoves(P1.moves, "a1", "b1", "c1")){return true;}
	if(checkMoves(P1.moves, "a2", "b2", "c2")){return true;}
	if(checkMoves(P1.moves, "a3", "b3", "c3")){return true;}
	if(checkMoves(P1.moves, "a1", "b2", "c3")){return true;}
	if(checkMoves(P1.moves, "a3", "b2", "c1")){return true;}
	return false;
}

var checkForWinner = function(){
	if (checkSequences(p1)) {$('#title').prepend(
		"<div id=\'title\'>"+p1.name+" won!</div>")
		gameFinished = 0};
	if (checkSequences(p2)) {$('#title').prepend(
		"<div id=\'title\'>"+p2.name+" won!</div>")
		gameFinished = 0};	
};
jQuery(document).ready(function($) {
	$('.cell').click(function(){
		if (ifNotPresent(this.id) && gameFinished){
			if (turn) {
				$(this).append("<img src=\'circle.png\' id=\'symbol\'>");
				turn = 0 ;
			} else{
				turn = 1 ;
				$(this).append("<img src=\'cross.png\' id=\'symbol\'>");
			}
			checkForWinner();
		}
	});
	
});

