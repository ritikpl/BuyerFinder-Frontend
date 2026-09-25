import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Search,
  MapPin,
  Globe,
  Phone,
  Mail,
  Bookmark,
  Send,
  X,
  Loader2,
} from "lucide-react";
import api from "../services/api";

const FindBuyers = () => {
  const [form, setForm] = useState({
    category: "Home Decor",
    country: "United States",
    city: "",
    state: "",
    keyword: "",
  });

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState({});
  const [saveLoading, setSaveLoading] = useState({});
  const [emailModal, setEmailModal] = useState(null);

  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const searchBuyers = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/leads/search", {
        category: form.category,
        country: form.country,
        city: form.city,
        state: form.state,
        keyword: form.keyword,
      });

      if (response.data.success) {
        setLeads(response.data.leads || []);

        toast.success(
          `${response.data.leads?.length || 0} buyers found`
        );
      }
    } catch (error) {
      console.error("Buyer search error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to search buyers"
      );
    } finally {
      setLoading(false);
    }
  };

  const saveLead = async (lead) => {
    try {
      setSaveLoading((prev) => ({
        ...prev,
        [lead._id]: true,
      }));

      const response = await api.post(
        `/leads/${lead._id}/save`
      );

      if (response.data.success) {
        setLeads((prev) =>
          prev.map((item) =>
            item._id === lead._id
              ? {
                  ...item,
                  isSaved: response.data.lead?.isSaved,
                }
              : item
          )
        );

        toast.success(
          response.data.lead?.isSaved
            ? "Buyer saved"
            : "Buyer removed from saved"
        );
      }
    } catch (error) {
      console.error("Save lead error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to save buyer"
      );
    } finally {
      setSaveLoading((prev) => ({
        ...prev,
        [lead._id]: false,
      }));
    }
  };

  const findEmail = async (lead) => {
    try {
      setEmailLoading((prev) => ({
        ...prev,
        [lead._id]: true,
      }));

      const response = await api.post("/emails/find", {
        leadId: lead._id,
      });

      if (response.data.success) {
        const updatedLead = response.data.lead;

        setLeads((prev) =>
          prev.map((item) =>
            item._id === lead._id ? updatedLead : item
          )
        );

        if (response.data.email) {
          toast.success(
            `Email found: ${response.data.email}`
          );
        } else {
          toast.error("Email not found");
        }
      }
    } catch (error) {
      console.error("Find email error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to find email"
      );
    } finally {
      setEmailLoading((prev) => ({
        ...prev,
        [lead._id]: false,
      }));
    }
  };

  const openEmailModal = (lead) => {
    if (!lead.email) {
      toast.error("No email available for this buyer");
      return;
    }

    setEmailModal(lead);

    setEmailForm({
      subject: "Home Decor Business Partnership",
      message: `Hello ${lead.companyName},

I am reaching out regarding a potential business opportunity in the home decor category.

I would be happy to share more details and discuss how we could work together.

Best regards,
Ritik`,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!emailModal?.email) {
      toast.error("No email available");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/emails/send", {
        leadId: emailModal._id,
        subject: emailForm.subject,
        message: emailForm.message,
      });

      if (response.data.success) {
        toast.success("Email sent successfully");

        setEmailModal(null);

        setEmailForm({
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Send email error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to send email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Find Buyers
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Discover potential international buyers and
            business prospects.
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <form
            onSubmit={searchBuyers}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5"
          >

            {/* Category */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-950"
              >
                <option value="Home Decor">Home Decor</option>
                <option value="Furniture">Furniture</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Lighting">Lighting</option>
                <option value="Home Furnishings">Home Furnishings</option>
                <option value="Decor Accessories">Decor Accessories</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Country
              </label>

              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-950"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                State
              </label>

              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-950"
              >
                <option value="">All States</option>
                <option value="California">California</option>
                <option value="New York">New York</option>
                <option value="Texas">Texas</option>
                <option value="Florida">Florida</option>
                <option value="New Jersey">New Jersey</option>
                <option value="Illinois">Illinois</option>
                <option value="Georgia">Georgia</option>
                <option value="Washington">Washington</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                City
              </label>

              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-950"
              >
                <option value="">All Cities</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="Houston">Houston</option>
                <option value="Miami">Miami</option>
                <option value="Dallas">Dallas</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Atlanta">Atlanta</option>
              </select>
            </div>

            {/* Keyword */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Keyword
              </label>

              <input
                type="text"
                name="keyword"
                value={form.keyword}
                onChange={handleChange}
                placeholder="Wholesale"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>

            {/* Search Button */}
            <div className="md:col-span-2 lg:col-span-5">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={17} />
                    Find Buyers
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Header */}
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Potential Buyers
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {leads.length} result
            {leads.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Empty State */}
        {!loading && leads.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <Search
              size={40}
              className="mx-auto mb-3 text-slate-300 dark:text-slate-600"
            />

            <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
              No buyers found
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Enter your search criteria and click Find
              Buyers.
            </p>
          </div>
        )}

        {/* Results Table */}
        {leads.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">

                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                  <tr>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Company
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Location
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Website
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Phone
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Email
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >

                      <td className="px-4 py-4">
                        <div className="max-w-[230px]">

                          <p className="truncate font-semibold text-slate-900 dark:text-slate-100">
                            {lead.companyName ||
                              "Unknown Company"}
                          </p>

                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {lead.category ||
                              "Home Decor"}
                          </p>

                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex max-w-[180px] items-start gap-2">

                          <MapPin
                            size={16}
                            className="mt-0.5 shrink-0 text-slate-400"
                          />

                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {lead.address ||
                              [
                                lead.city,
                                lead.state,
                                lead.country,
                              ]
                                .filter(Boolean)
                                .join(", ") ||
                              "United States"}
                          </span>

                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {lead.website ? (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex max-w-[190px] items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <Globe size={15} />

                            <span className="truncate">
                              Visit Website
                            </span>
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400 dark:text-slate-500">
                            Not available
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {lead.phone ? (
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <Phone size={15} />
                            {lead.phone}
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400 dark:text-slate-500">
                            Not available
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {lead.email ? (
                          <div className="max-w-[230px]">

                            <div className="flex items-center gap-2">

                              <Mail
                                size={15}
                                className="shrink-0 text-emerald-600 dark:text-emerald-400"
                              />

                              <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                                {lead.email}
                              </span>

                            </div>

                            <span className="mt-1 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                              Email Found
                            </span>

                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => findEmail(lead)}
                            disabled={emailLoading[lead._id]}
                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            {emailLoading[lead._id] ? (
                              <>
                                <Loader2
                                  size={14}
                                  className="animate-spin"
                                />
                                Finding...
                              </>
                            ) : (
                              <>
                                <Mail size={14} />
                                Find Email
                              </>
                            )}
                          </button>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">

                          <button
                            type="button"
                            onClick={() => saveLead(lead)}
                            disabled={saveLoading[lead._id]}
                            title={
                              lead.isSaved
                                ? "Remove saved"
                                : "Save buyer"
                            }
                            className={`rounded-lg border p-2 transition ${
                              lead.isSaved
                                ? "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-400"
                                : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`}
                          >
                            {saveLoading[lead._id] ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Bookmark
                                size={16}
                                fill={
                                  lead.isSaved
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            )}
                          </button>

                          {lead.email && (
                            <button
                              type="button"
                              onClick={() =>
                                openEmailModal(lead)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                            >
                              <Send size={14} />
                              Send
                            </button>
                          )}

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

      {/* Email Modal */}
      {emailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl dark:bg-slate-900">

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">

              <div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Send Email
                </h3>

                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  To: {emailModal.email}
                </p>

              </div>

              <button
                type="button"
                onClick={() => setEmailModal(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={sendEmail}
              className="space-y-4 p-5"
            >

              <div>

                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Subject
                </label>

                <input
                  type="text"
                  value={emailForm.subject}
                  onChange={(e) =>
                    setEmailForm({
                      ...emailForm,
                      subject: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />

              </div>

              <div>

                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>

                <textarea
                  rows={8}
                  value={emailForm.message}
                  onChange={(e) =>
                    setEmailForm({
                      ...emailForm,
                      message: e.target.value,
                    })
                  }
                  required
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />

              </div>

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setEmailModal(null)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Email
                    </>
                  )}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBuyers;









