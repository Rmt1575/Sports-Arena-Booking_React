export const ROLES = {
  ADMIN: "admin",
  MANAGER: "arenaManager",
  COACH: "coach",
  PLAYER: "player",
};

export const ROLE_LABELS = {
  arenaManager: "Arena Manager",
  coach: "Coach",
  player: "Player",
  admin: "Admin",
};

export const roleDashboardPath = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return "/admin/dashboard";
    case ROLES.MANAGER:
      return "/manager/dashboard";
    case ROLES.COACH:
      return "/coach/dashboard";
    case ROLES.PLAYER:
      return "/player/dashboard";
    default:
      return "/login";
  }
};
