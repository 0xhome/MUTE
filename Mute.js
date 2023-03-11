// https://twitter.com/settings/muted_keywords
// CTRL + Shift + J


function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(element),
    "value"
  ).set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
}

function delay(f = 1) {
  return new Promise((res) => setTimeout(res, f * 1000)); 	// Increase this if it goes async.
}

`word1
word2
word3
`
  .split(/\W+/)
  .reduce(async function go(prev, keyword) {
    await prev;

    document.querySelector('[aria-label="Add muted word or phrase"]').click();
    await delay();

    const el = document.querySelector("input[name=keyword]");
    setNativeValue(el, keyword);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    await delay();

    const saveButton = document
    .evaluate(
      '//*[contains(text(), "Save")]/ancestor::*[@role = "button"]',
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    )

    saveButton.snapshotItem(0).click()
    await delay()

    // Check If the word has already been muted.
    if (document.querySelector('[aria-live="assertive"]')) {
      document.querySelector('[aria-label="Back"]').click();
    }

    return delay();
  }, Promise.resolve());
