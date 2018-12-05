'use strict';

module.exports = app => {
  const prefix = '/v0';
  const { router, controller } = app;
  router.prefix(prefix);

  router.post('test', controller.test.index);

  router.post('/login', controller.session.login);
  router.post('/logout', controller.session.logout);
  router.get('/current', app.jwt, controller.session.current);

  router.post('/admin/emails/:id/send', app.jwt, controller.admin.email.send);
  router.post('/admin/notices/:id/send', app.jwt, controller.admin.notice.send);

  router.get('/admin/servers', app.jwt, controller.admin.server.index);
  router.get('/admin/servers/online', app.jwt, controller.admin.server.getOnlineNumber);

  const admin = controller.admin.resource;
  router.post('/admin/:resources/search', app.jwt, admin.search);
  router.delete('/admin/:resources/destroyAll', app.jwt, admin.destroyAll);
  router.resources('/admin/:resources', app.jwt, admin);
};
