export default class LoadMoreBtn {
    constructor({selector, hidden = false}) {
        this.refs = this.getRefs(selector);

        hidden && this.hide();
    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);

        return refs;
    }

    enable() {
        this.refs.button.disabled = false;
        this.refs.button.textContent = 'Load more';
        this.refs.button.classList.remove('is-hidden');
    }

    disabled() {
        this.refs.button.disabled = true;
        this.refs.button.textContent = 'Loading...';
    }

    hide() {
        this.refs.button.classList.add('is-hidden');
    }
}