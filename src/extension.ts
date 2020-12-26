import * as vscode from 'vscode';

import {
  createReactComponent, createReactFile, createReactWithPropsComponent,
  createRedux
} from './services/commands';
import { VSCode } from './services/utils/vscode';

export function activate(context: vscode.ExtensionContext) {
  const call = [
    VSCode.registerCommand("createComponent", createReactComponent(false)),
    VSCode.registerCommand(
      "createComponentWithProps",
      createReactWithPropsComponent(false)
    ),
    VSCode.registerCommand("createRedux", createRedux(false)),
    VSCode.registerCommand("createReactFile", createReactFile(false)),
  ];

  const native = [
    VSCode.registerCommand("createComponent", createReactComponent(true), true),
    VSCode.registerCommand(
      "createComponentWithProps",
      createReactWithPropsComponent(true),
      true
    ),
    VSCode.registerCommand("createReactFile", createReactFile(true), true),
    VSCode.registerCommand("createRedux", createRedux(true), true),
  ];

  context.subscriptions.push(...call, ...native);
}

export function deactivate() {}
