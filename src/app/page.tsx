const stats = [
  { label: "Total Users", value: "1,284", change: "+12%", up: true },
  { label: "Revenue", value: "$24,500", change: "+8%", up: true },
  { label: "Active Sessions", value: "342", change: "-3%", up: false },
  { label: "Conversion Rate", value: "4.6%", change: "+1.2%", up: true },
];

const recentActivity = [
  { user: "Alice Johnson", action: "Signed up", time: "2 min ago" },
  { user: "Bob Smith", action: "Upgraded to Pro", time: "14 min ago" },
  { user: "Carol White", action: "Submitted a report", time: "1 hr ago" },
  { user: "David Lee", action: "Logged in", time: "2 hr ago" },
  { user: "Eva Martinez", action: "Updated profile", time: "3 hr ago" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Chelsea Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-slate-400">
              Welcome back
            </span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
              C
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Overview
          </h2>
          <p className="text-gray-500 dark:text-slate-400 mt-1 text-sm">
            Here&apos;s what&apos;s happening today.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6"
            >
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p
                className={`text-sm mt-2 font-medium ${
                  stat.up
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-slate-700">
            {recentActivity.map((item, i) => (
              <li
                key={i}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-sm font-semibold">
                    {item.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.user}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {item.action}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 dark:text-slate-500">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
