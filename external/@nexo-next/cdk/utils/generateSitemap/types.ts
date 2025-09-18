interface IRoute {
  path: string;
  children?: IRoute[];
}

export interface ISitemapConfig {
  host: string;
  languages: readonly string[];
  defaultLang: string;
  routes: IRoute[];
}
