import { VSCode, createFolderName, generateFolderStructure } from "../utils";

import {
  COMMAND,
  IS_WITH_STATE,
  IS_WITH_STYLE,
  IS_WITH_STATE_STYLE,
} from "../../constants/data.create-component-directory";

import { createReactIndex } from "../templates/react/index.template";
import { createReactTemplate } from "../templates/react/react";
import { createReactState } from "../templates/react/state";
import { createReactStyle } from "../templates/react/styles";

interface ICreateFolderParam extends IFolderCommand {
  template?: IReactTemplate;
}

const commandCreateComponent = async (params: ICreateFolderParam) => {
  const { name, dir, template } = params;

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
  const command = (template?: IReactTemplate) =>
    commandCreateComponent({ dir, name, template });

  switch (type) {
    case COMMAND[0]: {
      command();
      break;
    }
    case COMMAND[1]: {
      command(IS_WITH_STATE);
      break;
    }
    case COMMAND[2]: {
      command(IS_WITH_STYLE);
      break;
    }
    case COMMAND[3]: {
      command(IS_WITH_STATE_STYLE);
      break;
    }
  }
};
