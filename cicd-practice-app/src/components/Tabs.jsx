import { useState } from 'react';
import './Tabs.css';

const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container glass-panel animate-fade-in">
      <div className="tabs-header">
        {items.map((item, index) => (
          <button
            key={index}
            className={`tab-btn ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {item.label}
            {activeTab === index && <div className="active-indicator" />}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {items[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
