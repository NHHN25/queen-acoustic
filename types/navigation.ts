export interface NavItem {
  key: string;
  path: string;
  label: string;
  children?: NavItem[];
}

export interface NavigationProps {
  items: NavItem[];
}
