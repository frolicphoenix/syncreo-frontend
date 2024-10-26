// src/pages/Profile.js
import React, { useState } from 'react';
import Messages from '../components/Messages';
import Proposals from '../components/Proposals';
import Timeline from '../components/Timeline';
import Payments from '../components/Payments';
import ProfileEdit from '../components/ProfileEdit';
import './Profile.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('messages');
  const user = JSON.parse(localStorage.getItem('user'));

  const renderTabContent = () => {
    switch (activeTab) {
      case 'messages':
        return <Messages userId={user._id} />;
      case 'proposals':
        return <Proposals userId={user._id} role={user.role} />;
      case 'timeline':
        return <Timeline userId={user._id} />;
      case 'payments':
        return <Payments userId={user._id} />;
      case 'profileEdit':
        return <ProfileEdit user={user} />;
      default:
        return <Messages userId={user._id} />;
    }
  };

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'active' : ''}>Messages</li>
          <li onClick={() => setActiveTab('proposals')} className={activeTab === 'proposals' ? 'active' : ''}>Proposals</li>
          <li onClick={() => setActiveTab('timeline')} className={activeTab === 'timeline' ? 'active' : ''}>Timeline</li>
          <li onClick={() => setActiveTab('payments')} className={activeTab === 'payments' ? 'active' : ''}>Payments</li>
          <li onClick={() => setActiveTab('profileEdit')} className={activeTab === 'profileEdit' ? 'active' : ''}>Profile Edit</li>
        </ul>
      </aside>
      <main className="profile-content">
        {renderTabContent()}
      </main>
    </div>
  );
}

export default Profile;
