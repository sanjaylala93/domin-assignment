import { NavLink } from 'react-router-dom'
import { StatusIndicator } from '@domin/ui'

function IconStations() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}
function IconMap() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  )
}
function IconDashboard() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  )
}
function IconJobs() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-4 0v2" />
    </svg>
  )
}
function IconValves() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}
function IconReports() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}
function IconAlerts() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
function IconSettings() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
    isActive
      ? 'bg-white/10 text-white'
      : 'text-slate-400 hover:text-white hover:bg-white/5'
  }`

const disabledClass =
  'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-slate-700 cursor-not-allowed select-none'

interface NavItemProps {
  to: string
  title: string
  disabled?: boolean
  children: React.ReactNode
}

function NavItem({ to, title, disabled, children }: NavItemProps) {
  if (disabled) {
    return (
      <span className={disabledClass} title={title}>
        {children}
      </span>
    )
  }
  return (
    <NavLink to={to} className={navLinkClass} title={title}>
      {children}
    </NavLink>
  )
}

function NavSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <p className="px-3 mb-1 text-[10px] font-semibold tracking-widest uppercase text-slate-600">
        {label}
      </p>
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="flex flex-col flex-shrink-0 w-56 bg-[#0f1929] border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2 h-14 px-3 border-b border-white/5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M8 6 L20 16 L8 26"
            stroke="#00bcd4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 6 L28 16 L16 26"
            stroke="#00bcd4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
        <span className="text-white font-bold text-base tracking-wider">
          DOMIN
        </span>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
        <StatusIndicator status="running" size="xs" pulse />
        <span className="text-[11px] text-slate-400">
          FACTORY STATUS · Live
        </span>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-3 px-2">
        <NavSection label="Factory Status">
          <NavItem to="/dashboard" title="Dashboard">
            <IconDashboard />
            <span>Dashboard</span>
          </NavItem>
          <NavItem to="/stations" title="Stations">
            <IconStations />
            <span>Stations</span>
          </NavItem>
          <NavItem to="/floor-map" title="Floor map" disabled>
            <IconMap />
            <span>Floor map</span>
          </NavItem>
        </NavSection>

        <NavSection label="Production">
          <NavItem to="/jobs" title="Jobs" disabled>
            <IconJobs />
            <span>Jobs</span>
          </NavItem>
          <NavItem to="/valves" title="Valves" disabled>
            <IconValves />
            <span>Valves</span>
          </NavItem>
          <NavItem to="/reports" title="Reports" disabled>
            <IconReports />
            <span>Reports</span>
          </NavItem>
          <NavItem to="/alerts" title="Alerts" disabled>
            <IconAlerts />
            <span>Alerts</span>
            <span className="ml-auto bg-red-500/40 text-white/40 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </NavItem>
        </NavSection>

        <NavSection label="Account">
          <NavItem to="/settings" title="Settings" disabled>
            <IconSettings />
            <span>Settings</span>
          </NavItem>
        </NavSection>
      </div>

      {/* User */}
      <div className="border-t border-white/5 p-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-cyan-700 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            SL
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">
              Sanjay Lala
            </p>
            <p className="text-slate-500 text-[10px] truncate">Operations</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
