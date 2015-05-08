	var BOARD_SIZE = 12;
	var NUM_COLORS = 6;
	var MAX_MOVES = 100;//arbitrarily large number, for the purpose of the AI being able to run through the board in "any" number of moves
	var EASY_MOVES = 25;
	var MEDIUM_MOVES = 30;
	var HARD_MOVES = 35;
	var LEVELS_AHEAD = 4; //how far to look ahead in the game tree for the AI... DEPTH. The algorithm will have 5^LEVELS_AHEAD nodes at the lowest level
	
	//computer player variables
	var computerMoves = [];
	var numNodes = 0;
	var index = 0;
	var timerEvent;
	var computerPlaying = false;

	//constant number value representations of colors
	var blue = 0;
	var red = 1;
	var green = 2;
	var yellow = 3;
	var purple = 4;
	var orange = 5;
	var pool = new Array();
	var visited = new Array();
	var numMoves = 0;
	var lastMove = -1;
	
	var board;
	var originalBoard;
	
	$(window).load(function(){
		initializeBoard();
		openLoadingDialog();
		setTimeout(newGame, 0);
		setTimeout(closeLoadingDialog, 0);
		setTimeout(function(){$("#gameElements").css('display', 'inline');}, 0);
		setTimeout(function(){$("#Dashboard").css("left", $("#board").position().left - $("#Dashboard").width() - $("#Dashboard").position().left - 50 + "px");}, 0);
	});
	
	window.onresize = function(){
		moveDashboard();
	}
	
	$("#blue").click(function(){
		if(!gameOver() && lastMove != blue && !computerPlaying)
		{
			changePoolColor(blue);
			fillColors(blue, {x: 0, y: 0});
			numMoves++;
			updateBoard();
			visited = [];
			lastMove = blue;
		}
	});
	
	$("#red").click(function(){
		if(!gameOver() && lastMove != red && !computerPlaying)
		{
			changePoolColor(red);
			fillColors(red, {x: 0, y: 0});
			numMoves++;
			updateBoard();
			visited = [];
			lastMove = red;
		}
	});
	
	$("#green").click(function(){
		if(!gameOver() && lastMove != green && !computerPlaying)
		{
			changePoolColor(green);
			fillColors(green, {x: 0, y: 0});
			numMoves++;
			updateBoard();
			visited = [];
			lastMove = green;
		}
	});
	
	$("#yellow").click(function(){
		if(!gameOver() && lastMove != yellow && !computerPlaying)
		{
			changePoolColor(yellow);
			fillColors(yellow, {x: 0, y: 0});
			numMoves++;
			updateBoard();
			visited = [];
			lastMove = yellow;
		}
	});
	
	$("#purple").click(function(){
		if(!gameOver() && lastMove != purple && !computerPlaying)
		{
			changePoolColor(purple);
			fillColors(purple, {x: 0, y: 0});
			numMoves++;
			updateBoard();
			visited = [];
			lastMove = purple;
		}
	});
	
	$("#orange").click(function(){
		if(!gameOver() && lastMove != orange && !computerPlaying)
		{
			changePoolColor(orange);
			fillColors(orange, {x: 0, y: 0});
			numMoves++;
			updateBoard();
			visited = [];
			lastMove = orange;
		}
	});
	
	$(".gamebutton").click(function(){
		if(playerWon())
		{
			$("#winningMoves").text(numMoves);
			openWinningDialog();
		}
		else if(playerLost())
		{
			$("#losingDialog").dialog({
				resizable: false,
				modal: true, 
				title: "Game Over",
				height: "auto",
				width: 300,
				buttons: {
					"Try Again": function () {
						tryAgain();
						$(this).dialog('close');
					},
						"New Game": function () {
						$(this).dialog('close');
						openLoadingDialog();
						setTimeout(newGame, 0);
						setTimeout(closeLoadingDialog, 0);
					}
				}
			});
		}
	});
	
	$("#DifficultyDropdown").change(function(){
		if($("#easy").is(':selected'))
		{
			MAX_MOVES = computerMoves.length + Number($("#easy").val());
		}
		else if($("#medium").is(':selected'))
		{
			MAX_MOVES = computerMoves.length + Number($("#medium").val());
		}
		else if($("#hard").is(':selected'))
		{
			MAX_MOVES = computerMoves.length + Number($("#hard").val());
		}
		$(".MAX_MOVES").text(MAX_MOVES);
		tryAgain();
	});
	
	$("#MobileDifficultyDropdown").change(function(){
		if($("#mobileEasy").is(':selected'))
		{
			MAX_MOVES = computerMoves.length + Number($("#mobileEasy").val());
		}
		else if($("#mobileMedium").is(':selected'))
		{
			MAX_MOVES = computerMoves.length + Number($("#mobileMedium").val());
		}
		else if($("#mobileHard").is(':selected'))
		{
			MAX_MOVES = computerMoves.length + Number($("#mobileHard").val());
		}
		$(".MAX_MOVES").text(MAX_MOVES);
		tryAgain();
	});
	
	$("#newGame").click(function(){
		clearInterval(timerEvent);
		openLoadingDialog();
		setTimeout(newGame, 0);
		setTimeout(closeLoadingDialog, 0);
	});
	
	$("#computerSolution").click(function(){
		tryAgain();
		setTimeout(showSolution, 0);
	});
	
	$("#tryAgain").click(tryAgain);
	
	function initialGame()
	{
		numMoves = 0;
		MAX_MOVES = 100;
		computerMoves = [];
		
		computerPlaying = false;
		
		$("#board").empty();
		pool = [];
		createNewBoard();
		initializeOriginalBoard();
		updateBoard();
		fillColors(board[0][0], {x: 0, y: 0});
		visited = [];
		lastMove = board[0][0];
	}
	
	function newGame()
	{	
		numMoves = 0;
		MAX_MOVES = 100;
		computerMoves = [];
		
		computerPlaying = false;
		
		$("#board").empty();
		pool = [];
		createNewBoard();
		initializeOriginalBoard();
		updateBoard();
		fillColors(board[0][0], {x: 0, y: 0});
		visited = [];
		lastMove = board[0][0];
		computerPlay(LEVELS_AHEAD);
		
		tryAgain();
		if($("#easy").is(':selected'))
		{
			MAX_MOVES = computerMoves.length + Number($("#easy").val());
		}
		else if($("#medium").is(':selected'))
		{
			MAX_MOVES = computerMoves.length + Number($("#medium").val());
		}
		else if($("#hard").is(':selected'))
		{
			MAX_MOVES = computerMoves.length + Number($("#hard").val());
		}
		$(".MAX_MOVES").text(MAX_MOVES);
	}
	
	function openLoadingDialog()
	{
		$("#loadingDialog").dialog({
			closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide();},
			resizable: false,
			modal: true, 
			title: "Loading",
			height: "auto",
			width: 300
		});
	}
	
	function closeLoadingDialog()
	{
		$("#loadingDialog").dialog('close');
	}
	
	function openWinningDialog()
	{
		$("#winningDialog").dialog({
			resizable: false,
			modal: true, 
			title: "You Won!",
			height: "auto",
			width: 300,
			buttons: {
				"Try Again": function () {
					tryAgain();
					$(this).dialog('close');
				},
					"New Game": function () {
					$(this).dialog('close');
					openLoadingDialog();
					setTimeout(newGame, 0);
					setTimeout(closeLoadingDialog, 0);
				}
			}
		});
	}
	
	function moveDashboard()
	{
		$("#Dashboard").css("left", $("#board").position().left - $("#Dashboard").width() - 50 + "px");
	}
	
	function tryAgain()
	{
		clearInterval(timerEvent);
		computerPlaying = false;
		numMoves = 0;
		pool = [];
		visited = [];
		restoreBoard();
		updateBoard();
		fillColors(board[0][0], {x: 0, y: 0});
		visited = [];
		lastMove = board[0][0];
	}
	
	function createNewBoard()
	{
		for(var i = 0; i < BOARD_SIZE; i++)
		{
			for(var j = 0; j < BOARD_SIZE; j++)
			{
				board[i][j] = Math.floor(Math.random() * NUM_COLORS);
			}
		}
		
		for(var i = 0; i < BOARD_SIZE; i++)
		{
			$("#board").append("<tr id = 'row" + i + "'>");
			var rowHtml = "";
			for(var j = 0; j < BOARD_SIZE; j++)
			{
				rowHtml += "<td id = '" + i + "-" + j + "' class = 'piece'></td>";
			}
			$("#row" + i).append(rowHtml);
		}
	}
	
	function initializeBoard()
	{
		board = new Array(BOARD_SIZE);//[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
		originalBoard = new Array(BOARD_SIZE);
		for(var i = 0; i < BOARD_SIZE; i++)
		{
			board[i] = new Array(BOARD_SIZE);
			originalBoard[i] = new Array(BOARD_SIZE);
			for(var j = 0; j < BOARD_SIZE; j++)
			{
				board[i][j] = 0;
				originalBoard[i][j] = 0;
			}
		}
	}
	
	function initializeOriginalBoard()
	{
		for(var i = 0; i < BOARD_SIZE; i++)
		{
			for(var j = 0; j < BOARD_SIZE; j++)
			{
				originalBoard[i][j] = board[i][j];
			}
		}
	}
	
	function restoreBoard()
	{
		for(var i = 0; i < BOARD_SIZE; i++)
		{
			for(var j = 0; j < BOARD_SIZE; j++)
			{
				board[i][j] = originalBoard[i][j];
			}
		}
	}
	
	function updateBoard()
	{
		for(var i = 0; i < BOARD_SIZE; i++)
		{
			for(var j = 0; j < BOARD_SIZE; j++)
			{
				$("#" + i + "-" + j).css("background-color", numberToColor(board[i][j]));
			}
		}
		
		$(".moves").text(numMoves);
	}
	
	function numberToColor(number)
	{
		var result;
		if(number == 0)
		{
			result = "blue";
		}
		else if(number == 1)
		{
			result = "red";
		}
		else if (number == 2)
		{
			result = "#4CBB17";
		}
		else if (number == 3)
		{
			result = "yellow";
		}
		else if (number == 4)
		{
			result = "purple";
		}
		else
		{
			result = "orange";
		}
		
		return result;
	}
	
	function containsPoint(point, arr)
	{
		var result = false;
		for(var i = 0; i < arr.length; i++)
		{
			if(point.x == arr[i].x && point.y == arr[i].y)
			{
				result = true;
			}
		}
		
		return result;
	}
	
	function fillColors(color, point)
	{
		board[point.y][point.x] = color;
		visited.push({x: point.x, y: point.y});
		if(!containsPoint({x: point.x, y: point.y}, pool))
		{
			pool.push(point);
		}
		//up
		if(point.y != 0)
		{
			if(board[point.y-1][point.x] == color && !containsPoint({x:point.x, y: point.y-1}, visited))
			{
				fillColors(color, {x: point.x, y: point.y-1});
			}
		}
		//down
		if(point.y != BOARD_SIZE-1)
		{
			if(board[point.y+1][point.x] == color && !containsPoint({x:point.x, y: point.y+1}, visited))
			{
				fillColors(color, {x: point.x, y: point.y+1});
			}
		}
		//left
		if(point.x != 0)
		{
			if(board[point.y][point.x-1] == color && !containsPoint({x:point.x-1, y: point.y}, visited))
			{
				fillColors(color, {x: point.x-1, y: point.y});
			}
		}
		//right
		if(point.x != BOARD_SIZE-1)
		{
			if(board[point.y][point.x+1] == color && !containsPoint({x:point.x+1, y: point.y}, visited))
			{
				fillColors(color, {x: point.x+1, y: point.y});
			}
		}
	}
	
	function changePoolColor(color)
	{
		for(var i = 0; i < pool.length; i++)
		{
			board[pool[i].y][pool[i].x] = color;
		}
	}
	
	function gameOver()
	{
		var result = false;
		if(playerWon() || playerLost())
		{
			result = true;
		}
	
		return result;
	}
	
	function playerWon()
	{
		var result = false;
		if(pool.length == BOARD_SIZE * BOARD_SIZE)
		{
			result = true;
		}
		return result;
	}
	
	function playerLost()
	{
		var result = false;
		if(numMoves == MAX_MOVES && !playerWon())
		{
			result = true;
		}
		return result;
	}
	
	/* AI Implementation */
	
	function computerPlay(levelsForward)
	{
		var computerMove;
		while(!gameOver())
		{
			computerMove = lookAhead(0,levelsForward);
			computerMoves.push(computerMove.move);
			changePoolColor(computerMove.move);
			fillColors(computerMove.move, {x: 0, y: 0});
			numMoves++;
			updateBoard();
			visited = [];
		}
	}
	
	function lookAhead(level, finalLevel)
	{
		var play = new Object();
		var lastComputerMove = board[0][0];
		if(level == finalLevel)
		{
			play.score = pool.length;
			play.level = level;
			return play;
		}
		else
		{	
			var poolAtThisLevel = pool.slice(0);
			var boardAtThisLevel = new Array();
			for(var i = 0; i < BOARD_SIZE; i++)
			{
				boardAtThisLevel[i] = new Array();
				boardAtThisLevel[i] = board[i].slice(0);
			}
			var maxScore = 0;
			var bestMove = 0;
			var highScoreLevel = finalLevel;
			for(var i = 0; i < NUM_COLORS; i++)
			{
				if(i != lastComputerMove)
				{
					numNodes++;
					changePoolColor(i);
					fillColors(i, {x: 0, y: 0});
					visited = [];
					if(!gameOver())
					{
						play = lookAhead(level+1, finalLevel);
					}
					else
					{
						play.score = pool.length;
						play.level = level;
					}
					if(play.score > maxScore || (play.score == maxScore && play.level < highScoreLevel))
					{
						maxScore = play.score;
						highScoreLevel = play.level;
						bestMove = i;
					}
					pool = poolAtThisLevel.slice(0);
					for(var j = 0; j < BOARD_SIZE; j++)
					{
						board[j] = boardAtThisLevel[j].slice(0);
					}
				}
			}
			play.score = maxScore;
			play.move = bestMove;
			play.level = highScoreLevel;
			return play;
		}
	}
	
	function showSolution()
	{
		index = 0;
		computerPlaying = true;
		timerEvent = setInterval(makeComputerMove, 1500, index);
	}
		
	function makeComputerMove()
	{
		changePoolColor(computerMoves[index]);
		fillColors(computerMoves[index], {x: 0, y: 0});
		numMoves++;
		updateBoard();
		visited = [];
		index++;
		if(index == computerMoves.length)
		{
			computerPlaying = true;
			clearInterval(timerEvent);
			//I dont like the placement of this, but it seems to be the easiest spot to put it in order to force script execution order
			$("#transitionDialog").dialog({
				resizable: false,
				modal: true, 
				height: "auto",
				width: 300,
				buttons: {
					"Try Again": function () {
						tryAgain();
						$(this).dialog('close');
					},
						"New Game": function () {
						$(this).dialog('close');
						openLoadingDialog();
						setTimeout(newGame, 0);
						setTimeout(closeLoadingDialog, 0);
					}
				}
			});
		}
	}