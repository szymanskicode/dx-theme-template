export const tryGetVersion = (): string => {
  const element: any = document.querySelector("meta[name='version']");
  return element ? element["content"] : "version-unspecified";
};
