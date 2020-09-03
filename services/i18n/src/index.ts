let $mountNode: HTMLElement | null = null;

export const boot = () => {};

export const mount = (): HTMLElement => {
  $mountNode = document.getElementById('i18n');

  return $mountNode as HTMLElement;
};

export const unmount = (): void => {
  $mountNode = null;
};
