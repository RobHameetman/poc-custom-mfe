export const build = async (): Promise<void> => {
  try {
    console.log('Creating an optimized production build...');

    /**
     * const previousFileSizes = await measureFileSizesBeforeBuild(PATHS_APP_BUILD_DIR);
     */

    /*
     * emptyDirSync(PATHS_APP_BUILD_DIR);
     * copyPublicFolder();
     */

    /**
     * await pipeline.build(BUILD_ENV);
     */
  } catch (err) {
    console.error(err instanceof Error ? err : new Error(err));
  }
};
