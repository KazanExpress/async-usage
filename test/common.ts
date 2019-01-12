export function importFactory(path: string) {
  return Promise.resolve(require('./modules/' + path));
}

export function wrongImportFactory(path: string) {
  return Promise.reject(new Error(path));
}
