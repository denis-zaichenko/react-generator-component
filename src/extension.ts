import * as vscode from 'vscode';

import { createRedux, reactCommand } from './services/commands';
import { VSCode } from './services/utils/vscode';

export function activate(context: vscode.ExtensionContext) {
  const call = [
    VSCode.registerCommand("createReact", reactCommand(false)),
    VSCode.registerCommand("createReactNative", reactCommand(true)),
    VSCode.registerCommand("createRedux", createRedux),
  ];

  context.subscriptions.push(...call);
}

export function deactivate() {}
