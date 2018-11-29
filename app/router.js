'use strict';

module.exports = app => {
  const prefix = '/v0/';
  const { router, controller } = app;

  router.post(prefix + 'test', controller.test.index);

  router.post(prefix + 'login', controller.session.login);
  router.post(prefix + 'logout', controller.session.logout);
  router.get(prefix + 'current', app.jwt, controller.session.current);

  router.post(prefix + 'admin/emails/:id/send', app.jwt, controller.admin.email.send);
  router.post(prefix + 'admin/notices/:id/send', app.jwt, controller.admin.notice.send);

  const admin = controller.admin.resource;
  router.post(prefix + 'admin/:resources/search', app.jwt, admin.search);
  router.delete(prefix + 'admin/:resources/destroyAll', app.jwt, admin.destroyAll);
  router.resources(prefix + 'admin/:resources', app.jwt, admin);
};
