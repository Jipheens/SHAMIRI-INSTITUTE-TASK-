export function hasPermission(user, permission_name: string | string[]) {
  if (!user?.app_role?.name) return false;
  if (!permission_name) {
    return true;
  }
  const permissions = new Set<string>([
    ...(user?.custom_permissions ?? []).map((p) => p.name),
    ...(user?.app_role_permissions ?? []).map((p) => p.name),
  ]);

  if (typeof permission_name === 'string') {
    return (
      permissions.has(permission_name) || user.app_role.name === 'Administrator'
    );
  } else {
    return permission_name.some((permission) => permissions.has(permission));
  }
}
