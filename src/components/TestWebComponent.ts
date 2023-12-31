export class TestWebComponent extends HTMLElement {
  constructor() {
    super()

    this.innerHTML = "Ahojky Web componente!"
  }
}

customElements.define("test-web-component", TestWebComponent)
