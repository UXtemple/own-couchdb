export default function createDesignDocForApp(app) {
  return `function(newDoc, oldDoc, userCtx) {
    if (userCtx.roles.indexOf("_admin") === -1 && userCtx.roles.indexOf("${app}") === -1) {
      throw({forbidden: true});
    }
  }`;
}
