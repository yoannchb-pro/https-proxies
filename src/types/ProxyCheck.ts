type ProxyCheck = (
  proxy:
    | {
        host: string;
        port: number;
        proxyAuth?: string;
      }
    | string
) => Promise<boolean>;
export default ProxyCheck;
