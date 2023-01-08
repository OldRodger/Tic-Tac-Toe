import View from "./View";


class settingFormView extends View {
    _parentEl = document.querySelector('.form');
    save_btn = this._parentEl.querySelector('.form__submit');


    handleSettingSave(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
        })


        this._parentEl.addEventListener('formdata', e => {
            const formData = e.formData;

            const player2 = formData.get('player-2') ? 'human' : 'bot';
            const botDifficulty = formData.get('bot-difficulty');
            const grids = formData.get('grids') ? 3 : 4;

            const settingState = {
                player2,
                botDifficulty,
                grids
            }

            this.save_btn.dataset.changed = 'false';
            handler(settingState)

        })
    }

    handleSettingChange = () => {
        this._parentEl.addEventListener('change', () => this.save_btn.dataset.changed = 'true')
    }
}

export default new settingFormView();