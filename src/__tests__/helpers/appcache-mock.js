import AppCacheManager from '../../services/app_cache_manager';

beforeEach(() => {
  spyOn(AppCacheManager, 'watchForUpdates');
});