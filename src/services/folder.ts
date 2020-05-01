import * as fs from "fs";
import * as vscode from "vscode";
import * as path from "path";
import { paramCase, pascalCase } from "change-case";

import {
  createReactTemplate,
  createState,
  createStyle,
  createIndexTemplate,
} from "./templates";

interface ICreateFolderParam {
  dir: string;
  componentName: string;
  template?: ITemplate;
}

export const createComponentName = (path: string) => pascalCase(path);
export const createFolderName = (path: string) => paramCase(path);

const createDir = (targetDir: string) => {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : "";
  const baseDir = __dirname;

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === "EEXIST") {
        // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === "ENOENT") {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ["EACCES", "EPERM", "EISDIR"].indexOf(err.code) > -1;
      if (!caughtErr || (caughtErr && curDir === path.resolve(targetDir))) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
};

const createFile = async (filePath: string, content: string | string[]) => {
  if (!fs.existsSync(filePath)) {
    await fs.createWriteStream(filePath).close();
    await fs.writeFile(filePath, content, (err) => {
      if (err) {
        vscode.window.showErrorMessage("Maker cant write to file.");
      }
    });
  } else {
    vscode.window.showWarningMessage("File already exists.");
  }
};

export const createDirWithFile = async ({
  componentName,
  dir,
  template,
}: ICreateFolderParam) => {
  const component = createComponentName(componentName);
  const folder = createFolderName(componentName);

  const COMPONENT_FILE_NAME = `${folder}.tsx`;
  const STYLED_FILE_NAME = `${folder}.styles.ts`;
  const STATE_FILE_NAME = `${folder}.state.ts`;
  const INDEX_FILE_NAME = `index.ts`;

  const projectRoot = (vscode.workspace.workspaceFolders as any)[0].uri.fsPath;

  if (!dir.includes(projectRoot)) {
    dir = projectRoot + dir;
  }
  if (dir[dir.length - 1] !== "/") {
    dir = dir + "/";
  }
  const dirWithFileName = dir + folder;
  const filePath = (fileName: string) => dirWithFileName + "/" + fileName;

  createDir(dirWithFileName);

  await createFile(filePath(INDEX_FILE_NAME), createIndexTemplate(folder));
  await createFile(
    filePath(COMPONENT_FILE_NAME),
    createReactTemplate(folder, component, template)
  );

  if (template) {
    const { isWithState, isWithStyle } = template;
    if (isWithState) {
      await createFile(filePath(STATE_FILE_NAME), createState(component));
    }
    if (isWithStyle) {
      await createFile(filePath(STYLED_FILE_NAME), createStyle(component));
    }
  }

  setTimeout(() => {
    vscode.workspace
      .openTextDocument(filePath(COMPONENT_FILE_NAME))
      .then((editor) => {
        if (!editor) {
          return;
        }
        vscode.window.showTextDocument(editor);
      });
  }, 50);
};
