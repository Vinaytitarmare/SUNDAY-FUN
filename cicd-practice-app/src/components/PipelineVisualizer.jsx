import React, { useEffect, useState } from 'react';
import './PipelineVisualizer.css';

const stages = [
  { id: 'checkout', label: 'Checkout', icon: '📂' },
  { id: 'lint', label: 'Lint Code', icon: '✨' },
  { id: 'build', label: 'Build', icon: '📦' },
  { id: 'deploy', label: 'Deploy', icon: '🚀' },
];

const PipelineVisualizer = () => {
  const [activeStage, setActiveStage] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const startPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStage(0);
  };

  useEffect(() => {
    if (isRunning && activeStage < stages.length) {
      const timer = setTimeout(() => {
        if (activeStage < stages.length - 1) {
          setActiveStage(prev => prev + 1);
        } else {
          setIsRunning(false);
          // Keep the last stage active or reset? Let's keep it active to show success
          setTimeout(() => setActiveStage(-1), 2000); 
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeStage, isRunning]);

  return (
    <div className="visualizer-wrapper">
      <div className="pipeline-container glass-panel">
        <div className="stages-row">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              {index > 0 && (
                <div className={`connector ${index <= activeStage ? 'active' : ''}`} />
              )}
              <div 
                className={`stage-node ${index <= activeStage ? 'completed' : ''} ${index === activeStage && isRunning ? 'pulsing' : ''}`}
              >
                <div className="stage-icon">{stage.icon}</div>
                <div className="stage-label">{stage.label}</div>
                {index === activeStage && isRunning && (
                  <div className="status-badge">Running...</div>
                )}
                {index < activeStage && (
                  <div className="status-badge success">✔ Done</div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="controls">
        <button className="btn run-btn" onClick={startPipeline} disabled={isRunning}>
          {isRunning ? 'Pipeline Running...' : '🚀 Trigger Workflow'}
        </button>
      </div>

      <div className="info-box glass-panel">
        <h3>Pipeline Status</h3>
        <p>
          {isRunning 
            ? `Current Job: ${stages[activeStage]?.label}...` 
            : activeStage === -1 ? 'Ready to run.' : 'Pipeline Completed Successfully!'}
        </p>
      </div>
    </div>
  );
};

export default PipelineVisualizer;
