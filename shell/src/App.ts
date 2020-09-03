export class App extends HTMLElement {
  constructor() {
    super();

    const template: HTMLElement | null = document.getElementById('app');
    const templateContent = ((template || {}) as HTMLTemplateElement).content;

    this.attachShadow({mode: 'open'}).appendChild(
      templateContent.cloneNode(true)
    );
  }
}

customElements.define('app', App);
