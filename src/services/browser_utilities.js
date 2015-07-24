const window = window || global || {};
const document = window.document;

const appRoot = document && document.body;

const canAppRegisterInBrowser = Boolean(document);

export default {appRoot, canAppRegisterInBrowser}
