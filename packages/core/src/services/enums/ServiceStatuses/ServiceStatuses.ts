export enum ServiceStatuses {
  /**
   * The frame is mounted in the DOM and the service has been added to the
   * registry.
   */
  REGISTERED = 'REGISTERED',
  /**
   * The frame is mounted in the DOM but the service is not in the registry.
   */
  UNREGISTERED = 'UNREGISTERED',
  LOADED = 'LOADED',
  LOAD_ERROR = 'LOAD_ERROR',
  BOOTSTRAPPED = 'BOOTSTRAPPED',
  BOOTSTRAP_ERROR = 'BOOTSTRAP_ERROR',
  MOUNTED = 'MOUNTED',
  MOUNT_ERROR = 'MOUNT_ERROR',
  UNMOUNTED = 'UNMOUNTED',
  UNMOUNT_ERROR = 'UNMOUNT_ERROR',
  UNLOADED = 'UNLOADED',
  UNLOAD_ERROR = 'UNLOAD_ERROR',
  SKIPPED = 'SKIPPED',
}
