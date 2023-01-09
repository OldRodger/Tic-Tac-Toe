import View from "./View";

class gameView extends View {
    _parentEl = document.querySelector('.game');

    openGameView(bool) {
        this._parentEl.dataset.isOpen = bool;
    }

    _generateMarkup() {

        const board__box = this._generateBoardMarkup();;
        const opponent = this._data.settings.player2 === 'human' ? 'Player O' : 'Bot';

        return `
            <header class="game__header">
                <div class="game__controls">
                    <button class="btn btn--effect btn--sm game__control game__control--home" title="back">
                        <span class="material-symbols-outlined">
                            arrow_back
                        </span>
                    </button>
                    <button class="btn btn--effect btn--sm game__control game__control--restart" title="restart">
                        <span class="material-symbols-outlined">
                            restart_alt
                        </span>
                    </button>
                    <button class="btn btn--effect btn--sm game__control game__control--save" title="save">
                        <span class="material-symbols-outlined">
                            save
                        </span>
                    </button>
                </div>

                <div class="game__scores">
                    <div class="game__score ${this._data.score.X > this._data.score.O ? 'active' : ''}">
                        <span>Player X</span>
                        <span>${this._data.score.X}</span>
                    </div>

                    <div class="game__score" ${this._data.score.X < this._data.score.O ? 'active' : ''}>
                        <span>${opponent}</span>
                        <span>${this._data.score.O}</span>
                    </div>
                </div>
            </header>


            <div class="board">
                <div class="board__bars">
                    <span class="board__bar" data-active="${this._data.currentPlayer === 'X'}">Player X</span>
                    <span class="board__bar" data-active="${this._data.currentPlayer !== 'X'}">
                    ${opponent}
                    ${opponent === 'Bot' ? `(${this._data.settings.botDifficulty})`: ''}
                    </span>
                </div>

                <div class="board__boxes" data-grid="${this._data.settings.grids}">
                   ${board__box}
                </div>
            </div>
        `
    }

    _generateBoardMarkup() {
        let html = ``;

        for (let i = 0; i < Math.pow(this._data.settings.grids, 2); i++) {
            const player = this._data.plays.all[i] ?? ' ';
            html += `
                <div class="board__box" data-index="${i}" data-box="${player}">
                    ${player}
                </div>
            `;
        }

        return html;
    }




    handlePlay(handler) {
        this._parentEl.addEventListener('click', e => {
            const box = e.target.closest('.board__box');
            if (!box) return;
            const boxIndex = +box.dataset.index;
            handler(boxIndex);
        })
    }

    handleBackBtnClicked(handler) {
        this._parentEl.addEventListener('click', e => {
            const btn = e.target.closest('.game__control--home');
            if (!btn) return;
            handler();
        })
    }

    handleRestartBtnClicked(handler) {
        this._parentEl.addEventListener('click', e => {
            const btn = e.target.closest('.game__control--restart');
            if (!btn) return;
            handler();
        })
    }

    handleSaveBtnClicked(handler) {
        this._parentEl.addEventListener('click', e => {
            const btn = e.target.closest('.game__control--save');
            if (!btn) return;
            handler();
        })
    }
}

export default new gameView();