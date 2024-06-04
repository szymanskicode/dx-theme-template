import { withNavigationWatcher } from "./contexts/navigation";

// pages
import { UserProfile } from "./pages";
import { Dashboard } from "./pages";
import { Users } from "./pages";
import { PrivacyPolicy } from "./pages/privacy-policy/privacy-policy";

const routes = [
  {
    path: "/",
    element: () => <div>Home</div>,
  },
  {
    path: "/dashboard",
    element: Dashboard,
  },
  {
    path: "/users",
    element: Users,
  },
  {
    path: "/user-profile",
    element: UserProfile,
  },
  {
    path: "/privacy-policy",
    element: PrivacyPolicy,
  },
];

export const appRoutes = routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
