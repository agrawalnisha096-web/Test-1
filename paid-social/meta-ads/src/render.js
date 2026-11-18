// Renders each .ad in creatives.html to a PNG at its native size (1080 wide).
// Usage: node paid-social/meta-ads/src/render.js
const path = require('path');
const { chromium } = require('playwright');

const NAMES = {
  a1: '01-hospitality-profit-by-venue-4x5',
  a2: '02-monday-7am-notifications-4x5',
  a3: '03-copy-paste-calculator-4x5',
  a4: '04-key-person-risk-text-1x1',
  a5: '05-spreadsheet-vs-dashboard-logistics-4x5',
  a6: '06-local-yatala-depots-4x5',
  a7: '07-brisbane-north-coffee-1x1',
  a8: '08-clinics-profit-by-clinic-4x5',
  a2s: '09-monday-7am-notifications-story-9x16',
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 2100 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'creatives.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  for (const [id, name] of Object.entries(NAMES)) {
    await page.locator('#' + id).screenshot({ path: path.join(__dirname, '..', name + '.png') });
    console.log('wrote', name);
  }
  await browser.close();
})();
