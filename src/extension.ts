import * as vscode from "vscode";

import { VSCode } from "./services/vscode";

import { createComponent } from "./services/commands";

import {
  COMMAND,
  IS_WITH_STATE,
  IS_WITH_STYLE,
  IS_WITH_STATE_STYLE,
} from "./constants/data.create-component-directory";

export function activate(context: vscode.ExtensionContext) {
  const callCreateComponent = VSCode.registerCommand(
    "createComponent",
    (args) => {
      const command = createComponent(args);
      const fetch = async () => {
        const type = await VSCode.showDialog(COMMAND);
        switch (type) {
          case COMMAND[0]:
            return command();
          case COMMAND[1]:
            return command(IS_WITH_STATE);
          case COMMAND[2]:
            return command(IS_WITH_STYLE);
          case COMMAND[3]:
            return command(IS_WITH_STATE_STYLE);
        }
      };
      fetch();
    }
  );

  context.subscriptions.push(callCreateComponent);
}

export function deactivate() {}
