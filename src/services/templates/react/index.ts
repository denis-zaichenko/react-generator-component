export * from "./react";
export * from "./styles";
export * from "./state";

export const createReactIndex = (folderName: string): ITemplate => ({
  template: `export * from './${folderName}';`,
  fileName: "index.ts",
});
