class MyGreeter extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name') || 'World';
        this.innerHTML = `<p>Hello, ${name}!</p>`;
    }
}

window.customElements.define('my-greeter', MyGreeter);

export {}