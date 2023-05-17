import { getProxiesFromTable } from "../utils";

function USProxyScrapper() {
  return getProxiesFromTable(
    "https://www.us-proxy.org/",
    {
      ip: 0,
      port: 1,
      country: 2,
      anonymity: 4,
      https: 6,
      speed: null,
    },
    ["transparent", "anonymous", "elite proxy"],
    "yes"
  );
}

export default USProxyScrapper;
