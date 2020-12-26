interface IReactTemplate {
  isWithStyle?: boolean;
  isWithState?: boolean;
}

interface ITemplate {
  fileName: string;
  template: string;
}

interface IFolderCommand {
  dir: string;
  name: string;
  isNative?: boolean;
}

type TGenerateReact = (
  folderName: string,
  reactTemplate?: IReactTemplate | undefined
) => ITemplate;
