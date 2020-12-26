const addArticle = (isNative?: boolean) => (isNative ? "@" : "");
export const addNativeImport = (path: string, isNative?: boolean) =>
  `'${addArticle(isNative)}${path}'`;

export const importTheme = (isNative?: boolean) =>
  `import { Theme } from '${isNative ? "@styles/themes" : "themes"}';`;

export const importGlobalTypes = (isNative?: boolean) =>
  `import { TComponent } from '${addArticle(isNative)}typings/react';`;
