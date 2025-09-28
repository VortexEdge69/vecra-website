const IS_DEV = process.env.NODE_ENV === 'development';

const logger = {
  log: (...args: unknown[]) => {
    if (IS_DEV) {
      console.log(...args);
    }
  },
  error: (...args: unknown[]) => {
    if (IS_DEV) {
      console.error(...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (IS_DEV) {
      console.warn(...args);
    }
  },
};

export default logger;