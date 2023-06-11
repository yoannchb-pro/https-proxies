import fetch from "node-fetch";
import http from "http";

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

type ProxyCheckParams = {
  ip: string;
  port: number;
  timeout?: number;
};

let api: JSONProxy = null;
const errors = ["Bad proxy string", "Proxy offline"];

/**
 * Check if a proxy is valid or not
 * @param proxy
 * @returns
 */
function proxyCheck(proxy: ProxyCheckParams): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const proxyOptions = {
      method: "CONNECT",
      path: "www.google.com:443",
      timeout: proxy.timeout ?? 2000,
      agent: false,
      host: proxy.ip,
      port: proxy.port,
    };

    const req = http.request(proxyOptions);

    req.on("connect", (res) => {
      req.destroy();
      if (res.statusCode === 200) {
        return resolve(true);
      } else {
        return reject(errors[1]);
      }
    });

    req.on("timeout", () => {
      req.destroy();
    });

    req.on("error", (err) => {
      return reject(err || errors[1]);
    });
    req.end();
  });
}

/**
 * Check if proxy list need update or not
 * @returns A boolean to describe if proxies have been updated or not
 */
async function updateProxiesOnNeed(): Promise<boolean> {
  async function update() {
    const req = await fetch(
      "https://raw.githubusercontent.com/yoannchb-pro/https-proxies/main/proxies.json"
    );
    const response = (await req.json()) as JSONProxy;
    if (api?.lastUpdate === response.lastUpdate) return false;
    api = response;
    return true;
  }

  if (!api) return await update();

  const nextUpdateTime = new Date(api?.lastUpdate);
  nextUpdateTime.setHours(nextUpdateTime.getHours() + 2);
  if (nextUpdateTime <= new Date()) return await update();

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
 * Find a proxy with specified filters
 * @param filters
 * @returns
 */
function findProxyWithFilters(filters: Filters) {
  const proxyIndex = api.proxies.findIndex((proxy) => {
    const filtersKeys = Object.keys(filters);
    return filtersKeys.length === 0
      ? true
      : filtersKeys.every((filterName) => {
          const filterValue: any = filters[filterName as keyof Filters];
          switch (filterName) {
            case "maxSpeed":
              return proxy.speed ?? Infinity < filterValue;
            case "https":
              return proxy.https === filterValue;
            case "anonymity":
              return filterValue?.includes(proxy.anonymity);
            case "country":
              return filterValue?.includes(proxy.country);
            case "port":
              return filterValue?.includes(proxy.port);
            default:
              return true;
          }
        });
  });
  return proxyIndex;
}

/**
 * Get a proxy with specific filters
 * @param filters
 * @returns
 */
async function getProxy(filters: Filters = {}): Promise<Proxy> {
  await updateProxiesOnNeed();

  let isProxyValid = false;
  while (!isProxyValid) {
    const proxyIndex = findProxyWithFilters(filters);
    if (proxyIndex === -1) return null;

    const proxy = api.proxies.splice(proxyIndex, 1)[0];

    isProxyValid = await proxyCheck({
      ip: proxy.ip,
      port: proxy.port,
      timeout: proxy.speed,
    }).catch(() => false);

    return proxy;
  }
}

export { getProxy, waitProxiesUpdated };
