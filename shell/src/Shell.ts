class Shell extends HTMLElement {
  constructor() {
    super();

    const template: HTMLElement | null = document.getElementById('shell');
    const templateContent = ((template || {}) as HTMLTemplateElement).content;

    this.attachShadow({mode: 'open'}).appendChild(
      templateContent.cloneNode(true)
    );
  }
}

customElements.define('shell', Shell);
