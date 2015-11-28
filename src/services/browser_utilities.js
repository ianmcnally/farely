const window = window || global || {}
const document = window.document

const appRoot = document && document.getElementsByTagName('main')[0]

const canAppRegisterInBrowser = Boolean(document)

export default { appRoot, canAppRegisterInBrowser }
