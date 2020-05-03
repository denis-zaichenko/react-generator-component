import * as vscode from "vscode";

const PROJECT_NAME = "react-generator-component";

export const VSCode = {
  createInput: async (placeholder: string) =>
    await vscode.window.showInputBox({
      prompt: placeholder,
      ignoreFocusOut: true,
      valueSelection: [-1, -1],
    }),

  showBox: (text: string) => vscode.window.showInformationMessage(text),

  registerCommand: (name: string, callback: (args: any) => void) =>
    vscode.commands.registerCommand(`${PROJECT_NAME}.${name}`, callback),

  showDialog: async (items: string[], defaultItem = items[0]) =>
    (await vscode.window.showQuickPick(items, { canPickMany: false })) ??
    defaultItem,

  openTextFile: (path: string) => {
    setTimeout(() => {
      vscode.workspace.openTextDocument(path).then((editor) => {
        if (!editor) {
          return;
        }
        vscode.window.showTextDocument(editor);
      });
    }, 50);
  },
};
