import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return <div className="app-shell">
    <header className="topbar"><div className="brand-mark"><span>O</span> Octofit</div><span className="status-dot">Live training hub</span></header>
    <div className="workspace">
      <aside className="sidebar"><p className="eyebrow">Your workspace</p><nav className="nav-stack" aria-label="Main navigation">
        <NavigationLink to="/" label="Overview" icon="◆" /><NavigationLink to="/activities" label="Activities" icon="↗" /><NavigationLink to="/leaderboard" label="Leaderboard" icon="♜" /><NavigationLink to="/teams" label="Teams" icon="◎" /><NavigationLink to="/users" label="Members" icon="♙" /><NavigationLink to="/workouts" label="Workouts" icon="◒" />
      </nav><div className="sidebar-note"><strong>Stay in motion.</strong><span>Small sessions add up.</span></div></aside>
      <main className="content-area"><Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/activities" element={<Page title="Activities" description="Recent movement across your teams."><Activities /></Page>} />
        <Route path="/leaderboard" element={<Page title="Leaderboard" description="See who is setting the pace."><Leaderboard /></Page>} />
        <Route path="/teams" element={<Page title="Teams" description="The crews making consistency competitive."><Teams /></Page>} />
        <Route path="/users" element={<Page title="Members" description="Everyone showing up for the challenge."><Users /></Page>} />
        <Route path="/workouts" element={<Page title="Workouts" description="Practical sessions for every energy level."><Workouts /></Page>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes></main>
    </div>
  </div>
}

function NavigationLink({ to, label, icon }) {
  return <NavLink to={to} end={to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span className="nav-icon">{icon}</span>{label}</NavLink>
}

function Page({ title, description, children }) {
  return <><PageHeader title={title} description={description} /><section className="panel">{children}</section></>
}

function PageHeader({ title, description }) {
  return <div className="page-heading"><div><p className="eyebrow">Octofit tracker</p><h1>{title}</h1><p className="lede">{description}</p></div><div className="date-chip">This week <span>↗</span></div></div>
}

function Overview() {
  const location = useLocation()
  return <><PageHeader title="Good momentum" description="A clear view of your team's movement this week." /><section className="overview-grid"><div className="feature-panel"><p className="eyebrow">Weekly focus</p><h2>Build your rhythm,<br /><em>one session at a time.</em></h2><p>Log an activity, invite your team, and keep the points moving.</p><NavLink className="primary-button" to="/activities">View activities <span>→</span></NavLink></div><div className="metric-panel"><span className="metric-label">Explore</span><div className="metric-links"><NavLink to="/leaderboard">Leaderboard <span>→</span></NavLink><NavLink to="/workouts">Find a workout <span>→</span></NavLink><NavLink to="/teams">Meet your teams <span>→</span></NavLink></div></div></section><p className="route-hint" data-route={location.pathname}>Powered by the Octofit API</p></>
}

export default App
