import { useEffect, useState } from "react";
import {
  Users,
  Bookmark,
  MailCheck,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    savedLeads: 0,
    verifiedEmails: 0,
    totalEmailsSent: 0,
  });

  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [leadStatsResponse, emailStatsResponse, leadsResponse] =
          await Promise.all([
            api.get("/leads/stats"),
            api.get("/emails/stats"),
            api.get("/leads"),
          ]);

        setStats({
          totalLeads:
            leadStatsResponse.data?.stats?.totalLeads || 0,

          savedLeads:
            leadStatsResponse.data?.stats?.savedLeads || 0,

          verifiedEmails:
            leadStatsResponse.data?.stats?.verifiedEmails || 0,

          totalEmailsSent:
            emailStatsResponse.data?.stats?.totalEmailsSent || 0,
        });

        setRecentLeads(
          (leadsResponse.data?.leads || []).slice(0, 5)
        );
      } catch (error) {
        console.error("Dashboard error:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <Navbar />

      <main className="ml-64 pt-16">
        <div className="p-6">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Overview of your buyer discovery and outreach activity.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Leads"
              value={loading ? "..." : stats.totalLeads}
              description="Businesses discovered"
              icon={Users}
              iconClass="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
            />

            <StatCard
              title="Saved Leads"
              value={loading ? "..." : stats.savedLeads}
              description="Saved buyer prospects"
              icon={Bookmark}
              iconClass="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
            />

            <StatCard
              title="Verified Emails"
              value={loading ? "..." : stats.verifiedEmails}
              description="Verified contact emails"
              icon={MailCheck}
              iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
            />

            <StatCard
              title="Emails Sent"
              value={loading ? "..." : stats.totalEmailsSent}
              description="Outreach emails sent"
              icon={Send}
              iconClass="bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400"
            />

          </div>

          {/* Recent Leads */}
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                  Recent Leads
                </h2>

                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  Recently discovered businesses
                </p>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Loading leads...
              </div>
            ) : recentLeads.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                No leads found yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">

                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                        Company
                      </th>

                      <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                        Location
                      </th>

                      <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                        Email
                      </th>

                      <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr
                        key={lead._id}
                        className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium text-slate-800 dark:text-slate-200">
                            {lead.companyName || "Unknown"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                            {lead.category || "Home Decor"}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                          {[
                            lead.city,
                            lead.state,
                          ]
                            .filter(Boolean)
                            .join(", ") || "United States"}
                        </td>

                        <td className="px-5 py-4">
                          {lead.email ? (
                            <span className="text-slate-700 dark:text-slate-300">
                              {lead.email}
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500">
                              Not found
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              lead.emailStatus === "valid"
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                                : lead.emailStatus === "found"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {lead.emailStatus === "valid"
                              ? "Verified"
                              : lead.emailStatus === "found"
                              ? "Email Found"
                              : "No Email"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

