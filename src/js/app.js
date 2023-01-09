/***
 * @author CELESTINE
 * 
 * @CONTROLLER (MVC)
 * this file is responsible for handling event listeners
 * as well as manipulating the @MODEL and different @VIEWS 
 * based off of data gotten from the model 
 */

import GameView from "./view/GameView";
import HomeView from "./view/HomeView";
import SettingFormView from "./view/SettingFormView";
import SettingView from "./view/SettingView";

import * as Model from './model/Model';
import ModalView from "./view/ModalView";
import Bot from "./util/Bot";


/**
 * @function handleNewGame
 * 
 * This method resets the current game
 * by calling the @function resetState method found in the MODEL
 * finally it re-draws the View 
 * based on data gotten from the MODEL's @function getData method
 * N.B this reset's the whole gameState  
 */

const handleNewGame = () => {
    Model.resetState();
    const data = Model.getData()

    GameView.render(data);
    GameView.openGameView(true);

}





/***
 * @function handleResumeGame
 * 
 * This method resumes a previously saved game
 * by getting the game stored in LocalStorage by the name of gameState,
 * using the fetched data to resign the game currentState in the MODEL
 * finally it re-draws the View 
 * based on data gotten from the MODEL's @function getData method
 */

const handleResumeGame = () => {
    const savedState = JSON.parse(localStorage.getItem('gameState'));
    if (!savedState) {
        showModal({
            title: 'No saved game found!'
        })
        return;
    }

    Model.writeState(savedState);
    const data = Model.getData()
    GameView.render(data);
    GameView.openGameView(true);
}





/**
 * @function handleSaveGame
 * 
 * This method saves the current game state
 * in LocalStorage by the name of gameState,
 * then once this is successful 
 * it shows a modal that states that it was successful by calling the
 * @function showModal
 */

const handleSaveGame = () => {
    const currentGameState = Model.getData();
    localStorage.setItem('gameState', JSON.stringify(currentGameState));
    showModal({
        title: `Game saved successfully!!`
    });
}




/***
 * @function handleRestartGame
 * 
 * This method resets the current game
 * by calling the @function restartState method found in the MODEL
 * and the @function restartState method found in the @class BOT
 * finally it re-draws the View 
 * based on data gotten from the MODEL's @function getData method
 * N.B this reset's the whole gameState except the score  
 */

const handleRestartGame = () => {
    Model.restartState();
    const data = Model.getData()
    GameView.render(data);
    Bot.resetState(data)

}






/**
 * @function handleOpenSettings
 * 
 * this method accepts one parameter
 * @param {boolean} bool 
 * it then uses that parameter to either reveal or hide the settings menu
 * by passing it to the VIEW @function handleSettingViewOpen
 */

const handleOpenSettings = (bool) => {
    SettingView.handleSettingViewOpen(bool);
}





/**
 * @function handleSettingSave
 * 
 * this method accepts one parameter 
 * @param {Object} newSettingData 
 * and uses the data from the parameter to update the settings state data
 * in the MODEL by calling @function updateSettingState (MODEL)
 * and @function updateState (BOT)
 */

const handleSettingSave = (newSettingData) => {
    Model.updateSettingState(newSettingData);
    Bot.updateState();

}






/**
 * @function handleBackButtonPressed
 * 
 * this method hides the current game view by setting
 * @function openGameView (GAME-VIEW) to false
 * 
 */
const handleBackButtonPressed = () => {
    GameView.openGameView(false);
}






/**
 * @function updateView
 * 
 * this method's only job is to update the View @function update (GAME-VIEW)
 * with data gotten from the model @function getData (MODEL)
 */

const updateView = () => {
    let data = Model.getData();
    GameView.update(data);
}






/**
 * @function makePlay
 * 
 * this method has one parameter
 * @param {Number} boxIndex 
 * which represents an index that can be used to make a play by either the player or a BOT
 * it does this by passing the index to @function play  
 */

const makePlay = (boxIndex) => {
    const isBotTurn = play(boxIndex);

    if (Model.getData().settings.player2 === 'bot' && isBotTurn) {
        const index = Bot.play();
        play(index);
    }


}





/**
 * @function play
 * 
 * this method is a generic method to make a play
 * called by @function makePlay
 * it accepts one argument
 * @param {Number} boxIndex 
 *
 * it then proceeds to pass the index to @function addPlay (MODEL)
 * 
 * @returns {Boolean} true if the game is still on,
 *  false if a winner was found and the game is stopped
 */

const play = (boxIndex) => {
    // ADD TO MODEL
    const added = Model.addPlay(boxIndex);
    if (!added) return;

    // UPDATE VIEW
    updateView();


    // CHECK FOR WINNER
    const isWinner = Model.checkWinner();



    // IF WINNER UPDATE SCORE
    if (isWinner) {
        const data = Model.getData();
        Model.updateScore();
        showModal({
            title: `Winner!!`,
            text: `Player ${data.currentPlayer} won in ${data.plays[data.currentPlayer].length} moves`,
            clicked: function () {
                ModalView.showModal(false);
                handleRestartGame();
            }
        });
        return false;


    } else if (!isWinner && Model.checkDraw()) {
        showModal({
            title: `Draw!!`,
            clicked: function () {
                ModalView.showModal(false);
                handleRestartGame();
            }
        });
        return false;

    } else {
        Model.switchCurrentPlayer();
        updateView();
        return true;
    }
}

const showModal = ({ title, text = null, clicked = () => {ModalView.showModal(false)} }) => {
    ModalView.update({
        title,
        text,
        clicked,
    });
    ModalView.showModal(true);
}





/**
 * this method is an @IIFE (IMMEDIATELY INVOLKED FUNCTION EXPRESSION) 
 * used to register all the eventlisteners
 * by calling the methods with the eventlisteners in their respective views
 * @function handleNewGameBtnClicked
 * @function handleResumeGameBtnClicked
 * @function handleSettingsButtonClicked
 * These methods initialise all the eventListeners in the HOME VIEW
 * 
 * 
 * @function handleSettingSave
 * @function handleSettingChange
 * These methods initialise all the eventListeners in the SETTING FORM VIEW
 * 
 * 
 * 
 * @function handlePlay
 * @function handleBackBtnClicked
 * @function handleRestartBtnClicked
 * @function handleSaveBtnClicked
 * These methods initialise all the eventListeners in the GAME VIEW
 * 
 * 
 * 
 * @function handleModalBtnClicked
 * These method initialises the eventListener 
 * for when the modal button is clicked
 * in the MODAL VIEW
 * 
 * 
 * 
 * 
 * @function resetState
 * this method is used to reset teh game state immediately the file loads
 */
(() => {
    // View
    HomeView.handleNewGameBtnClicked(handleNewGame);
    HomeView.handleResumeGameBtnClicked(handleResumeGame);
    HomeView.handleSettingsButtonClicked(handleOpenSettings);

    SettingFormView.handleSettingSave(handleSettingSave);
    SettingFormView.handleSettingChange();


    GameView.handlePlay(makePlay);
    GameView.handleBackBtnClicked(handleBackButtonPressed);
    GameView.handleRestartBtnClicked(handleRestartGame);
    GameView.handleSaveBtnClicked(handleSaveGame)


    ModalView.handleModalBtnClicked();

    // MODEL
    Model.resetState();
})();