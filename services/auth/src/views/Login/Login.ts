export class Login extends HTMLElement {
  // maybe use a getTemplate('login') function from core here instead?
  public readonly $template = (document.getElementById('login') as HTMLTemplateElement)?.content;
  public readonly $ref: Node;

  constructor() {
    super();

    this.$ref = this.attachShadow({ mode: 'open' }).appendChild(this.$template.cloneNode(true));
  }
}
