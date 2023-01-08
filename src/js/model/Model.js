/***
 * @author CELESTINE
 * 
 * @MODEL (MVC)
 * this file is responsible for handling game data to be used by the @CONTROLLER
 * to populate the @VIEW 
 * this also serves as the SINGLE SORCE of TRUTH
 *  meaning that any changes made to the model affects the VIEW
 */


// INITIAL STATE of the game 
const initialState = {
    settings: {
        player2: 'human',
        botDifficulty: 'easy',
        grids: 3
    },
    score: {
        X: 0,
        O: 0
    },
    plays: {
        all: new Array(9).fill(null),
        X: [],
        O: []
    },
    currentPlayer: 'X',
}


// DATA
// state variable is the variable that holds the overall state
export let state = JSON.parse(JSON.stringify(initialState));


/**
 * @function writeState
 * 
 * this method accepts one parameter
 * @param {Object} data 
 * and uses the collected data to set the overall state of the game
 * based off of a previously saved game 
 *
 */
export const writeState = (data) => {
    if(!data) return;
    state = JSON.parse(JSON.stringify(data));
}

/**
 * @function resetState
 * 
 * this method resets the game state's score, plays, and currentPlayer
 * back to default, except for plays array which is created based on the
 * current grid the player is on  
 */
export const resetState = () => {
    state = {
        ...state,
        score: {
            X: 0,
            O: 0
        },
        plays: {
            all: new Array(Math.pow(state.settings.grids, 2)).fill(null),
            X: [],
            O: []
        },
        currentPlayer: 'X',
    }
}

/**
 * @function restartState
 * 
 * this method resets the game state's plays, and currentPlayer
 * back to default, except for plays array which is created based on the
 * current grid the player is on  
 */
export const restartState = () => (state = {
    ...state,
    plays: {
        all: new Array(Math.pow(state.settings.grids, 2)).fill(null),
        X: [],
        O: []
    },
    currentPlayer: 'X',
});


/**
 * @function updateSettingState
 * 
 * this method accepts one argument 
 * @param {Object} newStateData 
 * the data recieved is used to update the settings 
 * data in the overall state
 */
export const updateSettingState = (newStateData) => {
    for (const key in newStateData) {
        state.settings[key] = newStateData[key];
    }

    state.plays.all = new Array(Math.pow(newStateData.grids, 2)).fill(null);
}



/**
 * @function getData
 * 
 * this method is a @getter method
 * @returns {Object} a destructured version and shallow copy of the overall state
 */
export const getData = () => ({ ...state });


/**
 * @function updateScore
 * 
 * this method updates the score based on the current player
 */
export const updateScore = () => {
    state.score[state.currentPlayer]++;
}


// PLAY
/**
 * @function addPlay
 * 
 * this method has one parameter
 * @param {Number} index 
 * @returns {Boolean} true if play was added successfully
 * after index validation
 * false if the validation condition is not met 
 */
export const addPlay = (index) => {
    if (state.plays.all[index] === null) {
        state.plays.all[index] = state.currentPlayer;
        state.plays[state.currentPlayer].push(index);
        return true;
    }

    return false;

}



/**
 * @function checkWinner
 * 
 * this method
 * @returns {Boolean}
 * after checking the wining combination multidimentional array
 * has an array that has matching values as the current user plays
 * stored in the overall state
 */
export const checkWinner = () => {
    let winningCombination;


    if (state.settings.grids === 3) {
        winningCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

    } else {
        winningCombination = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
            [0, 4, 8, 12],
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],
            [0, 5, 10, 15],
            [3, 6, 9, 12],
        ];
    }



    return winningCombination.some(combination => {
        return combination.every(index => {
            return state.plays[state.currentPlayer].includes(index);
        });
    });
}




/**
 * @function checkDraw
 * 
 * this method checks to find out if there is a Draw
 * by checking if all the free slots have been used
 * @returns {Boolean}
 */
export const checkDraw = () => state.plays.all.every(play => play !== null);





/**
 * @function switchCurrentPlayer
 * 
 * this method switches the current player when called
 */
export const switchCurrentPlayer = () => {
    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
}