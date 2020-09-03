export class Auth extends HTMLElement {
  // maybe use a getTemplate('auth') function from core here instead?
  public readonly $template = (document.getElementById('auth') as HTMLTemplateElement)?.content;
  public readonly $ref: Node;

  constructor() {
    super();

    this.$ref = this.attachShadow({ mode: 'open' }).appendChild(this.$template.cloneNode(true));
  }
}
