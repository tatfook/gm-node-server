'use strict';

module.exports = app => {
  const prefix = '/v0/';
  const { router, controller } = app;

  router.get(prefix + 'test', controller.test.index);

  router.post(prefix + 'login', controller.session.login);
  router.post(prefix + 'logout', controller.session.logout);
  router.get(prefix + 'current', app.jwt, controller.session.current);

  router.resources(prefix + 'admin/emails', app.jwt, controller.admin.email);
  router.post(prefix + 'admin/emails/search', app.jwt, controller.admin.email.search);

  const admin = controller.admin.resource;
  router.post(prefix + 'admin/:resources/search', app.jwt, admin.search);
  router.delete(prefix + 'admin/:resources/destroyAll', app.jwt, admin.destroyAll);
  router.resources(prefix + 'admin/:resources', app.jwt, admin);
};
