interface IWebServerFactory {
  startup: (port: number) => void;
}

export { IWebServerFactory };
