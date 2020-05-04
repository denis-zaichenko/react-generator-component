import * as fs from "fs";
import * as vscode from "vscode";
import * as path from "path";

import { createFolderName } from "./name";

export const createFolder = (targetDir: string) => {
  const { sep } = path;
  const initDir = path.isAbsolute(targetDir) ? sep : "";

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(__dirname, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === "EEXIST") {
        return curDir;
      }

      if (err.code === "ENOENT") {
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ["EACCES", "EPERM", "EISDIR"].indexOf(err.code) > -1;
      if (!caughtErr || (caughtErr && curDir === path.resolve(targetDir))) {
        throw err;
      }
    }

    return curDir;
  }, initDir);
};

export const createFile = async (
  filePath: string,
  content: string | string[]
) => {
  if (!!fs.existsSync(filePath)) {
    vscode.window.showWarningMessage("File already exists.");
  }
  await fs.createWriteStream(filePath).close();
  await fs.writeFile(filePath, content, (err) => {
    if (err) {
      vscode.window.showErrorMessage("Maker cant write to file.");
    }
  });
};

export const generatorFilePath = (dir: string, name: string) => {
  const folderName = createFolderName(name);
  const projectRoot = (vscode.workspace.workspaceFolders as any)[0].uri.fsPath;

  if (!dir.includes(projectRoot)) {
    dir = projectRoot + dir;
  }
  if (dir[dir.length - 1] !== "/") {
    dir = dir + "/";
  }
  return dir + folderName;
};

export const generateFolderStructure = (dir: string, name: string) => {
  const path = generatorFilePath(dir, name);
  createFolder(path);

  return ({ fileName, template }: ITemplate) =>
    createFile(`${path}/${fileName}`, template);
};
