import ProxyListScrapper from "./scrappers/proxy-list";
import ProxyScrapeScrapper from "./scrappers/proxyscrape";
import USProxyScrapper from "./scrappers/us-proxy";
import Proxy from "./types/Proxy";
import fs from "fs";
import path from "path";
import tempjs from "tempjs-template";
import { createLogs, toCSV, toTXT } from "./utils";
import "./types/ProxyCheck";
import ProxyCheck from "./types/ProxyCheck";
import FreeProxyListNetScrapper from "./scrappers/free-proxy-list-net";
import GeonodeScrapper from "./scrappers/geonode";

const proxyCheck: ProxyCheck = require("proxy-check");

const logs = createLogs();
const scrappers = [
  { url: "https://www.proxy-list.download", fn: ProxyListScrapper },
  { url: "https://www.us-proxy.org", fn: USProxyScrapper },
  { url: "https://proxyscrape.com/free-proxy-list", fn: ProxyScrapeScrapper },
  { url: "https://free-proxy-list.net/", fn: FreeProxyListNetScrapper },
  { url: "https://geonode.com/free-proxy-list", fn: GeonodeScrapper },
];

async function getProxies() {
  logs.register("init", "Starting getting proxies");

  let finalProxies: Proxy[] = [];
  let failedProxies = 0;
  const proxiesIp = new Set<string>();

  const successList: string[] = [];
  const failedList: string[] = [];

  for (const scrapper of scrappers) {
    try {
      logs.register("scrapping", `Scrapping: ${scrapper.url}`);
      const proxies = await scrapper.fn();

      logs.register("scrapping", `Amount of proxies: ${proxies.length}`);

      const filteredProxies = await proxies.filter(async (proxy) => {
        const alreadyAdded = proxiesIp.has(proxy.ip);
        if (!alreadyAdded) {
          const valide = await proxyCheck({
            host: proxy.ip,
            port: proxy.port,
          }).catch(() => false);

          if (!valide) {
            failedProxies++;
            logs.register(
              "proxy check",
              `${proxy.ip}:${proxy.port} ECONNRESET`
            );
            return false;
          }

          logs.register(
            "proxy check",
            `${proxy.ip}:${proxy.port} added with success`
          );
          proxiesIp.add(proxy.ip);
          return true;
        }

        failedProxies++;
        logs.register(
          "proxy check",
          `${proxy.ip}:${proxy.port} proxy already added`
        );
        return false;
      });

      logs.register(
        "scrapping",
        `Amount of final proxies: ${filteredProxies.length} for ${scrapper.url}`
      );

      finalProxies = finalProxies.concat(filteredProxies);

      successList.push(scrapper.url);
    } catch (e) {
      console.error(e);
      logs.register("error", e);
      failedList.push(scrapper.url);
    }
  }

  const data = {
    lastUpdate: new Date(),
    count: finalProxies.length,
    successList,
    failedList,
    proxies: finalProxies,
  };

  logs.register("sucess", `${finalProxies.length} proxies results`);
  logs.register("failed", `${failedProxies} failed or duplicate proxies`);

  /* JSON */
  fs.writeFileSync(
    path.resolve(__dirname, "../proxies.json"),
    JSON.stringify(data)
  );
  logs.register("save", "JSON created with success");

  /* CSV */
  fs.writeFileSync(
    path.resolve(__dirname, "../proxies.csv"),
    toCSV(data.proxies, [
      "ip",
      "port",
      "country",
      "anonymity",
      "https",
      "speed",
    ])
  );
  logs.register("save", "CSV created with success");

  /* TXT */
  fs.writeFileSync(
    path.resolve(__dirname, "../proxies.txt"),
    toTXT(data.proxies)
  );
  logs.register("save", "TXT created with success");

  /* README */
  const template = path.resolve(__dirname, "../templates/TEMPLATE.md");
  const httpsProxiesLength = data.proxies.filter((proxy) => proxy.https).length;
  const httpProxiesLength = data.count - httpsProxiesLength;
  let numberProxiesWithValidSpeed = 0;
  const averageSpeed = Math.round(
    data.proxies.reduce((a, b) => {
      if (b.speed) {
        numberProxiesWithValidSpeed++;
        a += b.speed;
      }
      return a;
    }, 0) / numberProxiesWithValidSpeed
  );
  const countries: string[] = [];
  const anonymity = { unknown: 0, low: 0, average: 0, high: 0 };
  for (const proxy of data.proxies) {
    const country = proxy.country;
    if (country && !countries.includes(country)) countries.push(country);
    switch (proxy.anonymity) {
      case 1:
        anonymity.low++;
        break;
      case 2:
        anonymity.average++;
        break;
      case 3:
        anonymity.high++;
        break;
      default:
        anonymity.unknown++;
    }
  }
  fs.writeFileSync(
    path.resolve(__dirname, "../README.md"),
    tempjs.compileFromFile(template, {
      data,
      httpProxiesLength,
      httpsProxiesLength,
      averageSpeed,
      countries,
      anonymity,
    })
  );
  logs.register("save", "README generated with success");

  /* LOGS */
  logs.save(path.resolve(__dirname, "../bot.logs"));
}

getProxies().catch((e) => {
  console.error(e);
  logs.register("fatal error", e);
  logs.save(path.resolve(__dirname, "../bot.logs"));
});
