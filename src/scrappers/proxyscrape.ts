import fetch from "node-fetch";
import Proxy from "../types/Proxy";

async function ProxyScrapeScrapper() {
  const proxies: Proxy[] = [];

  const req = await fetch(
    "https://api.proxyscrape.com/proxytable.php?nf=true&country=all"
  );
  const { http: httpProxies } = (await req.json()) as any;

  for (const proxy in httpProxies) {
    const [ip, port] = proxy.split(":");
    proxies.push({
      ip,
      port: parseInt(port),
      country: httpProxies[proxy].country,
      anonimity: httpProxies[proxy].anonymity,
      https: false,
    });
  }

  return proxies;
}

export default ProxyScrapeScrapper;
