const timed = (time: string) => {
  const digitsTillSeconds = 3;

  let strTime: string;
  let suffix: string;

  if (time.length > digitsTillSeconds) {
    strTime = time.substr(0, time.length - digitsTillSeconds);
    suffix = ' s ';
  } else {
    strTime = time;
    suffix = ' ms';
  }

  return {
    strTime,
    suffix
  };
};

const padStyle = `all:unset;color:grey;font-size:10px;margin-left:-20px`;
const dividerStyle = `all:unset;color:lightgrey`;
const messageStyle = (color: string) => `all:unset;color:${color}`;
const pathStyle = `color:grey;font-size:10px;margin-top:2px`;


function logChunk(
  path: string,
  name: string,
  logStyle: string,
  time: number,
  type: 'info' | 'error' | 'cache',
  error?: string
) {
  const divider1 = error ? '' : ' ┬ ';
  const divider2 = error ? '' : ' └─ ';

  const { strTime, suffix } = timed(String(time.toFixed(0)));

  const padLength = 5;
  const pad = new Array(padLength - strTime.length).join(' ');
  const dePad = new Array(padLength + (error ? 0 : suffix.length)).join(' ');

  const message = type === 'error' ? 'Error loading chunk' : type === 'info' ? 'Chunk loaded' : 'Cached chunk';
  const resultingColor = type === 'error' ? 'red' : type === 'info' ? 'green' : 'purple';

  console[type === 'error' ? 'error' : 'info'](
    `%c%s%c%s%c%s: %c%s\n%c%s%c%s%c%s%s`,
    !error ? padStyle : 'all: unset',
    !error ? pad + strTime + suffix : ''/* type === 'error' ? '' : '  cache' */,
    dividerStyle,
    divider1,
    messageStyle(resultingColor),
    message,
    logStyle,
    name,
    padStyle,
    dePad,
    dividerStyle,
    divider2,
    pathStyle,
    path,
    error
  );
}

export function profileChunk(path: string, name: string, logStyle?: string) {
  if (!logStyle) {
    return {
      start: () => undefined,
      stop: () => undefined
    };
  }

  let startTime: number = -1;

  return {
    start() {
      startTime = performance.now();
    },

    stop(type: 'info' | 'error' | 'cache', e?: Error) {
      const endTime = performance.now();
      const loadingTime = startTime === -1 ? 0 : endTime - startTime;

      logChunk(
        path,
        name,
        logStyle,
        loadingTime,
        type,
        e ? '\n\n' + e.message : ''
      );
    }
  };
}
