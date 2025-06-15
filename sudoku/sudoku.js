document.addEventListener("DOMContentLoaded", function () {
    const sudokuContainer=document.getElementById("sudoku");
    const submitButton=document.getElementById("submit");
    const playAgainButton=document.getElementById("play-again");
    let solutionPuzzle;

    function generateRandomPuzzle() 
    {
        const puzzle=Array.from({ length: 9 }, () => Array(9).fill(0));

        function fillBox(row,col) 
        {
            let num;
            for(let i=0;i<3;i++) 
            {
                for(let j=0;j<3;j++) 
                {
                    do 
                    {
                        num=Math.floor(Math.random()*9) + 1;
                    }while(!isSafeToPlace(puzzle,row + i,col + j,num));
                    puzzle[row + i][col + j]=num;
                }
            }
        }

        // Fill the diagonal 3x3 boxes
        for(let i=0;i<9;i+=3) 
        {
            fillBox(i, i);
        }   

        // Submit the partially filled grid to generate a complete solution
        submitSudoku(puzzle);

        // Copy the solution to solutionPuzzle
        solutionPuzzle=JSON.parse(JSON.stringify(puzzle));

        // Number of cells to be removed for difficulty
        const difficulty=40;

        for(let i=0;i<difficulty;i++) 
        {
            let row, col;
            do 
            {
                row=Math.floor(Math.random()*9);
                col=Math.floor(Math.random()*9);
            }while(puzzle[row][col]===0);
            puzzle[row][col]=0;
        }

        return puzzle;
    }

    function isSafeToPlace(board, row, col, num) 
    {
        for(let x=0;x<9;x++) 
        {
            if(board[row][x]===num || board[x][col]===num || board[3*Math.floor(row/3) + Math.floor(x/3)][3*Math.floor(col/3) + x % 3]===num) 
            {
                return false;
            }
        }
        return true;
    }

    function renderPuzzle(puzzle) 
    {
        sudokuContainer.innerHTML="";
        for(let row=0;row<9;row++) 
        {
            for(let col=0;col<9;col++) 
            {
                const cell=document.createElement("div");
                cell.className="cell";
                const input=document.createElement("input");
                input.type="text";
                input.maxLength=1;
                input.value=puzzle[row][col]===0 ? "" : puzzle[row][col];
                input.disabled=puzzle[row][col]!=0;

                // Add event listener to ensure only numbers 1-9 can be entered
                input.addEventListener("input", function () {
                    if(!/^[1-9]$/.test(input.value)) 
                    {
                        input.value="";
                    }
                });

                // Add event listener to check if the move is correct
                input.addEventListener("blur", function () 
                {
                    const value=parseInt(input.value, 10);
                    if(value && value!=solutionPuzzle[row][col]) 
                    {
                        input.style.backgroundColor="red";
                        input.style.color="white";
                        alert("Wrong move!");
                        
                        // Remove blur event listener temporarily
                        input.removeEventListener("blur", arguments.callee);
                        
                        // Focus on the input field after the alert is dismissed
                        input.focus();
                        
                        // Reattach the blur event listener after a short delay
                        setTimeout(() => {
                            input.addEventListener("blur", arguments.callee);
                        }, 100);
                    } 
                    else 
                    {
                        input.style.backgroundColor="";
                        input.style.color="";
                    }
                });

                cell.appendChild(input);
                sudokuContainer.appendChild(cell);
            }
        }
    }

    function submitSudoku(board) 
    {
        for(let row=0;row<9;row++) 
        {
            for(let col=0;col<9;col++)
            {
                if(board[row][col]===0) 
                {
                    for(let num=1;num<=9;num++) 
                    {
                        if(isSafeToPlace(board, row, col, num)) 
                        {
                            board[row][col]=num;
                            if(submitSudoku(board)) 
                            {
                                return true;
                            }
                            board[row][col]=0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    // function displaySolution(solution) 
    // {
    //     const inputs=document.querySelectorAll(".cell input");
    //     for(let row=0;row<9;row++) 
    //     {
    //         for(let col=0;col<9;col++) 
    //         {
    //             inputs[row*9 + col].value=solution[row][col];
    //         }
    //     }
    // }

    function checkWin() 
    {
        const inputs=document.querySelectorAll(".cell input");
        for(let row=0;row<9;row++) 
        {
            for(let col=0;col<9;col++) 
            {
                if(parseInt(inputs[row*9 + col].value, 10)!=solutionPuzzle[row][col]) 
                {
                    return false;
                }
            }
        }
        return true;
    }

    submitButton.addEventListener("click", function () {
        if(checkWin()) 
        {
            const inputs=document.querySelectorAll(".cell input");
            inputs.forEach(input => {
                input.style.backgroundColor="green";
                input.style.color="white";
            });
            alert("You win!");
        } 
        else 
        {
            alert("You can't submit before solving. Keep trying!");
        }
    });

    playAgainButton.addEventListener("click", function () {
        currentPuzzle=generateRandomPuzzle();
        renderPuzzle(currentPuzzle);
    });

    // Initialize the first puzzle
    let currentPuzzle=generateRandomPuzzle();
    renderPuzzle(currentPuzzle);
});