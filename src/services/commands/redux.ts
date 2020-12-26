import { createFolderName, generateFolderStructure, VSCode } from '../utils';

import {
  createReduxAction, createReduxConstants, createReduxReducer
} from '../templates/redux';

const commandCreateRedux = async (param: IFolderCommand) => {
  const { dir, name, isNative } = param;

  const generateFile = generateFolderStructure(dir, name);
  const folderName = createFolderName(name);

  await generateFile(createReduxAction(folderName, isNative));
  await generateFile(createReduxConstants(folderName));
  await generateFile(createReduxReducer(folderName));
};

export const createRedux = (isNative?: boolean) => async (args: any) => {
  const name = await VSCode.createInput("Redux name");
  if (!name || !args) {
    return;
  }

  const dir = args.fsPath;
  commandCreateRedux({ dir, name, isNative });
};
