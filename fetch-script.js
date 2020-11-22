function timeout(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

let bagLink = document.querySelectorAll('[data-ui-name="Collector\'s Bag"]')[0];
let result = {};

async function navigate(card) {
  let result = {};

  card.click();
  await timeout(1000);

  const key = location.href.split("/").pop();
  const ticks = document.querySelectorAll('[class^="Collectable__tick__"]');

  ticks.forEach((tick) => {
    const previous = result[key] || [];
    result[key] = [tick.previousSibling.textContent, ...previous];
    // result[tick.previousSibling.textContent] = true;
  });

  bagLink.click(); // could also be history.back()
  await timeout(1000);

  return result;
}

function parseResult(value) {
  const allowedValues = {
    "suit-of-cups-tarot-cards": {
      remove: " of Cups Tarot Card",
      prefix: "cups_",
    },
    "suit-of-pentacles-tarot-cards": {
      remove: " of Pentacles Tarot Card",
      prefix: "pentacles_",
    },
    "suit-of-wands-tarot-cards": {
      remove: " of Wands Tarot Card",
      prefix: "wands_",
    },
    "suit-of-swords-tarot-cards": {
      remove: " of Swords Tarot Card",
      prefix: "swords_",
    },
  };

  const collected = {};

  Object.keys(allowedValues).forEach((key) => {
    if (value[key]) {
      value[key].forEach((item) => {
        const name =
          allowedValues[key].prefix +
          item.replace(allowedValues[key].remove, "").toLocaleLowerCase();
        collected[`collected.${name}`] = "true";
        collected[`amount.${name}`] = "1";
      });
    }
  });

  collected["main.date"] = "2020-11-22";
  collected["main.date.isMenuOpened"] = "true";
  collected.length = Object.keys(collected).length;
  collected.version = 2;

  return collected;
}

function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

(async function main() {
  // const length = document.querySelectorAll('*[data-ui-name="rdrCard"]').length;

  let result = {};

  // We need to recompute `document.querySelectorAll('*[data-ui-name="rdrCard"]')` each time as the DOM changes between different pages
  // TODO: for (const index of [...Array(length).keys()]) {
  // Only tarot cards for now
  for (const index of [4, 5, 6, 7]) {
    const card = document.querySelectorAll('*[data-ui-name="rdrCard"]')[index];
    result = { ...result, ...(await navigate(card)) };
  }

  download(
    JSON.stringify(parseResult(result)),
    "result.json",
    "javascript/json"
  );
})();
