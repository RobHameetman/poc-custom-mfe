import { Component } from '../../../rendering';

export interface RouteProps {
  readonly path: string;
  readonly exact?: boolean;
}

@Component({
  tag: 'route',
})
export class Route extends HTMLElement {
  readonly exact = false;
  readonly path = '';

  constructor() {
    super();

    // const template: HTMLElement | null = document.getElementById('route');
    // const templateContent = ((template || {}) as HTMLTemplateElement).content;

    // this.attachShadow({mode: 'open'}).appendChild(
    //   templateContent.cloneNode(true)
    // );
  }
}
