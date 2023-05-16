import Proxy from "./types/Proxy";
import fetch from "node-fetch";

const { FastHTMLParser } = require("fast-html-dom-parser");

/**
 * Convert an anonymity string to a number
 * @param anonymity
 * @param levels
 * @returns
 */
function defineAnonymityLevel(anonymity: string, levels: string[]) {
  const level = levels.indexOf(anonymity.trim());
  return level === -1 ? 0 : level;
}

/**
 * Get proxies from an html table
 * @param url
 * @param columns
 * @param anonimityLevels
 * @param httpsKeyWord
 * @returns
 */
async function getProxiesFromTable(
  url: string,
  columns: { [K in keyof Proxy]: number },
  anonimityLevels: string[],
  httpsKeyWord?: string
): Promise<Proxy[]> {
  const req = await fetch(url);
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
      anonimity: defineAnonymityLevel(
        line[columns["anonimity"]].textContent,
        anonimityLevels
      ),
      https: httpsKeyWord
        ? line[columns["https"]].textContent?.trim() === httpsKeyWord
        : false,
    });
  }

  return proxies;
}

export { defineAnonymityLevel, getProxiesFromTable };
