function newGameAutomated()
{
	for(var i = 0; i < 100; i++)
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
		var GameConfig = {
			Gameboard: convert2DArrayToString(board),
			Moves: convertArrayToString(computerMoves)
		}
		console.log(GameConfig.Gameboard);
		console.log(GameConfig.Moves);
		configs.push(GameConfig);
	}
}