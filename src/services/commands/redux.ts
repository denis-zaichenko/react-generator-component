import { createFolderName, generateFolderStructure, VSCode } from '../utils';

import {
  createReduxAction, createReduxConstants, createReduxReducer
} from '../templates/redux';

import { REDUX_TYPE } from '../../constants';

const commandCreateRedux = async (parameters: IFolderCommand) => {
  const { dir, name, isNative } = parameters;

  const generateFile = generateFolderStructure(dir, name);
  const folderName = createFolderName(name);

  await generateFile(createReduxAction(folderName, isNative));
  await generateFile(createReduxConstants(folderName));
  await generateFile(createReduxReducer(folderName));
};

export const createRedux = async (args: any) => {
  const [, NATIVE] = REDUX_TYPE;
  const isNative = (await VSCode.showDialog(REDUX_TYPE)) === NATIVE;
  const name = await VSCode.createInput("Redux name");

  if (!name || !args) {
    return;
  }

  const dir = args.fsPath;
  commandCreateRedux({ dir, name, isNative });
};
