interface ICreateComponentParameters {
  dir: string;
  name: string;

  reactTemplateFunction: TGenerateReact;

  isNative?: boolean;
}
