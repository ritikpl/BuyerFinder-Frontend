import { useEffect, useState } from "react";
import {
  Bookmark,
  MapPin,
  Globe,
  Mail,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const SavedLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSavedLeads = async () => {
    try {
      setLoading(true);

      const response = await api.get("/leads/saved");

      setLeads(response.data.leads || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load saved leads"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedLeads();
  }, []);

  const removeLead = async (leadId) => {
    try {
      const response = await api.post(
        `/leads/${leadId}/save`
      );

      setLeads((currentLeads) =>
        currentLeads.filter(
          (lead) => lead._id !== leadId
        )
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to remove lead"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="p-6 lg:p-8">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Lead Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Saved Leads
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage businesses you saved for outreach.
          </p>
        </div>
      </div>

      <div className="p-6 lg:p-8">

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading saved leads...
            </div>
          </div>
        ) : leads.length === 0 ? (

          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-20 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
              <Bookmark className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="mt-4 font-semibold text-slate-800 dark:text-slate-100">
              No saved leads
            </h2>

            <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Save potential buyers from the Find Buyers
              page and they will appear here.
            </p>
          </div>

        ) : (

          /* Table */
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                Saved Buyer Leads
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {leads.length} saved lead
                {leads.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">

                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Company
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Location
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Website
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Email
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >

                      {/* Company */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {lead.companyName}
                        </p>

                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                          {lead.category}
                        </p>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />

                          <span>
                            {lead.city}
                            {lead.state
                              ? `, ${lead.state}`
                              : ""}
                          </span>
                        </div>
                      </td>

                      {/* Website */}
                      <td className="px-6 py-4">
                        {lead.website ? (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                          >
                            <Globe className="h-4 w-4" />
                            Website
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400 dark:text-slate-500">
                            Not available
                          </span>
                        )}
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        {lead.email ? (
                          <div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {lead.email}
                            </p>

                            <span
                              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                lead.emailStatus === "valid"
                                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                                  : "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                              }`}
                            >
                              {lead.emailStatus}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400 dark:text-slate-500">
                            Not found
                          </span>
                        )}
                      </td>

                      {/* Remove */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            removeLead(lead._id)
                          }
                          className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:hover:bg-amber-900"
                        >
                          <Bookmark
                            className="h-4 w-4"
                            fill="currentColor"
                          />
                          Remove
                        </button>
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

export default SavedLeads;



