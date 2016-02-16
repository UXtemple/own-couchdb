export default function appToDbName(app) {
  return app.replace(/\./g, '');
}
