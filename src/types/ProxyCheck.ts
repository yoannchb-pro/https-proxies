type ProxyCheck = ({}: { host: string; port: number }) => Promise<boolean>;
export default ProxyCheck;
