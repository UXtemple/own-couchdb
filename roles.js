export function hasRole(user, role) {
  return user.roles.indexOf(role) !== -1;
}

const ADMIN = '_admin';

export function isAdmin(user) {
  return hasRole(user, ADMIN);
}

export function isOwner(user, aclDoc) {
  return hasRole(user, aclDoc._id) && aclDoc.admins.indexOf(user.name) !== -1;
}
