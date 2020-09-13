export enum LogLevels {
  error,
  warn,
  info,
  debug,
  verbose,
}

export type LogLevel = keyof typeof LogLevels;

export const isLogLevel = <L extends LogLevels = LogLevels>(
  value: unknown,
): value is L => {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    Object.keys(LogLevels)
      .filter((key) => typeof key === 'number')
      .includes(value)
  );
};

export const toLogLevel = (level: LogLevel): number => {
  return LogLevels[level];
}
