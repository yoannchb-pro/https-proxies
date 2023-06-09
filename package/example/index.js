const { getProxy } = require("../dist");

async function example() {
  const proxy = await getProxy();
  console.log(proxy);
}

example();
