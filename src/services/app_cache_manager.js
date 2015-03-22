var confirmIfUpdateReady = () => {
  if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
    if (confirm('A new version of Farely is available. Launch it?')) {
      window.location.reload();
    }
  }
};

export default {
  watchForUpdates : () => {
    if (!window.applicationCache) { return; }
    window.applicationCache.addEventListener('updateready', confirmIfUpdateReady);
  }
}