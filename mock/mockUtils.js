/* eslint-disable import/prefer-default-export */
export function getLastPath(pathName) {
  const arrayPath = pathName.split('/');
  const lastPath = arrayPath && arrayPath.length > 0 ? arrayPath[arrayPath.length - 1] : pathName;
  const firstLastPath = lastPath.split('.')[0];
  return firstLastPath;
}
