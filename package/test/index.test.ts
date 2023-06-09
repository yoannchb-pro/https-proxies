import { getProxy, waitProxiesUpdated } from "../dist";

describe("Global test", () => {
  it("Should get a proxy", async () => {
    const proxy = await getProxy();
    expect(proxy).toBeTruthy();
  });

  it("Should get a proxy with anonymity 0 or 1", async () => {
    const proxy = await getProxy({ anonymity: [0, 1] });
    expect(proxy.anonymity === 1 || proxy.anonymity === 0).toBeTruthy();
  });

  it("Should get a proxy with country CA or US", async () => {
    const proxy = await getProxy({ country: ["CA", "US"] });
    expect(proxy.country === "CA" || proxy.country === "US").toBeTruthy();
  });

  it("Should get a https proxy", async () => {
    const proxy = await getProxy({ https: true });
    expect(proxy.https).toBeTruthy();
  });

  it("Should get a proxy with port 80 or 81", async () => {
    const proxy = await getProxy({ port: [80, 81] });
    expect(proxy.port === 80 || proxy.port === 81).toBeTruthy();
  });

  it("Should get a proxy with speed <= 2000ms", async () => {
    const proxy = await getProxy({ maxSpeed: 2000 });
    expect(proxy.speed <= 2000).toBeTruthy();
  });
});
