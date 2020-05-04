import * as vscode from "vscode";

import { VSCode } from "./services/utils/vscode";

import { createReactComponent, createRedux } from "./services/commands";

export function activate(context: vscode.ExtensionContext) {
  const call = [
    VSCode.registerCommand("createComponent", (args) => {
      createReactComponent(args);
    }),
    VSCode.registerCommand("createRedux", (args) => {
      createRedux(args);
    }),
  ];

  context.subscriptions.push(...call);
}

export function deactivate() {}
