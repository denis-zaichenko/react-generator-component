import * as vscode from "vscode";

import { VSCode } from "./services/utils/vscode";

import {
  createReactComponent,
  createRedux,
  createReactFile,
} from "./services/commands";

export function activate(context: vscode.ExtensionContext) {
  const call = [
    VSCode.registerCommand("createComponent", createReactComponent),
    VSCode.registerCommand("createRedux", createRedux),
    VSCode.registerCommand("createReactFile", createReactFile),
  ];

  context.subscriptions.push(...call);
}

export function deactivate() {}
