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
        anonymity: defineAnonymityLevel(proxy.ANON, [
          "Transparent",
          "Anonymous",
          "Elite",
        ]),
        https: protocol === "https",
        speed: proxy.PING,
      });
    }
  }

  return proxies;
}

export default ProxyListScrapper;
