import View from './View';

class homeView extends View {
    _parentEl = document.querySelector('.home');

    handleNewGameBtnClicked(handler) {
        this._parentEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.menu__btn--new');
            if (!btn) return;
            handler();
        })
    }

    handleResumeGameBtnClicked(handler) {
        this._parentEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.menu__btn--resume');
            if (!btn) return;
            handler();
        })
    }

    handleInstructionBtnClicked(handler) {
        this._parentEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.menu__btn--instruction');
            if (!btn) return;
            handler();
        })
    }

    handleSettingsButtonClicked = (handler) => {
        const setting_btn = document.querySelector('.setting-btn');
        setting_btn.addEventListener('click', function () {
            const { settingOpen } = this.dataset;
            const newSettingOpenData = this.dataset.settingOpen = (settingOpen === 'false' ? true : false);

            handler(newSettingOpenData);
        })
    }
}

export default new homeView();