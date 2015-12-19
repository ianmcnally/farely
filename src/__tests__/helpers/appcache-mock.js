import AppCacheManager from '../../services/app_cache_manager'

const {
  stub
} = sinon

before(() => stub(AppCacheManager, 'watchForUpdates'))

after(() => AppCacheManager.watchForUpdates.restore())

