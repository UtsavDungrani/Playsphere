document.addEventListener('DOMContentLoaded', () => {
    const content=document.getElementById("content");
    const squares=document.getElementsByClassName("square");

    const players=["X", "O"];
    let currentPlayer=players[0];
    let gameActive=true; // Variable to check if the game is still active

    let xWins=0; // Counter for X wins
    let oWins=0; // Counter for O wins

    const turnMessage=document.createElement("h2");
    turnMessage.textContent="X's turn";
    turnMessage.style.marginTop="20px";
    turnMessage.style.textAlign="center";

    const winCounter=document.createElement("h3");
    winCounter.textContent="X wins: "+xWins+" ,  O wins: "+oWins;
    winCounter.style.marginTop="10px";
    winCounter.style.textAlign="center";

    content.after(turnMessage);
    turnMessage.after(winCounter);

    const winningCombination=[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i=0;i<squares.length;i++) 
    {
        squares[i].addEventListener("click", () => {
            if(!gameActive || squares[i].textContent!='') 
            {
                return;
            }
            squares[i].textContent=currentPlayer;
            if(checkWin(currentPlayer)) 
            {
                turnMessage.textContent=currentPlayer+" wins!";
                updateWinCounter(currentPlayer); // Update win counter
                gameActive=false; // Disable further actions
                return;
            }
            if(checkTie()) 
            {
                turnMessage.textContent="Game is tied";
                gameActive=false; // Disable further actions
                return;
            }
            
            // Condition to change player
            if(currentPlayer===players[0]) 
            {
                currentPlayer = players[1];
                turnMessage.textContent=currentPlayer+"'s Turn!";
            } 
            else 
            {
                currentPlayer = players[0];
                turnMessage.textContent=currentPlayer+"'s Turn!";
            }
        });
    }

    function checkWin(currentPlayer) 
    {
        return winningCombination.some(combination => {
            const [a, b, c]=combination;
            return squares[a].textContent===currentPlayer && squares[b].textContent===currentPlayer &&squares[c].textContent===currentPlayer;
        });
    }

    function checkTie() 
    {
        return Array.from(squares).every(square => square.textContent!="");
    }

    const updateWinCounter=player => {
        if(player==="X") 
        {
            xWins++;
        } 
        else 
        {
            oWins++;
        }
        winCounter.textContent="X wins: "+xWins+",  O wins: "+oWins;
    };

    document.getElementById("btn_restart").addEventListener("click", restartButton);

    function restartButton() 
    {
        Array.from(squares).forEach(square => square.textContent="");
        turnMessage.textContent="X's turn";
        currentPlayer=players[0];
        gameActive=true; // Reactivate the game
    }
});
