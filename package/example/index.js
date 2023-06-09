const { getProxy } = require("../dist");

async function example() {
  const proxy = await getProxy({ https: true });
  console.log(proxy);
}

example();
