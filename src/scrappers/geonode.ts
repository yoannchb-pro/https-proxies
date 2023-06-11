import fetch from "node-fetch";
import Proxy from "../types/Proxy";
import { defineAnonymityLevel } from "../utils";

async function GeonodeScrapper() {
  const proxies: Proxy[] = [];

  const req = await fetch(
    "https://proxylist.geonode.com/api/proxy-list?limit=500&page=1&sort_by=lastChecked&sort_type=desc&protocols=http,https"
  );
  const { data: httpProxies } = (await req.json()) as any;

  for (const proxy of httpProxies) {
    proxies.push({
      ip: proxy.ip,
      port: parseInt(proxy.port),
      country: proxy.country,
      anonymity: defineAnonymityLevel(proxy.anonymityLevel, [
        "transparent",
        "anonymous",
        "elite",
      ]),
      https: proxy.protocols.includes("https"),
      speed: Math.round(proxy.latency),
    });
  }

  return proxies;
}

export default GeonodeScrapper;
