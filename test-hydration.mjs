import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', exception => {
    errors.push(exception.message);
  });

  await page.goto('http://localhost:3005');
  await page.waitForTimeout(2000); // wait for hydration

  if (errors.length > 0) {
    console.log("ERRORS FOUND:");
    errors.forEach(e => console.log("- " + e));
  } else {
    console.log("No errors found!");
  }
  await browser.close();
})();
