export * from "./constants";
export * from "./action";
export * from "./reducer";

export const createReduxIndex = (folderName: string): ITemplate => ({
  template: `
export * from './${folderName}.actions';
export * from './${folderName}.constants';
export * from './${folderName}.reducer';
`.trim(),
  fileName: `index.ts`,
});
