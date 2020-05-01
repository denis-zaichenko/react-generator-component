import * as vscode from "vscode";

import { createDirWithFile } from "./services/folder";

export function activate(context: vscode.ExtensionContext) {
  const PROJECT_NAME = "react-generator-component";
  const VSCode = {
    createInput: async (placeholder: string) =>
      await vscode.window.showInputBox({
        prompt: placeholder,
        ignoreFocusOut: true,
        valueSelection: [-1, -1],
      }),

    showBox: (text: string) => vscode.window.showInformationMessage(text),

    registerCommand: (name: string, callback: (args: any) => void) =>
      vscode.commands.registerCommand(`${PROJECT_NAME}.${name}`, callback),

    createComponent: async (args: any, template?: ITemplate) => {
      const componentName = await VSCode.createInput("Component name");
      if (!componentName) {
        return;
      }

      if (args) {
        const dir = args.fsPath;
        createDirWithFile({ dir, componentName, template });
      }
    },
  };

  console.log(
    'Congratulations, your extension "react-generator-component" is now active!'
  );

  const component = [
    VSCode.registerCommand("createComponent", (args) => {
      VSCode.createComponent(args);
    }),
    VSCode.registerCommand("createComponentWithState", (args) => {
      VSCode.createComponent(args, { isWithState: true });
    }),
    VSCode.registerCommand("createComponentWithStyle", (args) => {
      VSCode.createComponent(args, { isWithStyle: true });
    }),
    VSCode.registerCommand("createComponentWithStateAndStyle", (args) => {
      VSCode.createComponent(args, { isWithState: true, isWithStyle: true });
    }),
  ];

  context.subscriptions.push(...component);
}

export function deactivate() {}
