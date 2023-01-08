import View from "./View";

class modalView extends View {
    _parentEl = document.querySelector('.modal');

    showModal(bool){
        bool
        ? this._parentEl.classList.add('active')
        : this._parentEl.classList.remove('active');
    }

    _generateMarkup(){
        return `
            <div class="modal__content">
                <h2 class="modal__title">${this._data.title}</h2>
                <p class="modal_text">${this._data?.text ?? ''}</p>
                <button type="button" class="btn btn--mid modal__btn menu__btn">close</button>
            </div>
        `;
    }

    handleModalBtnClicked(){
        this._parentEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.modal__btn');
            if(!btn) return;
            this._data.clicked();
        })
    }
}

export default new modalView();