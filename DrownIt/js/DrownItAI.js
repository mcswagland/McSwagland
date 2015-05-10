var LEVELS_AHEAD = 4; //how far to look ahead in the game tree for the AI... DEPTH. The algorithm will have 5^LEVELS_AHEAD nodes at the lowest level

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