import { createReactIndex } from '../templates/react/index.template';
import {
  createConstantsFile, createStringsFile, createTypesFile
} from '../templates/react/oters';
import { createReactTemplate } from '../templates/react/react';
import {
  createReactWithPropsTemplate
} from '../templates/react/react-with-props';
import { getNameByPath } from '../utils/create-components';

import { createReactState } from '../templates/react/state';
import {
  createFile, createFolderName, generateFolderStructure, VSCode
} from '../utils';

import {
  COMMAND, REACT_FILE_TEMPLATE, STATE, STATE_STYLE, STYLE
} from '../../constants';

import { createReactStyle } from '../templates/react/styles';

type TGenerateReact = (
  folderName: string,
  reactTemplate?: IReactTemplate | undefined
) => ITemplate;

const commandCreateComponent = (dir: string, name: string) => (
  reactTemplateFunction: TGenerateReact
) => async (template?: IReactTemplate) => {
  const folderName = createFolderName(name);
  const generateFile = generateFolderStructure(dir, name);

  await generateFile(createReactIndex(folderName));
  await generateFile(reactTemplateFunction(folderName, template));

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

const createReactTemplateComponent = (createTemplate: TGenerateReact) => async (
  args: any
) => {
  const type = await VSCode.showDialog(COMMAND);
  const name = await VSCode.createInput("Component name");

  if (!name || !args) {
    return;
  }

  const dir = args.fsPath;
  const command = commandCreateComponent(dir, name)(createTemplate);

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

export const createReactComponent = createReactTemplateComponent(
  createReactTemplate
);
export const createReactWithPropsComponent = createReactTemplateComponent(
  createReactWithPropsTemplate
);

export const createReactFile = async (args: any) => {
  if (!args) {
    return;
  }

  const dir = args.fsPath;
  const type = await VSCode.showDialog(REACT_FILE_TEMPLATE);
  const name = await getNameByPath(dir, type, [REACT_FILE_TEMPLATE[0]]);

  if (!name) {
    return;
  }

  const folderName = createFolderName(name);
  let data: ITemplate;

  switch (type) {
    default:
    case REACT_FILE_TEMPLATE[0]: {
      data = createReactTemplate(folderName);
      break;
    }
    case REACT_FILE_TEMPLATE[1]: {
      data = createReactState(folderName);
      break;
    }
    case REACT_FILE_TEMPLATE[2]: {
      data = createReactStyle(folderName);
      break;
    }
    case REACT_FILE_TEMPLATE[3]: {
      data = createStringsFile(folderName);
      break;
    }
    case REACT_FILE_TEMPLATE[4]: {
      data = createTypesFile(folderName);
      break;
    }
    case REACT_FILE_TEMPLATE[6]: {
      data = createConstantsFile(folderName);
      break;
    }
  }

  const { fileName, template } = data;
  return createFile(`${dir}/${fileName}`, template);
};
