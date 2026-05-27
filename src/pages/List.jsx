import DashboardPage from "../pages/layout/index";
import React, { useEffect, useState } from "react";
import { postLeaderboardSummary } from "../api/analytics";
import moment from 'moment';

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      const res = await postLeaderboardSummary({
        type: "monthly",
      });

      setData(res || []);
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Filter + reverse safely
  const filteredData = data
    .filter((item) => {
      if (statusFilter === "ALL") return true;
      return item.status === statusFilter;
    })
    .slice()
    .reverse();

  return (
    <DashboardPage>
      {/* Header */}
      <div className="text-xl font-semibold text-black bg-gray-100 p-4">
        <h1 className="text-center">Claims List</h1>
      </div>

      {/* Status Filter */}
      <div className="flex gap-3 p-4 justify-center">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                statusFilter === status
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 pt-0 max-w-4xl mx-auto">
        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        <div className="space-y-4 overflow-auto h-[calc(100vh-200px)]">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-black">
                  Claim ID: {item.id}
                </span>

                <span
                  className={`px-3 py-1 text-sm rounded-full
                    ${
                      item.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-black">
                <p>
                  <strong>Policy Number:</strong>{" "}
                  {item.policy_number || "-"}
                </p>

                <p>
                  <strong>Doctor Name:</strong>{" "}
                  {item.doctor_name || "-"}
                </p>

                <p>
                  <strong>Hospital:</strong>{" "}
                  {item.hospital_name || "-"}
                </p>

                <p>
                  <strong>Visit Date:</strong>{" "}
                  {item.visit_date || "-"}
                </p>

                <p>
                  <strong>Diagnosis:</strong>{" "}
                  {item.diagnosis || "-"}
                </p>

                <p>
                  <strong>Created At:</strong>{" "}
                  {item.created_at
                    ? moment(item.created_at).local().format('DD-MMM-YYYY hh:mm A')
                    : "-"}
                </p>
              </div>

              {item.reason && (
                <div className={`mt-3 p-3  border border-red-200 rounded text-sm  ${
                      item.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                  <strong>Reason:</strong> {item.reason}
                </div>
              )}
            </div>
          ))}
        </div>

        {!loading && filteredData.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No claims found
          </p>
        )}
      </div>
    </DashboardPage>
  );
};

export default List;
