function newGameAutomated()
{
	for(var count = 0; count < 100; count++)
	{
		numMoves = 0;
		MAX_MOVES = 100;
		computerMoves = [];
		
		computerPlaying = false;
		
		//$("#board").empty();
		pool = [];
		for(var i = 0; i < BOARD_SIZE; i++)
		{
			for(var j = 0; j < BOARD_SIZE; j++)
			{
				board[i][j] = Math.floor(Math.random() * NUM_COLORS);
				//board[i][j] = convertStringTo2DArray(configs[count].Gameboard)[i][j];
			}
		}
		copyBoardToOriginalBoard();
		updateBoard();
		fillColors(board[0][0], {x: 0, y: 0});
		visited = [];
		lastMove = board[0][0];
		computerPlay(LEVELS_AHEAD);
		tryAgain();
		var GameConfig = {
			Gameboard: convert2DArrayToString(board),
			Moves: convertArrayToString(computerMoves)
		}
		console.log(GameConfig.Gameboard);
		console.log(GameConfig.Moves);
	}
}