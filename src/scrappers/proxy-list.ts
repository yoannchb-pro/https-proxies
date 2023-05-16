import fetch from "node-fetch";
import { defineAnonymityLevel } from "../utils";
import Proxy from "../types/Proxy";

async function ProxyListScrapper() {
  const protocols = ["http", "https"];
  const proxies: Proxy[] = [];

  for (const protocol of protocols) {
    const req = await fetch(
      "https://www.proxy-list.download/api/v2/get?l=en&t=" + protocol
    );
    const { LISTA: httpProxies } = (await req.json()) as any;
    for (const proxy of httpProxies) {
      proxies.push({
        ip: proxy.IP,
        port: proxy.PORT,
        country: proxy.ISO,
        anonimity: defineAnonymityLevel(proxy.ANON, [
          "Transparent",
          "",
          "Elite",
        ]),
        https: protocol === "https",
      });
    }
  }

  return proxies;
}

export default ProxyListScrapper;
