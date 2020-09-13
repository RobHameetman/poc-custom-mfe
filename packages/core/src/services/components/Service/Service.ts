import { dispatchFrom } from './../../../utils';

export interface ServiceProps {
  readonly name: string;
}

export class Service extends HTMLElement {
  public name = '';

  constructor() {
    super();

    // const template: HTMLElement | null = document.getElementById('service');
    // const templateContent = ((template || {}) as HTMLTemplateElement).content;

    // this.attachShadow({mode: 'open'}).appendChild(
    //   templateContent.cloneNode(true)
    // );
  }

  public attributeChangedCallback(
    attr: string,
    currentValue: string,
    newValue: string,
  ) {
    switch (attr) {
    }
  }

  public registerService(): void {
    dispatchFrom(this.name);
  }
}
