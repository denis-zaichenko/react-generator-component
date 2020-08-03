import { paramCase, pascalCase, constantCase } from "change-case";

export const createName = (folderName: string) => ({
  component: () => pascalCase(folderName),
  folder: () => paramCase(folderName),
  constant: () => constantCase(folderName),
});

export const createComponentName = (folderName: string) =>
  pascalCase(folderName);
export const createFolderName = (folderName: string) => paramCase(folderName);
export const createConstantName = (folderName: string) =>
  constantCase(folderName);
