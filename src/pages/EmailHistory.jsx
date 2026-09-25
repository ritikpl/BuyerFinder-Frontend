import { useEffect, useState } from "react";
import {
  Mail,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const EmailHistory = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmailHistory = async () => {
    try {
      setLoading(true);

      const response = await api.get("/emails");

      setEmails(response.data.emails || []);
    } catch (error) {
      console.error("Email history error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load email history"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmailHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="p-6 lg:p-8">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Outreach
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Email History
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View emails sent to your potential buyers.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading email history...
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && emails.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-20 text-center dark:border-slate-800 dark:bg-slate-900">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="mt-4 font-semibold text-slate-800 dark:text-slate-100">
              No emails sent yet
            </h2>

            <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Emails sent to potential buyers will appear here.
            </p>

          </div>
        )}

        {/* Email Table */}
        {!loading && emails.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            {/* Table Header */}
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                Sent Emails
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {emails.length} email
                {emails.length !== 1 ? "s" : ""} sent
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">

                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Recipient
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Subject
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Status
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                  {emails.map((email) => (
                    <tr
                      key={email._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >

                      {/* Recipient */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
                            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>

                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {email.to}
                          </span>

                        </div>
                      </td>

                      {/* Subject */}
                      <td className="px-6 py-4">
                        <p className="max-w-xs truncate text-sm text-slate-700 dark:text-slate-300">
                          {email.subject}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">

                        {email.status === "sent" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Sent
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-400">
                            Failed
                          </span>
                        )}

                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">

                          <Clock className="h-4 w-4" />

                          {email.createdAt
                            ? new Date(
                                email.createdAt
                              ).toLocaleString()
                            : "Unknown"}

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default EmailHistory;






