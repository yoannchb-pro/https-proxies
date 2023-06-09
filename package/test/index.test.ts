import { getProxy, waitProxiesUpdated } from "../dist";

describe("Global test", () => {
  it("Should get a proxy", async () => {
    const proxy = await getProxy();
    expect(proxy).toBeTruthy();
  });
});
