import Proxy from "./types/Proxy";
import fetch from "node-fetch";
import fs from "fs";

const { FastHTMLParser } = require("fast-html-dom-parser");

/**
 * Convert an anonymity string to a number
 * @param anonymity
 * @param levels
 * @returns
 */
function defineAnonymityLevel(anonymity: string, levels: string[]) {
  const level = levels.indexOf(anonymity.trim());
  return level === -1 ? 0 : level + 1;
}

/**
 * Get proxies from an html table
 * @param url
 * @param columns
 * @param anonimityLevels
 * @param httpsKeyWord
 * @returns
 */
async function getProxiesFromTable({
  url,
  columns,
  anonimityLevels,
  httpsKeyWord,
}: {
  url: string;
  columns: { [K in keyof Proxy]: number };
  anonimityLevels: string[];
  httpsKeyWord?: string;
}): Promise<Proxy[]> {
  const req = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    },
  });
  const html = await req.text();

  const proxies: Proxy[] = [];

  const document = new FastHTMLParser(html);
  const table = document.getElementsByTagName("table")[0];
  const lines = table.getElementsByTagName("tr");

  //we start from 1 because the first line is the header
  for (let i = 1; i < lines.length; ++i) {
    const line = lines[i].getElementsByTagName("td");
    proxies.push({
      ip: line[columns["ip"]].textContent,
      port: parseInt(line[columns["port"]].textContent),
      country: line[columns["country"]].textContent,
      anonymity: defineAnonymityLevel(
        line[columns["anonymity"]].textContent,
        anonimityLevels
      ),
      https: httpsKeyWord
        ? line[columns["https"]].textContent?.trim() === httpsKeyWord
        : false,
      speed: columns["speed"] === null ? null : line[columns["speed"]],
    });
  }

  return proxies;
}

/**
 * Convert proxies to csv format
 * @param proxies
 * @param headers
 * @returns
 */
function toCSV(proxies: Proxy[], headers: (keyof Proxy)[]) {
  const csv: string[] = [headers.join(",")];
  for (const proxy of proxies) {
    csv.push(Object.values(proxy).join(","));
  }
  return csv.join("\n");
}

/**
 * Convert proxies to txt format
 * @param proxies
 */
function toTXT(proxies: Proxy[]) {
  return proxies.map((proxy) => `${proxy.ip}:${proxy.port}`).join("\n");
}

/**
 * Bot logs
 * @returns
 */
function createLogs() {
  const logs: { type: string; message: string }[] = [];
  return {
    register(type: string, message: string) {
      logs.push({ type: `[${type.toUpperCase()}]`, message });
    },
    save(path: string) {
      fs.writeFileSync(
        path,
        logs.map((log) => log.type + " " + log.message).join("\n")
      );
    },
  };
}

/**
 * Async filter for array
 * @param arr
 * @param filterFn
 * @returns
 */
async function filterAsync<T>(
  arr: T[],
  filterFn: (item: T) => Promise<boolean>
): Promise<T[]> {
  const filterResults = await Promise.all(arr.map(filterFn));
  return arr.filter((_, index) => filterResults[index]);
}

export {
  defineAnonymityLevel,
  getProxiesFromTable,
  toCSV,
  toTXT,
  createLogs,
  filterAsync,
};
