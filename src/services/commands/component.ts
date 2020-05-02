import * as vscode from "vscode";

import { VSCode } from "../vscode";

import {
  createReactTemplate,
  createState,
  createStyle,
  createIndexTemplate,
} from "../templates";
import {
  createComponentName,
  createFile,
  createFolder,
  createFolderName,
} from "../folder";

interface ICreateFolderParam {
  dir: string;
  componentName: string;
  template?: ITemplate;
}

const commandCreateComponent = async ({
  componentName,
  dir,
  template,
}: ICreateFolderParam) => {
  const component = createComponentName(componentName);
  const folder = createFolderName(componentName);
  const projectRoot = (vscode.workspace.workspaceFolders as any)[0].uri.fsPath;

  if (!dir.includes(projectRoot)) {
    dir = projectRoot + dir;
  }
  if (dir[dir.length - 1] !== "/") {
    dir = dir + "/";
  }
  const dirWithFileName = dir + folder;
  const filePath = (fileName: string) => dirWithFileName + "/" + fileName;

  const COMPONENT = `${folder}.tsx`;
  const STYLED = `${folder}.styles.ts`;
  const STATE = `${folder}.state.ts`;
  const INDEX = `index.ts`;

  createFolder(dirWithFileName);

  const generateFile = (fileName: string, content: string) =>
    createFile(filePath(fileName), content);

  await generateFile(INDEX, createIndexTemplate(folder));
  await generateFile(
    COMPONENT,
    createReactTemplate(folder, component, template)
  );

  if (template) {
    const { isWithState, isWithStyle } = template;
    if (isWithState) {
      await generateFile(STATE, createState(component));
    }
    if (isWithStyle) {
      await generateFile(STYLED, createStyle(component));
    }
  }

  VSCode.openTextFile(filePath(COMPONENT));
};

export const createComponent = (args: any) => async (template?: ITemplate) => {
  const componentName = await VSCode.createInput("Component name");
  if (!componentName) {
    return;
  }

  if (args) {
    const dir = args.fsPath;
    commandCreateComponent({ dir, componentName, template });
  }
};
