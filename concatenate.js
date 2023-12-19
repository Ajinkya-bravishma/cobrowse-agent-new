const fs = require("fs-extra");
const concat = require("concat");

(async function build() {
  const files = [
    "./dist/cobrowse-widget/runtime.js",
    "./dist/cobrowse-widget/polyfills.js",
    "./dist/cobrowse-widget/main.js",
  ];
  // "./dist/cobrowse-widget/scripts.js",
  // await fs.ensureDir("elements");
  await fs.ensureDir("./dist/cobrowse-widget/elements");
  await concat(
    files,
    "./dist/cobrowse-widget/elements/agent-cobrowse-angular-widget.js"
  );

  await fs.copyFile(
    "./dist/cobrowse-widget/styles.css",
    "./dist/cobrowse-widget/elements/styles.css"
  );

  await fs.copyFile(
    './web.config',
    "./dist/cobrowse-widget/web.config"
  );
})();

// testing with old widget

// const fs = require("fs-extra");
// const concat = require("concat");

// (async function build() {
//   const files = [
//     "./dist/cobrowse-widget/runtime.js",
//     "./dist/cobrowse-widget/polyfills.js",
//     "./dist/cobrowse-widget/main.js",
//     "./dist/cobrowse-widget/scripts.js",
//   ];

//   // await fs.ensureDir("elements");
//   await fs.ensureDir("./dist/cobrowse-widget/elements");
//   await concat(
//     files,
//     "./dist/cobrowse-widget/elements/angular-widget-userdetails-exchangerate.js"
//   );

//   await fs.copyFile(
//     "./dist/cobrowse-widget/styles.css",
//     "./dist/cobrowse-widget/elements/styles.css"
//   );
// })();
