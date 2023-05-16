import ProxyListScrapper from "./scrappers/proxy-list";
import ProxyScrapeScrapper from "./scrappers/proxyscrape";
import USProxyScrapper from "./scrappers/us-proxy";
import Proxy from "./types/Proxy";
import fs from "fs";
import path from "path";

const scrappers = [ProxyListScrapper, USProxyScrapper, ProxyScrapeScrapper];

(async function () {
  let finalProxies: Proxy[] = [];

  for (const scrapper of scrappers) {
    try {
      const proxies = await scrapper();
      finalProxies = finalProxies.concat(proxies);
    } catch (e) {
      console.error(e);
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../proxies.json"),
    JSON.stringify(finalProxies)
  );
})();
