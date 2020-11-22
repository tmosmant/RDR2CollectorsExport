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
    "family-heirlooms": {
      remove: "",
      prefix: "heirlooms_",
      replacement: {
        from: " ",
        to: "_",
      },
      exceptions: {
        heirlooms_new_guinea_rosewood_hairbrush: [
          "heirlooms_new_guinea_rosewood",
        ],
        heirlooms_carved_wooden_hairpin: ["heirlooms_carved_wooden"],
      },
    },
    "antique-alcohol-bottles": {
      remove: "",
      prefix: "bottle_",
      replacement: {
        from: " ",
        to: "_",
      },
      exceptions: {
        bottle_cognac: ["bottle_cognac_bottle"],
        bottle_tennessee_whiskey: ["bottle_tennesee_whiskey"],
      },
    },
    "bird-eggs": {
      remove: " Egg",
      prefix: "egg_",
      exceptions: {
        egg_hawk: ["egg_hawk_1", "egg_hawk_2"],
        egg_eagle: ["egg_eagle_1", "egg_eagle_2"],
      },
    },
  };

  const collected = {};

  Object.keys(allowedValues).forEach((key) => {
    if (value[key]) {
      value[key].forEach((item) => {
        const transform = allowedValues[key];

        let name = transform.prefix + item.replaceAll(transform.remove, "");

        if (transform.replacement) {
          console.log(name, transform.replacement);
          name = name.replaceAll(
            transform.replacement.from,
            transform.replacement.to
          );
        }

        name = name.toLocaleLowerCase();

        let names = [name];

        if (transform.exceptions && transform.exceptions[name]) {
          names = transform.exceptions[name];
        }

        names.forEach((name) => {
          collected[`collected.${name}`] = "true";
          collected[`amount.${name}`] = "1";
        });
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
  const file = new Blob([data], { type: type });
  const a = document.createElement("a"),
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

(async function main() {
  // TODO: const length = document.querySelectorAll('*[data-ui-name="rdrCard"]').length;

  let result = {};

  // We need to recompute `document.querySelectorAll('*[data-ui-name="rdrCard"]')` each time as the DOM changes between different pages
  // TODO: for (const index of [...Array(length).keys()]) {
  for (const index of [4, 5, 6, 7, 12, 13, 15]) {
    const card = document.querySelectorAll('*[data-ui-name="rdrCard"]')[index];
    result = { ...result, ...(await navigate(card)) };
  }

  download(
    JSON.stringify(parseResult(result)),
    "result.json",
    "javascript/json"
  );
})();
