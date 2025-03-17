import React from 'react';
import Header from './components/Header';
import Terminal from './components/Terminal';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-terminal-bg flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Terminal />
      </main>
    </div>
  );
};

export default App;
