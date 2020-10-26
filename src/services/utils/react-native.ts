export const addNativeImport = (path: string, isNative?: boolean) =>
  `'${isNative ? "@" : ""}${path}'`;
export const importTheme = (isNative?: boolean) =>
  `import { Theme } from '${isNative ? "@styles/themes" : "themes"}';`;
