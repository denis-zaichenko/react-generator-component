import * as fs from "fs";
import * as vscode from "vscode";
import * as path from "path";
import { paramCase, pascalCase } from "change-case";

export const createComponentName = (path: string) => pascalCase(path);
export const createFolderName = (path: string) => paramCase(path);

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
