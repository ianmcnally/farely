const confirmReload = () => confirm('A new version of Farely is available. Launch it?') //eslint-disable-line no-alert

const confirmIfUpdateReady = () => {
  if (window.applicationCache.status !== window.applicationCache.UPDATEREADY) { return }
  if (confirmReload()) { window.location.reload() }
}

const watchForUpdates = () => {
  if (!window.applicationCache) { return }
  window.applicationCache.addEventListener('updateready', confirmIfUpdateReady)
}

export default { watchForUpdates }
