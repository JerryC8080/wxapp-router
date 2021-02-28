import router from './routes/index';

App<IAppOption>({
  router,
  routes: router.getRoutes(),
})