const { name, version } = require('../../package.json');

enum Logger {
  'error' = 'background-color: #ed4014; padding: 4px 8px; border-radius: 2px; color: #fff;',
  'warn' = '',
}

type LoggerFunction = (type: string, message: string) => void;

const logger: LoggerFunction = (type: string, message: string) => {
  if (console) {
    const report: string = `%c${name}c${version}\n${message}`;
    // eslint-disable-next-line no-console
    console.log(report, Logger[type]);
  }
};

export default logger;
