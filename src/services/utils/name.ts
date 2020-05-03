import { paramCase, pascalCase, constantCase } from "change-case";

export const createComponentName = (folderName: string) =>
  pascalCase(folderName);
export const createFolderName = (folderName: string) => paramCase(folderName);
export const createConstantName = (folderName: string) =>
  constantCase(folderName);
