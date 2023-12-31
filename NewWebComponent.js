class NewWebComponent extends HTMLElement {
  constructor() {
    super()

    this.innerHTML = "Ahojky Web componente!"
  }
}

customElements.define("new-web-component", NewWebComponent)
