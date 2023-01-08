import View from "./View";

class settingView extends View{
    _parentEl = document.querySelector('.settings');
    
    handleSettingViewOpen(bool){
        this._parentEl.dataset.isOpen = bool;
    }
}

export default new settingView();