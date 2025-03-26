"use client";

import React, { useState } from "react";

interface DashboardData {
  totalUsers: number;
  totalMale: number;
  totalFemale: number;
  logs: any[];
  events: any[];
  comments: any[];
  allUsers: any[];
  admins: any[];
}

export default function AdminDashboardClient({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  const {
    totalUsers,
    totalMale,
    totalFemale,
    logs,
    events,
    comments,
    allUsers,
    admins,
  } = dashboardData;

  // Which sidebar section is active
  const [activeSection, setActiveSection] = useState<
    "overview" | "comments-events" | "all-users" | "all-admins"
  >("overview");

  //
  // ─── EVENT ACTIONS: EDIT & DELETE ─────────────────────────────────────────────
  //
  // 1) handleEditEvent -> navigate admin to /updateevent/[eventId]
  const handleEditEvent = (eventData: any) => {
    console.log("Editing event:", eventData);
    // You can also open a modal, but here we navigate to a dedicated page:
    window.location.href = `/updateevent/${eventData._id}`;
  };

  // 2) handleDeleteEvent -> calls DELETE /api/admin/events/[eventId]
  const handleDeleteEvent = async (eventId: string) => {
    console.log("Deleting event:", eventId);
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete event");
        return;
      }
      alert("Event deleted successfully!");
      // Refresh or remove event from local state:
      window.location.reload();
    } catch (error) {
      console.error("Delete event error:", error);
      alert("Error deleting event.");
    }
  };

  //
  // ─── RENDER CONTENT ──────────────────────────────────────────────────────────
  //
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold">Overview / Stats</h2>

            <div className="flex gap-6">
              <div className="bg-white rounded shadow p-4">
                <h3 className="font-medium">Total Users</h3>
                <p className="text-2xl">{totalUsers}</p>
              </div>
              <div className="bg-white rounded shadow p-4">
                <h3 className="font-medium">Male Users</h3>
                <p className="text-2xl">{totalMale}</p>
              </div>
              <div className="bg-white rounded shadow p-4">
                <h3 className="font-medium">Female Users</h3>
                <p className="text-2xl">{totalFemale}</p>
              </div>
            </div>

            {/* Logs Table */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Event Logs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b">User Name</th>
                      <th className="px-4 py-2 border-b">Email</th>
                      <th className="px-4 py-2 border-b">Location</th>
                      <th className="px-4 py-2 border-b">Action</th>
                      <th className="px-4 py-2 border-b">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">
                          {log.userId?.name || "Unknown"}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {log.userId?.email || "N/A"}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {log.userId?.location || "N/A"}
                        </td>
                        <td className="px-4 py-2 border-b capitalize">
                          {log.actionType}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "comments-events":
        return (
          <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold">Comments &amp; Posted Events</h2>

            {/* Comments Table */}
            <div>
              <h3 className="text-lg font-semibold mb-2">User Comments</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b">User</th>
                      <th className="px-4 py-2 border-b">Email</th>
                      <th className="px-4 py-2 border-b">Event</th>
                      <th className="px-4 py-2 border-b">Comment</th>
                      <th className="px-4 py-2 border-b">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map((cmt, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{cmt.userId?.name}</td>
                        <td className="px-4 py-2 border-b">{cmt.userId?.email}</td>
                        <td className="px-4 py-2 border-b">{cmt.eventId?.title}</td>
                        <td className="px-4 py-2 border-b">{cmt.text}</td>
                        <td className="px-4 py-2 border-b">
                          {new Date(cmt.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Posted Events (Edit/Delete Buttons) */}
            <div>
              <h3 className="text-lg font-semibold mb-2">All Posted Events</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b">Title</th>
                      <th className="px-4 py-2 border-b">Description</th>
                      <th className="px-4 py-2 border-b">Date</th>
                      <th className="px-4 py-2 border-b">Location</th>
                      <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{ev.title}</td>
                        <td className="px-4 py-2 border-b">{ev.description}</td>
                        <td className="px-4 py-2 border-b">
                          {new Date(ev.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 border-b">{ev.location}</td>
                        <td className="px-4 py-2 border-b">
                          <button
                            onClick={() => handleEditEvent(ev)}
                            className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev._id)}
                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "all-users":
        return (
          <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold">All Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Gender</th>
                    <th className="px-4 py-2 border-b">Location</th>
                    <th className="px-4 py-2 border-b">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((usr, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{usr.name}</td>
                      <td className="px-4 py-2 border-b">{usr.email}</td>
                      <td className="px-4 py-2 border-b">{usr.gender}</td>
                      <td className="px-4 py-2 border-b">{usr.location}</td>
                      <td className="px-4 py-2 border-b">{usr.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "all-admins":
        return (
          <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold">List of Admins</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Gender</th>
                    <th className="px-4 py-2 border-b">Location</th>
                    <th className="px-4 py-2 border-b">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((adm, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{adm.name}</td>
                      <td className="px-4 py-2 border-b">{adm.email}</td>
                      <td className="px-4 py-2 border-b">{adm.gender}</td>
                      <td className="px-4 py-2 border-b">{adm.location}</td>
                      <td className="px-4 py-2 border-b">{adm.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Side Nav */}
      <aside className="w-64 bg-white shadow flex flex-col">
        <div className="px-4 py-4 font-bold text-xl border-b">
          Admin Dashboard
        </div>
        <nav className="flex-1 px-4 py-2">
          <button
            onClick={() => setActiveSection("overview")}
            className={`block w-full text-left px-2 py-2 rounded hover:bg-gray-200 ${
              activeSection === "overview" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection("comments-events")}
            className={`block w-full text-left px-2 py-2 rounded hover:bg-gray-200 ${
              activeSection === "comments-events"
                ? "bg-gray-200 font-semibold"
                : ""
            }`}
          >
            Comments &amp; Events
          </button>
          <button
            onClick={() => setActiveSection("all-users")}
            className={`block w-full text-left px-2 py-2 rounded hover:bg-gray-200 ${
              activeSection === "all-users"
                ? "bg-gray-200 font-semibold"
                : ""
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setActiveSection("all-admins")}
            className={`block w-full text-left px-2 py-2 rounded hover:bg-gray-200 ${
              activeSection === "all-admins"
                ? "bg-gray-200 font-semibold"
                : ""
            }`}
          >
            Admins
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}
