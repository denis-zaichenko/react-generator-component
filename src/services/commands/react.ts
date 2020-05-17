import {
  VSCode,
  createFolderName,
  generateFolderStructure,
  createFile,
} from "../utils";

import { COMMAND, STATE, STYLE, STATE_STYLE } from "../../constants";

import { createReactIndex } from "../templates/react/index.template";
import { createReactTemplate } from "../templates/react/react";
import { createReactState } from "../templates/react/state";
import { createReactStyle } from "../templates/react/styles";

const commandCreateComponent = (dir: string, name: string) => async (
  template?: IReactTemplate
) => {
  const folderName = createFolderName(name);
  const generateFile = generateFolderStructure(dir, name);

  await generateFile(createReactIndex(folderName));
  await generateFile(createReactTemplate(folderName, template));

  if (!template) {
    return;
  }

  const { isWithState, isWithStyle } = template;
  if (isWithState) {
    await generateFile(createReactState(folderName));
  }
  if (isWithStyle) {
    await generateFile(createReactStyle(folderName));
  }
};

export const createReactComponent = async (args: any) => {
  const type = await VSCode.showDialog(COMMAND);
  const name = await VSCode.createInput("Component name");

  if (!name || !args) {
    return;
  }

  const dir = args.fsPath;
  const command = commandCreateComponent(dir, name);

  switch (type) {
    case COMMAND[0]: {
      return command();
    }
    case COMMAND[1]: {
      return command(STATE);
    }
    case COMMAND[2]: {
      return command(STYLE);
    }
    case COMMAND[3]: {
      return command(STATE_STYLE);
    }
  }
};

export const createReactFile = async (args: any) => {
  const name = await VSCode.createInput("Component name");

  if (!name || !args) {
    return;
  }
  const { fileName, template } = createReactTemplate(createFolderName(name));
  const dir = args.fsPath;

  return createFile(`${dir}/${fileName}`, template);
};
