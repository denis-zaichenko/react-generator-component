import { commands, window } from 'vscode';

export const VSCode = {
  createInput: async (placeholder: string) =>
    await window.showInputBox({
      prompt: placeholder,
      ignoreFocusOut: true,
      valueSelection: [-1, -1],
    }),

  showBox: (text: string) => window.showInformationMessage(text),

  registerCommand: (name: string, callback: (args: any) => void) =>
    commands.registerCommand(`generator-component.${name}`, callback),

  showDialog: async (items: string[], defaultItem = items[0]) =>
    (await window.showQuickPick(items, { canPickMany: false })) ?? defaultItem,
};
