export const primaryNavigation = [
  { label: "Control4", href: "/control4" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "All projects", href: "/projects" },
      { label: "Residential", href: "/residential" },
      { label: "Commercial", href: "/commercial" }
    ]
  },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" }
] as const;
