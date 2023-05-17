const table = document.querySelector("table");
const indexer = document.querySelector("#indexer");
const update = document.querySelector("#update");

const LINE_PER_PAGE = 20;

async function getProxies() {
  const req = await fetch(
    "https://raw.githubusercontent.com/yoannchb-pro/https-proxies/main/proxies.json"
  );
  return req.json();
}

function generateTable(proxies) {
  const headers = Object.keys(proxies[0]);

  const headerLine = document.createElement("tr");
  for (const header of headers) {
    const column = document.createElement("th");
    column.textContent = header;
    headerLine.appendChild(column);
  }
  table.appendChild(headerLine);

  let index = 0;
  for (const proxy of proxies) {
    const line = document.createElement("tr");
    line.className = "proxy-line";
    if (index > LINE_PER_PAGE) line.style.display = "none";

    let columnIndex = 0;
    const proxyInformations = Object.values(proxy);
    for (const proxyInfo of proxyInformations) {
      const column = document.createElement("td");

      const header = headers[columnIndex];
      const span = document.createElement("span");
      span.textContent = header.toLocaleUpperCase() + ":";
      span.className = "mobile-header";

      column.appendChild(span);

      let text = proxyInfo;
      if (header === "anonymity") {
        const levels = ["-", "Low", "Average", "High"];
        text = levels[parseInt(text)];
      }
      if (header === "speed") {
        text = text === null ? "-" : text + " ms";
      }

      column.appendChild(document.createTextNode(text));

      line.appendChild(column);
      ++columnIndex;
    }

    table.appendChild(line);
    ++index;
  }
}

function generateIndexOptions(totalProxies) {
  const nbOptions = Math.round(totalProxies / LINE_PER_PAGE);
  const select = indexer.querySelector("select");
  for (let i = 0; i < nbOptions; ++i) {
    const option = document.createElement("option");
    option.textContent = i + 1;
    option.value = i;
    select.appendChild(option);
  }
  select.addEventListener("change", function () {
    const page = parseInt(select.selectedOptions[0].value);
    table.querySelectorAll(".proxy-line").forEach((el, index) => {
      if (
        index >= page * LINE_PER_PAGE &&
        index <= (page + 1) * LINE_PER_PAGE
      ) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });
  });
}

function setLastUpdate(date) {
  update.textContent = date.toLocaleString();
}

async function init() {
  const data = await getProxies();
  generateTable(data.proxies);
  generateIndexOptions(data.proxies.length);
  setLastUpdate(new Date(data.lastUpdate));
}

init();
