import { createReactState } from '../templates/react/state';
import {
  createFile, createFolderName, generateFolderStructure, VSCode
} from '../utils';

import { createReactIndex } from '../templates/react/index.template';
import { createReactTemplate } from '../templates/react/react';
import {
  createReactWithPropsTemplate
} from '../templates/react/react-with-props';
import { getNameByPath } from '../utils/create-components';

import {
  COMMAND, REACT_FILE_TEMPLATE, REACT_TYPE, STATE, STATE_STYLE, STYLE
} from '../../constants';

import { createReactStyle } from '../templates/react/styles';

const generateComponent = (parameters: ICreateComponentParameters) => async (
  template?: IReactTemplate
) => {
  const { dir, name, isNative, reactTemplateFunction } = parameters;
  const folderName = createFolderName(name);
  const generateFile = generateFolderStructure(dir, name);

  await generateFile(createReactIndex(folderName));
  await generateFile(reactTemplateFunction(folderName, template));

  if (!template) {
    return;
  }

  const { isWithState, isWithStyle } = template;
  if (isWithState) {
    await generateFile(createReactState(folderName, isNative));
  }
  if (isWithStyle) {
    await generateFile(createReactStyle(folderName, isNative));
  }
};

const [
  ONLY_COMPONENT,
  COMPONENT_AND_STATE,
  COMPONENT_AND_STYLE,
  COMPONENT_WITH_STYLE_AND_STATE,
] = COMMAND;

const createReactTemplateComponent = (
  isNative: boolean,
  reactTemplateFunction: TGenerateReact
) => async (args: any) => {
  const type = await VSCode.showDialog(COMMAND);
  const name = await VSCode.createInput("Component name");

  if (!name || !args) {
    return;
  }

  const dir = args.fsPath;
  const createFiles = generateComponent({
    dir,
    name,
    isNative,
    reactTemplateFunction,
  });

  switch (type) {
    case ONLY_COMPONENT: {
      return createFiles();
    }
    case COMPONENT_AND_STATE: {
      return createFiles(STATE);
    }
    case COMPONENT_AND_STYLE: {
      return createFiles(STYLE);
    }
    case COMPONENT_WITH_STYLE_AND_STATE: {
      return createFiles(STATE_STYLE);
    }
  }
};

export const createReactFile = (isNative: boolean) => async (args: any) => {
  const [COMPONENT, STATE, STYLE] = REACT_FILE_TEMPLATE;
  if (!args) {
    return;
  }

  const dir = args.fsPath;
  const type = await VSCode.showDialog(REACT_FILE_TEMPLATE);
  const name = await getNameByPath(dir, type, [COMPONENT]);

  if (!name) {
    return;
  }

  const folderName = createFolderName(name);
  let data: ITemplate;

  switch (type) {
    default:
    case COMPONENT: {
      data = createReactTemplate({ isNative })(folderName);
      break;
    }
    case STATE: {
      data = createReactState(folderName, isNative);
      break;
    }
    case STYLE: {
      data = createReactStyle(folderName, isNative);
      break;
    }
  }

  const { fileName, template } = data;
  return createFile(`${dir}/${fileName}`, template);
};

export const reactCommand = (isNative: boolean) => async (args: any[]) => {
  const [TEMPLATE_TYPE, TEMPLATE_WITH_PROPS_TYPE, FILE_TYPE] = REACT_TYPE;
  const type = await VSCode.showDialog(REACT_TYPE);

  switch (type) {
    default:
    case TEMPLATE_TYPE: {
      return createReactTemplateComponent(
        isNative,
        createReactTemplate({ isNative })
      )(args);
    }
    case TEMPLATE_WITH_PROPS_TYPE: {
      return createReactTemplateComponent(
        isNative,
        createReactWithPropsTemplate({ isNative })
      )(args);
    }
    case FILE_TYPE: {
      return createReactFile(isNative)(args);
    }
  }
};
