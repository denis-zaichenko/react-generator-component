export const createReactIndex = (folderName: string): ITemplate => ({
  template: `export * from './${folderName}';`,
  fileName: "index.ts",
});
