/***
 * @author CELESTINE
 * 
 * @VIEW
 * this file is the Base class for all VIEWS as it holds generic methods implemented by other VIEWS
 * 
 * @function clear - removes all child element in the parent element
 * @function render - populates parent element with new elements returned from @function generateMarkup
 * @function update - changes the @value and @attribute of the parent element
 * @function _generateMarkup - creates apprioprate element markup based on data in @var _data 
 */


class View {
    _parentEl = null; //Reperesents the parent element 
    _data = null; /// Represents data to be utilized when rendering the VIEW

    clear() {
        this._parentEl.innerHTML = null;
    }

    /**
     * Method accepts data as a param and validates the data
     * lastly it will re-render the VIEW
     * @param {Object || Array} data 
     */
    render(data) {
        if (!data) return;
        this._data = data;
        const markUp = this._generateMarkup();
        this.clear();
        this._parentEl.innerHTML = markUp;
    }

    /**
     * Method accepts data as a param and validates the data
     * lastly it will re-render the VIEW by editing every element in the parent element
     * as opposed to clearing and adding new elements
     * @param {Object || Array} data 
     */
    update(data) {
        if (!data) return;
        this._data = data;
        const markUp = this._generateMarkup();

        const tempDom = document
            .createRange()
            .createContextualFragment(markUp);

        const newElements = Array.from(tempDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentEl.querySelectorAll('*'));

        newElements.forEach((newEl, idx) => {
            const curEl = curElements[idx];

            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                curEl.textContent = newEl.textContent;
            }

            if(!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
            }
        });
    }

}

export default View;