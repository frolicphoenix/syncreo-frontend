// src/pages/Profile.js
import React, { useState } from 'react';
import Messages from '../components/Messages';
// import Proposals from '../components/Proposals';
// import Timeline from '../components/Timeline';
// import Payments from '../components/Payments';
// import ProfileEdit from '../components/ProfileEdit';
import ClientProjects from '../components/ClientProjects';
import './Profile.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('myProjects'); // Default to My Projects for testing
  const user = JSON.parse(localStorage.getItem('user'));

  // Validate user data to avoid undefined errors
  if (!user || !user._id) {
    return <p>Error: User data is missing. Please log in again.</p>;
  }

  // Render the selected tab’s content based on activeTab state
  const renderTabContent = () => {
    switch (activeTab) {
      case 'messages':
        return <Messages userId={user._id} />;
      // Other cases for when you re-enable these tabs
      // case 'proposals':
      //   return <Proposals userId={user._id} role={user.role} />;
      // case 'timeline':
      //   return <Timeline userId={user._id} />;
      // case 'payments':
      //   return <Payments userId={user._id} />;
      // case 'profileEdit':
      //   return <ProfileEdit user={user} />;
      case 'myProjects': // New case for client projects
        return <ClientProjects userId={user._id} />;
      default:
        return <Messages userId={user._id} />;
    }
  };

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <h2>Dashboard</h2>
        <ul>
          {/* Re-enable these when needed */}
          {/* <li onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'active' : ''}>Messages</li> */}
          {/* <li onClick={() => setActiveTab('proposals')} className={activeTab === 'proposals' ? 'active' : ''}>Proposals</li> */}
          {/* <li onClick={() => setActiveTab('timeline')} className={activeTab === 'timeline' ? 'active' : ''}>Timeline</li> */}
          {/* <li onClick={() => setActiveTab('payments')} className={activeTab === 'payments' ? 'active' : ''}>Payments</li> */}
          {user.role === 'client' && (
            <li onClick={() => setActiveTab('myProjects')} className={activeTab === 'myProjects' ? 'active' : ''}>
              My Projects
            </li>
          )}
        </ul>
      </aside>
      <main className="profile-content">
        {renderTabContent()}
      </main>
    </div>
  );
}

export default Profile;
