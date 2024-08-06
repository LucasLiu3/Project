import { allNav } from "./allNav";

export const getNav = (role) => {
  const finalNavs = allNav.filter((nav) => nav.role === role);

  return finalNavs;
};
