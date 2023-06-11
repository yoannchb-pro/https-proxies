import http from "http";

const errors = ["Bad proxy string", "Proxy offline"];

type ProxyCheckParams = {
  ip: string;
  port: number;
  timeout?: number;
};

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

export default proxyCheck;
