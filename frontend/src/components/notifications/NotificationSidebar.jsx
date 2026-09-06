import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  AlertTriangle,
  Sparkles,
  Plane,
  CheckCircle2,
  CheckCheck,
  Trash2,
  ChevronRight,
  Shield,
  Info,
  Clock,
  Compass
} from "lucide-react";
import { useTravel } from "../../context/TravelContext";

export const NotificationSidebar = () => {
  const {
    notifications,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    unreadNotificationCount,
    setActiveView,
    selectTrip
  } = useTravel();

  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'alert' | 'update'

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "all") return true;
    if (activeFilter === "alert") return n.type === "alert";
    if (activeFilter === "update") return n.type === "update" || n.type === "recovery";
    return true;
  });

  const handleNotificationAction = (notif) => {
    markNotificationRead(notif.id);
    setIsNotificationDrawerOpen(false);

    if (notif.actionType === "replan" || notif.actionType === "view_day_2" || notif.tripId) {
      if (notif.tripId) {
        selectTrip(notif.tripId);
      }
      setActiveView("liveTrip");
    }
  };

  return (
    <AnimatePresence>
      {isNotificationDrawerOpen && (
        <div className="fixed inset-0 z-[350] overflow-hidden">

          {/* Ambient Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Sliding Right Sidebar Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-[var(--modal-bg)] border-l border-[var(--border)] z-[360] shadow-[0_0_90px_rgba(0,0,0,0.4)] dark:shadow-[0_0_90px_rgba(0,0,0,0.95)] flex flex-col justify-between text-[var(--text-primary)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header */}
            <div className="p-6 border-b border-[var(--border)] space-y-4 shrink-0 bg-[var(--modal-header-bg)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shadow-inner">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-serif font-bold text-[var(--text-primary)]">
                        AI Sentinel Feed
                      </h3>
                      {unreadNotificationCount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-[rgba(184,111,82,0.18)] border border-[rgba(184,111,82,0.35)] text-[10px] font-mono font-bold text-[#B86F52]">
                          {unreadNotificationCount} NEW
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[10px] font-mono font-bold text-[var(--accent)]">
                          UP TO DATE
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[var(--text-secondary)] block">
                      Live radar, delay alerts & schedule recovery
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNotificationDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/15 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                  aria-label="Close notifications"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Tabs & Quick Action */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setActiveFilter("all")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${activeFilter === "all"
                        ? "bg-[var(--text-primary)] text-[var(--modal-bg)] dark:bg-white dark:text-[#181411] font-bold shadow-sm"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                  >
                    All ({notifications.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("alert")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${activeFilter === "alert"
                        ? "bg-[#B86F52] text-white font-bold shadow-sm"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B86F52]" />
                    Alerts
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("update")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${activeFilter === "update"
                        ? "bg-[var(--text-primary)] text-[var(--modal-bg)] dark:bg-white dark:text-[#181411] font-bold shadow-sm"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                  >
                    Updates
                  </button>
                </div>

                {unreadNotificationCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-mono text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Notifications Stream */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3.5">
              {filteredNotifications.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--accent)]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-[var(--text-primary)]">
                    All Caught Up
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
                    AI Sentinel is monitoring flight radar, monument closing cutoffs, and weather telemetry in the background.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notif) => {
                  const isAlert = notif.type === "alert";
                  const isRecovery = notif.type === "recovery";

                  return (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-2xl border transition-all duration-200 space-y-3 ${!notif.read ? "shadow-md" : "opacity-85"
                        } ${isAlert
                          ? "bg-[#FEF2F1] dark:bg-[#201511] border-[rgba(184,111,82,0.35)]"
                          : isRecovery
                            ? "bg-[#EDFBF3] dark:bg-[#18231a] border-[rgba(30,150,80,0.25)] dark:border-[rgba(201,168,106,0.35)]"
                            : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--accent)]"
                        }`}
                    >
                      {/* Top Item Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${isAlert
                                ? "bg-[rgba(184,111,82,0.18)] text-[#B86F52]"
                                : isRecovery
                                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                                  : "bg-[var(--surface-soft)] text-[var(--text-primary)]"
                              }`}
                          >
                            {isAlert ? (
                              <AlertTriangle className="w-4 h-4 text-[#B86F52]" />
                            ) : isRecovery ? (
                              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                            ) : (
                              <Plane className="w-4 h-4 text-[var(--accent)]" />
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="text-sm font-sans font-bold text-[var(--text-primary)] leading-tight">
                                {notif.title}
                              </h5>
                              {!notif.read && (
                                <span className="w-2 h-2 rounded-full bg-[#B86F52] shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                              {notif.message}
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0 whitespace-nowrap pt-0.5">
                          {notif.timestamp}
                        </span>
                      </div>

                      {/* Action Pill CTA */}
                      {notif.actionLabel && (
                        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => handleNotificationAction(notif)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all flex items-center gap-1.5 shadow-md cursor-pointer hover:scale-105 active:scale-95 ${isAlert
                                ? "bg-[#B86F52] text-white hover:opacity-90"
                                : "bg-[var(--accent-soft)] hover:opacity-90 border border-[var(--accent)]/30 text-[var(--accent)]"
                              }`}
                          >
                            <span>{notif.actionLabel}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="p-4 border-t border-[var(--border)] bg-[var(--modal-header-bg)] flex items-center justify-between shrink-0 text-xs font-mono text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span>Sentinel Radar 24/7 Active</span>
              </div>

              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearNotifications}
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
