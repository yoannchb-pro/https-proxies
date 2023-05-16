import { getProxiesFromTable } from "../utils";

function USProxyScrapper() {
  return getProxiesFromTable(
    "https://www.us-proxy.org/",
    {
      anonimity: 4,
      country: 2,
      https: 6,
      ip: 0,
      port: 1,
    },
    ["transparent", "anonymous", "elite proxy"],
    "yes"
  );
}

export default USProxyScrapper;
