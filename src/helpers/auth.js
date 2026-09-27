import { ADMIN_ROLE, MERCHANT_ROLE } from "@/constants/userRoles";

const ADMIN_ROLES = [
  ADMIN_ROLE.toLowerCase(),
  MERCHANT_ROLE.toLowerCase(),
  "admin",
  "merchant",
  "superadmin",
];

export function isUserAdmin(user) {
  if (!user) return false;
  if (user.isAdmin === true) return true;

  // Check roles array
  if (Array.isArray(user.roles)) {
    if (user.roles.some((r) => typeof r === "string" && ADMIN_ROLES.includes(r.toLowerCase()))) {
      return true;
    }
  } else if (typeof user.roles === "string") {
    if (ADMIN_ROLES.includes(user.roles.toLowerCase())) return true;
  }

  // Check single role string or array in user.role
  if (typeof user.role === "string") {
    if (ADMIN_ROLES.includes(user.role.toLowerCase())) return true;
  } else if (Array.isArray(user.role)) {
    if (user.role.some((r) => typeof r === "string" && ADMIN_ROLES.includes(r.toLowerCase()))) {
      return true;
    }
  }

  return false;
}

export function allowedAdminRoles(rolesOrUser) {
  if (!rolesOrUser) return false;

  // If full user object was passed
  if (typeof rolesOrUser === "object" && !Array.isArray(rolesOrUser)) {
    return isUserAdmin(rolesOrUser);
  }

  // If array of roles was passed
  if (Array.isArray(rolesOrUser)) {
    return rolesOrUser.some(
      (role) => typeof role === "string" && ADMIN_ROLES.includes(role.toLowerCase())
    );
  }

  // If single role string was passed
  if (typeof rolesOrUser === "string") {
    return ADMIN_ROLES.includes(rolesOrUser.toLowerCase());
  }

  return false;
}