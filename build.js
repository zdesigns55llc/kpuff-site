// Builds the site: content/site.json + src/template.html -> dist/index.html
// No dependencies. Run with:  node build.js
const fs = require("fs");
const path = require("path");

const root = __dirname;
const dist = path.join(root, "dist");
const site = JSON.parse(fs.readFileSync(path.join(root, "content/site.json"), "utf8"));
let html = fs.readFileSync(path.join(root, "src/template.html"), "utf8");

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// "/images/a.jpg" -> "images/a.jpg" so the page also works when opened straight from a folder
const asset = (p) => String(p || "").replace(/^\//, "");
// Safe to place inside a <script> tag
const jsonForScript = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

const gallery = (site.gallery || []).map((g) => {
  if (g.image) {
    return `      <div class="ph has"><img src="${esc(asset(g.image))}" alt="${esc(g.title)} by ${esc(site.businessName)}" loading="lazy"><b class="cap">${esc(g.title)}</b></div>`;
  }
  return `      <div class="ph"><b>${esc(g.title)}</b><span>photo coming soon</span></div>`;
}).join("\n");

const services = (site.services || []).map((s) =>
  `      <div class="svc"><b>${esc(s.name)}</b><span>${esc(s.description)}</span></div>`).join("\n");

const serviceOptions = (site.services || []).map((s) => `<option>${esc(s.name)}</option>`)
  .concat(["<option>Not sure yet</option>"]).join("");

const strip = (site.stripItems || []).map((t) => `<span>${esc(t)}</span>`).join("<span>&bull;</span>");

const phone = String(site.bookingPhone || "").replace(/[^\d+]/g, "");

const values = {
  siteTitle: esc(site.siteTitle),
  metaDescription: esc(site.metaDescription),
  businessName: esc(site.businessName),
  badge: esc(site.badge),
  tagline: esc(site.tagline),
  heroImage: esc(asset(site.heroImage)),
  heroAlt: esc(site.heroAlt),
  bookButtonText: esc(site.bookButtonText),
  workButtonText: esc(site.workButtonText),
  stripItems: strip,
  workHeading: esc(site.workHeading),
  workIntro: esc(site.workIntro),
  gallery,
  servicesHeading: esc(site.servicesHeading),
  servicesIntro: esc(site.servicesIntro),
  services,
  serviceOptions,
  bookingHeading: esc(site.bookingHeading),
  bookingIntro: esc(site.bookingIntro),
  footerName: esc(site.footerName),
  footerCity: esc(site.footerCity),
  footerLinkText: esc(site.footerLinkText),
  phoneJson: jsonForScript(phone),
  messengerJson: jsonForScript(String(site.messengerLink || "")),
  bookingScript: fs.readFileSync(path.join(root, "src/booking.js"), "utf8"),
};

// Single pass so text inside a value can never be treated as a placeholder
html = html.replace(/\{\{(\w+)\}\}/g, (m, key) => {
  if (!(key in values)) throw new Error("Template placeholder has no value: " + key);
  return values[key];
});

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, "index.html"), html);
fs.copyFileSync(path.join(root, "src/styles.css"), path.join(dist, "styles.css"));
fs.cpSync(path.join(root, "images"), path.join(dist, "images"), { recursive: true });
console.log("Built dist/index.html (" + Math.round(html.length / 1024) + " KB)");
