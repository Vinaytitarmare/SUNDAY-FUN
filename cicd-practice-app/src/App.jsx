import PipelineVisualizer from './components/PipelineVisualizer';
import Tabs from './components/Tabs';
import './index.css';

const workflowCode = `name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint
      run: npm run lint
      
    - name: Build
      run: npm run build`;

function App() {
  const tabs = [
    {
      label: 'Interactive Pipeline',
      content: (
        <div>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Visualize the Flow</h2>
          <PipelineVisualizer />
        </div>
      )
    },
    {
      label: 'Workflow Configuration',
      content: (
        <div>
          <h2>.github/workflows/ci.yml</h2>
          <p className="text-secondary">This is the actual configuration file used by GitHub Actions.</p>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left', overflowX: 'auto' }}>
            <pre style={{ margin: 0, color: '#a5b4fc' }}>
              <code>{workflowCode}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      label: 'CI/CD Concepts',
      content: (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2>Core Concepts</h2>
          <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-primary)' }}>Continuous Integration (CI)</h3>
            <p>
              The practice of automating the integration of code changes from multiple contributors into a single software project.
              It allows you to find bugs easier and faster.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--success)' }}>Continuous Deployment (CD)</h3>
            <p>
              A strategy for software releases wherein any code commit that passes the automated testing phase is automatically released into the production environment.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: '#f59e0b' }}>GitHub Actions</h3>
            <p>
              Automates your build, test, and deployment pipeline. You create workflows that build and test every pull request to your repository, or deploy merged pull requests to production.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="app-container" style={{ paddingBottom: '4rem' }}>
      <header style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem', 
        background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)' 
      }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          CI/CD Practice Platform
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Master GitHub Actions with interactive visualizations
        </p>
      </header>

      <main className="container">
        <Tabs items={tabs} />
      </main>
    </div>
  );
}

export default App;
