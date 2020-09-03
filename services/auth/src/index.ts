let $mountNode: HTMLElement | null = null;

export const boot = () => {};

export const mount = (): HTMLElement => {
  $mountNode = document.getElementById('auth');

  return $mountNode as HTMLElement;
};

export const unmount = (): void => {
  $mountNode = null;
}
