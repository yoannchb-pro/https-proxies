import ProxyListScrapper from "./scrappers/proxy-list";
import ProxyScrapeScrapper from "./scrappers/proxyscrape";
import USProxyScrapper from "./scrappers/us-proxy";
import Proxy from "./types/Proxy";
import fs from "fs";
import path from "path";
import tempjs from "tempjs-template";
import { toCSV, toTXT } from "./utils";

const scrappers = [
  { url: "https://www.proxy-list.download", fn: ProxyListScrapper },
  { url: "https://www.us-proxy.org", fn: USProxyScrapper },
  { url: "https://proxyscrape.com/free-proxy-list", fn: ProxyScrapeScrapper },
];

(async function () {
  let finalProxies: Proxy[] = [];
  const proxiesIp = new Set<string>();

  const successList: string[] = [];
  const failedList: string[] = [];

  for (const scrapper of scrappers) {
    try {
      const proxies = await scrapper.fn();

      const filteredProxies = proxies.filter((proxy) => {
        const alreadyAdded = proxiesIp.has(proxy.ip);
        if (!alreadyAdded) {
          proxiesIp.add(proxy.ip);
          return true;
        }
        return false;
      });

      finalProxies = finalProxies.concat(filteredProxies);

      successList.push(scrapper.url);
    } catch (e) {
      failedList.push(scrapper.url);
      console.error(e);
    }
  }

  const data = {
    lastUpdate: new Date(),
    count: finalProxies.length,
    successList,
    failedList,
    proxies: finalProxies,
  };

  //JSON
  fs.writeFileSync(
    path.resolve(__dirname, "../proxies.json"),
    JSON.stringify(data)
  );
  //CSV
  fs.writeFileSync(
    path.resolve(__dirname, "../proxies.csv"),
    toCSV(data.proxies, ["ip", "port", "country", "anonymity", "https"])
  );
  //TXT
  fs.writeFileSync(
    path.resolve(__dirname, "../proxies.txt"),
    toTXT(data.proxies)
  );
  //README
  const template = path.resolve(__dirname, "../templates/TEMPLATE.md");
  fs.writeFileSync(
    path.resolve(__dirname, "../README.md"),
    tempjs.compileFromFile(template, { data })
  );
})();
