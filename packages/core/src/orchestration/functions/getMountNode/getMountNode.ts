import { AppEntrypointElement } from '../../components';

export const getMountNode = (): AppEntrypointElement => {
  const $mountNode = document.querySelector('app-entrypoint');

  if (!$mountNode) {
    throw Error('Could not find <app-entrypoint>');
  }

  return $mountNode as AppEntrypointElement;
};
