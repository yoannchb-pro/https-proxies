import { getProxiesFromTable } from "../utils";

function USProxyScrapper() {
  return getProxiesFromTable(
    "https://www.us-proxy.org/",
    {
      ip: 0,
      port: 1,
      country: 2,
      anonimity: 4,
      https: 6,
    },
    ["transparent", "anonymous", "elite proxy"],
    "yes"
  );
}

export default USProxyScrapper;
