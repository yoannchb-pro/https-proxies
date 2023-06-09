import fetch from "node-fetch";

type ProxyCheck = ({}: { host: string; port: number }) => Promise<boolean>;

const proxyCheck: ProxyCheck = require("proxy-check");

enum Anonymity {
  UNKNOWN = 0,
  LOW = 1,
  AVERAGE = 2,
  HIGH = 3,
}

type Proxy = {
  ip: string;
  port: number;
  country: string;
  anonymity: Anonymity;
  https: boolean;
  speed: number;
};

type JSONProxy = {
  lastUpdate: string;
  count: number;
  successList: string[];
  failedList: string[];
  proxies: Proxy[];
};

type Filters = {
  port?: number[];
  country?: string[];
  anonymity?: Anonymity[];
  https?: boolean;
  maxSpeed?: number;
};

let api: JSONProxy = null;

/**
 * Check if proxy list need update or not
 * @returns A boolean to describe if proxies have been updated or not
 */
async function updateProxiesOnNeed(): Promise<boolean> {
  const nextUpdateTime = new Date(api.lastUpdate);
  nextUpdateTime.setHours(nextUpdateTime.getHours() + 2);
  if (!api && nextUpdateTime <= new Date()) {
    const req = await fetch(
      "https://raw.githubusercontent.com/yoannchb-pro/https-proxies/main/proxies.json"
    );
    const response = (await req.json()) as JSONProxy;
    if (api.lastUpdate === response.lastUpdate) return false;
    api = response;
    return true;
  }
  return false;
}

/**
 * Wait the proxy list have been updated
 * @returns
 */
function waitProxiesUpdated(): Promise<void> {
  return new Promise(async (resolve) => {
    let updated: boolean;
    while ((updated = await updateProxiesOnNeed()) === false) {
      await new Promise((_) => setTimeout(_, 5000));
    }
    resolve();
  });
}

/**
 * Get a proxy with specific filters
 * @param filters
 * @returns
 */
async function getProxy(filters: Filters = {}): Promise<Proxy> {
  await updateProxiesOnNeed();

  const proxyIndex = api.proxies.findIndex((proxy) => {
    const filtersKeys = Object.keys(filters);
    return filtersKeys.length === 0
      ? true
      : filtersKeys.every((filterName) => {
          const filter: any = filters[filterName as keyof Filters];
          switch (filterName) {
            case "maxSpeed":
              return proxy.speed < filter;
            case "https":
              return proxy.https === filter;
            case "anonymity":
              return filter.includes(proxy.anonymity);
            case "country":
              return filter.includes(proxy.country);
            case "port":
              return filter.includes(proxy.port);
            default:
              return true;
          }
        });
  });

  if (proxyIndex === -1)
    throw new Error(
      "No proxy available you can wait for next update by using 'waitProxiesUpdated' function"
    );

  const proxy = api.proxies.splice(proxyIndex, 1)[0];

  const isProxyValid = await proxyCheck({
    host: proxy.ip,
    port: proxy.port,
  }).catch((_) => false);

  if (!isProxyValid) return await getProxy();

  return proxy;
}

export { getProxy, waitProxiesUpdated };
