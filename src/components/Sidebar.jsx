import {
  LayoutDashboard,
  Search,
  Bookmark,
  Mail,
  Settings,
  Users,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Find Buyers",
    icon: Search,
    path: "/find-buyers",
  },
  {
    label: "Saved Leads",
    icon: Bookmark,
    path: "/saved-leads",
  },
  {
    label: "Email History",
    icon: Mail,
    path: "/emails",
  },
];

const bottomItems = [
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
          <Users className="h-5 w-5 text-white" />
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            BuyerFinder
          </h1>

          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            Lead Generation
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Workspace
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        {bottomItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
