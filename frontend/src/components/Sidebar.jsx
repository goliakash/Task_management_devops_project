import {
  LayoutDashboard,
  FolderKanban,
  CalendarDays,
  Users,
  Settings,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-placeholder"></div>
        <h2>taskmanagment</h2>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <LayoutDashboard size={18} />
          <span>Home</span>
        </button>

        <div className="nav-group">
          <button
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <FolderKanban size={18} />
            <span>Projects</span>
            <ChevronDown size={16} className="ml-auto" />
          </button>
          
          <div className="nav-subgroup">
            <button className="nav-subitem active">
              <span className="dot active-dot"></span> Mindlax
            </button>
            <button className="nav-subitem">
              <span className="dot"></span> SinTech
            </button>
            <button className="nav-subitem">
              <span className="dot"></span> Shopicia
            </button>
            <button className="nav-subitem">
              <span className="dot"></span> Byscape
            </button>
          </div>
        </div>

        <button
          className={`nav-item ${currentPage === 'calendar' ? 'active' : ''}`}
          onClick={() => onNavigate('calendar')}
        >
          <CalendarDays size={18} />
          <span>Calendar</span>
          <ChevronDown size={16} className="ml-auto" />
        </button>

        <button
          className={`nav-item ${currentPage === 'members' ? 'active' : ''}`}
          onClick={() => onNavigate('members')}
        >
          <Users size={18} />
          <span>Members</span>
          <ChevronDown size={16} className="ml-auto" />
        </button>
        
        <button
          className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
          onClick={() => onNavigate('settings')}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>

        <button
          className={`nav-item ${currentPage === 'support' ? 'active' : ''}`}
          onClick={() => onNavigate('support')}
        >
          <HelpCircle size={18} />
          <span>Support</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
