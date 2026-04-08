import { Search, Mail, Bell } from 'lucide-react';

function Header() {
  return (
    <header className="top-header">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search by name, label, task or team member..." 
          className="search-input"
        />
      </div>

      <div className="header-actions">
        <button className="icon-btn">
          <Mail size={20} />
        </button>
        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="user-profile">
          <div className="user-avatar-small">
            <img src="https://i.pravatar.cc/150?img=11" alt="Brandon" />
          </div>
          <span className="user-name">Brandon Workman</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
