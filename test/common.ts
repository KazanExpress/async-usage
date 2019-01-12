export function importFactory(path: string) {
  return Promise.resolve(require('./modules/' + path));
}
