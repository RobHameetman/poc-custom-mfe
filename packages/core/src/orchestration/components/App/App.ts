import { dispatchFrom } from './../../../utils';
import { Component, Prop } from '../../../rendering';

export interface ServiceProps {
  readonly name: string;
}

@Component({
  tag: 'app',
})
export class App extends HTMLElement {
  @Prop() public name = '';

  constructor() {
    super();

    // const template: HTMLElement | null = document.getElementById('service');
    // const templateContent = ((template || {}) as HTMLTemplateElement).content;

    // this.attachShadow({mode: 'open'}).appendChild(
    //   templateContent.cloneNode(true)
    // );
  }

  public attributeChangedCallback(attr, currentValue, newValue) {
    switch (attr) {
    }
  }

  public registerService(): void {
    dispatchFrom(this.name);
  }
}
