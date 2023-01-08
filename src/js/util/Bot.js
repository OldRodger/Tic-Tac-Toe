/***
 * @author CELESTINE
 * 
 * @BOT
 * this file is responsible for handling game data and behaviours of the BOT 
 */

import * as Model from '../model/Model';

const EASY_MODE = 'easy';
const MEDIUM_MODE = 'medium';
const HARD_MODE = 'master';



class Bot {
    _state = null;
    _availablePlays = [];
    _winningCombination = null;
    _first = true;




    /**
     * Accepts array and carefully look for free space based on last 2 or 3 plays
     * then proceeds to return an array with the best possible play
     * @param {Array} array -  array with plays in form of indexes
     * @returns {Array} best possible option to play next
     */
    _getOptions(array) {
        const [lastPlay] = array.slice(-1);
        const possibleTargets = this._winningCombination.filter(arr => arr.includes(lastPlay));
        const actualTargets = possibleTargets.filter(arr => {
            let played = 0;
            let free = 0;

            arr.forEach(el => {
                array.includes(el) && played++;
                this._availablePlays.includes(el) && free++;
            })


            if (this._state.settings.grids === 3) {
                if (played === 2 && free === 1)
                    return arr;


            } else {
                if (played === 3 && free === 1)
                    return arr;

            }

        })


        return actualTargets;
    }

    /**
     * 
     * @param {Array} array - array with plays in form of indexes
     * @returns {Number}
     */
    _getFinishingMove(array) {
        const [option] = this._getOptions(array);
        const [finishingMove] = option.filter(el => {
            return this._availablePlays.includes(el);
        });

        return finishingMove;
    }

    
    /**
     * 
     * @returns {Number} - index representing next play
     * @example
     * @if 1 is returned means the bot will play in box in second box
     */
    _easyBotPlay() {
        const randomSpace = Math.floor(Math.random() * this._availablePlays.length)
        return this._availablePlays[randomSpace];
    }

    /**
     * Method accepts an array of plays and 
     * runs a check to validate if there's a winning oppotunity
     * @param {Array} array 
     * @returns {Boolean}
     */
    _isAboutToWin(array) {
        return this._getOptions(array).length > 0;
    }

    /**
     * Method performs an advanced check and makes bot play 
     * at a more advanced level making it difficult to win against it
     * by checking whos about to win and acting appropriately
     * @returns {Number} - index representing next play
     * @example
     * @if 1 is returned means the bot will play in box in second box
     */

    _advancedBotPlay() {
        const userPlays = this._state.plays.X;
        const botPlays = this._state.plays.O;

        const isUserAboutToWin = this._isAboutToWin(userPlays);
        const isBotAboutToWin = this._isAboutToWin(botPlays);


        if (isBotAboutToWin)
            return this._getFinishingMove(botPlays);;


        if (isUserAboutToWin)
            return this._getFinishingMove(userPlays);;


        return this._easyBotPlay();
    }

    /**
     * Method performs an advanced check and makes bot play 
     * at a more advanced level making it difficult to win against it
     * by checking whos about to win and acting appropriately
     * @returns {Number} - index representing next play
     * @example
     * @if 1 is returned means the bot will play in box in second box
     */
    _mediumBotPlay() {
        if (this._first) {
            this._first = false;
            let firstPlays = []

            if (this._state.settings.grids === 3) {
                firstPlays = [0, 2, 6, 8]
            } else {
                firstPlays = [0, 3, 12, 15]
            }

            const validPlays = firstPlays.filter(el => {
                return this._availablePlays.includes(el) && !this._state.plays.X.includes(el);
            })

            const RAND = Math.floor(Math.random() * validPlays.length);
            const firstPlay = validPlays[RAND];

            return firstPlay;
        }

        return this._advancedBotPlay();
    }

     /**
     * Method performs an advanced check and makes bot play 
     * at a more advanced level making it difficult to win against it
     * by checking whos about to win and acting appropriately
     * @returns {Number} - index representing next play
     * @example
     * @if 1 is returned means the bot will play in box in second box
     */
    _hardBotPlay() {

        if (this._first) {
            this._first = false;

            if (this._availablePlays.includes(4)) {
                return 4;
            }

            return this._mediumBotPlay();
        }

        return this._advancedBotPlay()
    }

    /**
     * this method makes play based on the difficulty of the bot set
     * @returns {Number} - index chosen
     * @example
     *  on easy mode - plays at random
     *  on medium mode - takes available space, users play and last play into consideration 
     */
    play() {
        this.updateState();
        this._availablePlays = this._state.plays.all
            .map((play, idx) => play === null && idx)
            .filter(play => typeof play === 'number');

        switch (this._state.settings.botDifficulty) {
            case EASY_MODE:
                console.log("Easy Mode");
                return this._easyBotPlay();
            case MEDIUM_MODE:
                // console.log("Medium Mode");
                return this._mediumBotPlay();
            case HARD_MODE:
                console.log("Hard Mode");
                return this._hardBotPlay();
        }


    }

    /**
     * Updates BOT state to match that of the 
     * game overall state stored in the MODEL
     */
    updateState() {
        this._state = Model.getData();
        if (this._state.settings.grids === 3) {
            this._winningCombination = [
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
            this._winningCombination = [
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



    }


    /**
     * Resets BOT state to default
     */
    resetState() {
        this._state = null;
        this._availablePlays = [];
        this._winningCombination = null;
        this._first = true;

    }


}

export default new Bot();