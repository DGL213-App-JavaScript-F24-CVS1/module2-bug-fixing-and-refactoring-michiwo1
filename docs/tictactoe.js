"use strict";

(() => {
    window.addEventListener("load", () => {
        // *****************************************************************************
        // #region Constants and Variables

        // Canvas references
        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");

        // UI references
        const restartButton = document.querySelector("#restart");
        const undoButton = document.querySelector("#undo");
        const currentPlayerSpan = document.querySelector("#current-player");
        const statusMessage = document.querySelector("#status-message");

        // Constants
        const CELLS_PER_AXIS = 3;
        const CELL_WIDTH = canvas.width / CELLS_PER_AXIS;
        const CELL_HEIGHT = canvas.height / CELLS_PER_AXIS;

        // Game variables
        let grids;
        let currentPlayer = "X";
        let gameActive = true;
        let moveHistory = [];

        // #endregion

        // *****************************************************************************
        // #region Game Logic

        function startGame() {
            initializeGrid();
            gameActive = true;
            currentPlayer = "X";
            moveHistory = [];
            updateTurnIndicator();
            statusMessage.textContent = "";
            render();
        }

        function initializeGrid() {
            grids = [];
            const startingGrid = Array(CELLS_PER_AXIS * CELLS_PER_AXIS).fill("");
            grids.push(startingGrid);
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid lines
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            for (let i = 1; i < CELLS_PER_AXIS; i++) {
                // Vertical lines
                ctx.beginPath();
                ctx.moveTo(i * CELL_WIDTH, 0);
                ctx.lineTo(i * CELL_WIDTH, canvas.height);
                ctx.stroke();

                // Horizontal lines
                ctx.beginPath();
                ctx.moveTo(0, i * CELL_HEIGHT);
                ctx.lineTo(canvas.width, i * CELL_HEIGHT);
                ctx.stroke();
            }

            // Draw marks
            const grid = grids[grids.length - 1];
            for (let i = 0; i < grid.length; i++) {
                const mark = grid[i];
                if (mark !== "") {
                    const x = (i % CELLS_PER_AXIS) * CELL_WIDTH;
                    const y = Math.floor(i / CELLS_PER_AXIS) * CELL_HEIGHT;
                    drawMark(mark, x, y);
                }
            }
        }

        function drawMark(mark, x, y) {
            ctx.font = "80px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.fillText(
                mark,
                x + CELL_WIDTH / 2,
                y + CELL_HEIGHT / 2
            );
        }

        function updateGridAt(mouseX, mouseY) {
            if (!gameActive) return;

            const gridCoordinate = convertCartesiansToGrid(mouseX, mouseY);
            const index =
                gridCoordinate.row * CELLS_PER_AXIS + gridCoordinate.column;
            const grid = grids[grids.length - 1].slice();

            if (grid[index] !== "") {
                // Cell already occupied
                return;
            }

            grid[index] = currentPlayer;
            grids.push(grid);
            moveHistory.push(index);
            render();

            if (checkWin(grid, currentPlayer)) {
                statusMessage.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                return;
            }

            if (isDraw(grid)) {
                statusMessage.textContent = "It's a draw!";
                gameActive = false;
                return;
            }

            // Switch player
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnIndicator();
        }

        function updateTurnIndicator() {
            currentPlayerSpan.textContent = currentPlayer;
        }

        function undoLastMove() {
            if (moveHistory.length === 0 || !gameActive) return;

            // Remove last move
            moveHistory.pop();
            grids.pop();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnIndicator();
            statusMessage.textContent = "";
            gameActive = true;
            render();
        }

        function checkWin(grid, player) {
            const winConditions = [
                // Rows
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                // Columns
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                // Diagonals
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (let i = 0; i < winConditions.length; i++) {
                const [a, b, c] = winConditions[i];
                if (grid[a] === player && grid[b] === player && grid[c] === player) {
                    return true;
                }
            }
            return false;
        }

        function isDraw(grid) {
            for (let i = 0; i < grid.length; i++) {
                if (grid[i] === "") {
                    return false;
                }
            }
            return true;
        }

        // #endregion

        // *****************************************************************************
        // #region Event Listeners

        canvas.addEventListener("mousedown", gridClickHandler);
        function gridClickHandler(event) {
            if (!gameActive) return;
            updateGridAt(event.offsetX, event.offsetY);
        }

        restartButton.addEventListener("mousedown", restartClickHandler);
        function restartClickHandler() {
            startGame();
        }

        undoButton.addEventListener("mousedown", undoLastMove);

        // #endregion

        // *****************************************************************************
        // #region Helper Functions

        // Convert canvas coordinates to grid coordinates
        function convertCartesiansToGrid(xPos, yPos) {
            return {
                column: Math.floor(xPos / CELL_WIDTH),
                row: Math.floor(yPos / CELL_HEIGHT),
            };
        }

        // #endregion

        // Start game
        startGame();
    });
})();