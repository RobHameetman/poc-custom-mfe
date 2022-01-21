import { AppContainerElement } from '../../components';

export const getMountNode = (): AppContainerElement => {
  const $mountNode = document.querySelector('app-container');

  if (!$mountNode) {
    throw Error('Could not find <app-container>');
  }

  return $mountNode as AppContainerElement;
};
