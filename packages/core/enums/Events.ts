export enum Events {
  APP_CHANGE_STATUS = 'app-change-status', // is fired when an app is loaded, bootstrapped, mounted, unmounted, or unloaded
  APP_REGISTER = 'app-register',
  APP_LOAD = 'app-load',
  APP_MOUNT = 'app-mount',
  APP_START = 'app-start',
  APP_STOP = 'app-stop',
  APP_UNMOUNT = 'app-unmount',
  APP_UNLOAD = 'app-unload',
  BEFORE_CHANGE = 'before-change',
  NO_APP_CHANGE = 'no-app-change', // is fired when no app is loaded, bootstrapped, mounted, unmounted, or unloaded
  ROUTING_EVENT = 'routing-event',
}
