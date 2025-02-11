export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface NavigationProps {
  items: NavItem[];
}
