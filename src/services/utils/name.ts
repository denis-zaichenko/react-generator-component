import { constantCase, paramCase, pascalCase } from 'change-case';

export const createNameGroup = (folderName: string) => ({
  component: () => pascalCase(folderName),
  folder: () => paramCase(folderName),
  constant: () => constantCase(folderName),
});

// component name -> ComponentName
export const createComponentName = (folderName: string) =>
  pascalCase(folderName);

// folder name -> folder-name
export const createFolderName = (folderName: string) => paramCase(folderName);

// constant name -> CONSTANT_NAME
export const createConstantName = (folderName: string) =>
  constantCase(folderName);
