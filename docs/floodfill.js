"use strict";

(() => {
    window.addEventListener("load", () => {
        // *****************************************************************************
        // #region Constants and Variables

        // Canvas references
        const canvas = document.querySelector("canvas");

        // UI references
        const restartButton = document.querySelector("#restart");
        const undoButton = document.querySelector('#undo');
        const rotateButton = document.querySelector('#rotate');
        const colorSelectButtons = document.querySelectorAll(".color-select");

        // Constants
        const CELL_COLORS = {
            white: [255, 255, 255],
            black: [0, 0, 0],
            red: [255, 0, 0],
            green: [0, 255, 0], 
            blue: [0, 0, 255]
        };
        const CELLS_PER_AXIS = 9;
        const CELL_WIDTH = canvas.width / CELLS_PER_AXIS;
        const CELL_HEIGHT = canvas.height / CELLS_PER_AXIS;
        const MAXIMUM_SCORE = CELLS_PER_AXIS * CELLS_PER_AXIS;

        // Game objects
        let replacementColor = CELL_COLORS.white;
        let grids;
        let playerScore = MAXIMUM_SCORE;

        // #endregion
        // *****************************************************************************
        // #region Game Logic

        function startGame() {
            let startingGrid = initializeGrid();
            if (startingGrid.length === 0) {
                startingGrid = initializeGrid();
            }
            initializeHistory(startingGrid);
            render(grids[0]);
        }

        function initializeGrid() {
            // Implementation here
        }

        function initializeHistory() {
            // Implementation here
        }

        function rollBackHistory() {
            // Implementation here
        }

        function transposeGrid() {
            // Implementation here
        }

        function render() {
            // Implementation here
        }

        function updateGridAt() {
            // Implementation here
        }

        function updatePlayerScore() {
            playerScore = playerScore > 0 ? playerScore -= 1 : 0;
        }

        function restart() {
            startGame(grids[0]);
        }

        // #endregion
        // *****************************************************************************
        // #region Event Listeners

        canvas.addEventListener("mousedown", gridClickHandler);
        function gridClickHandler(event) {
            updatePlayerScore();
            updateGridAt(event.offsetX, event.offsetY);
        }

        restartButton.addEventListener("mousedown", restartClickHandler);
        function restartClickHandler() {
            restart();
        }

        undoButton.addEventListener("mousedown", undoLastMove);
        function undoLastMove() {
            rollBackHistory();
        }

        rotateButton.addEventListener("mousedown", rotateGrid);
        function rotateGrid() {
            transposeGrid();
        }

        colorSelectButtons.forEach(button => {
            button.addEventListener("mousedown", () => replacementColor = CELL_COLORS[button.name]);
        });

        // #endregion
        // *****************************************************************************
        // #region Helper Functions

        function chooseRandomPropertyFrom(object) {
            const keys = Object.keys(object);
            return object[keys[Math.floor(keys.length * Math.random())]]; // Truncates to integer
        }

        function arraysAreEqual(arr1, arr2) {
            if (arr1.length != arr2.length) { return false; }
            else {
                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] != arr2[i]) {
                        return false;
                    }
                }
                return true;
            }
        }

        // #endregion

        // Start game
        startGame();
    });
})();