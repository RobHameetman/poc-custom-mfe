import { $import, fetchManifest } from '../../orchestration';
import { LoadEvent } from '../../../events';

export const handleLoad = async (e: LoadEvent): Promise<void> => {
  const { frame, reject, resolve } = e.detail;

  try {
    const host = frame.src;
    const manifest = await fetchManifest(host, frame);

    console.log('manifest:', manifest);

    const { entrypoints, files } = manifest;

    const pending = Object.entries(files)
      .filter(([key]) => entrypoints.includes(key) && !key.includes('main.js'))
      .map(([_, path]) => $import(path, frame));

    pending.forEach((promise) => {
      return promise.then(() => {});
    });

    try {
      await Promise.all(pending);
    } catch (error) {
      reject(error);
    }

    const module = await $import(
      `${host.endsWith('/') ? host.slice(-1) : host}${files['main.js']}`,
      frame,
    );

    console.log('module:', module);

    resolve();
  } catch (error) {
    reject(error);
  }
};
