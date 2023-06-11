import { getProxiesFromTable } from "../utils";

function FreeProxyListNetScrapper() {
  return getProxiesFromTable({
    url: "https://free-proxy-list.net/",
    columns: {
      ip: 0,
      port: 1,
      country: 2,
      anonymity: 4,
      https: 6,
      speed: null,
    },
    anonimityLevels: ["transparent", "anonymous", "elite proxy"],
    httpsKeyWord: "yes",
  });
}

export default FreeProxyListNetScrapper;
