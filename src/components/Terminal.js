import { useState, useRef, useEffect } from 'react';
import SpaceInvaders from './SpaceInvaders/index';

const commands = {
  about: {
    description: 'Show information about me',
    execute: () => ({
      type: 'text',
      content: `Daniel Johansson - Full-stack Developer
Passionate about creating elegant solutions to complex problems.
Specializing in modern web technologies and scalable applications.`,
    }),
  },
  skills: {
    description: 'List my technical skills',
    execute: () => ({
      type: 'list',
      content: [
        'JavaScript/TypeScript',
        'React/Next.js',
        'Node.js',
        'Python',
        'AWS',
        'Docker',
        'Git',
      ],
    }),
  },
  projects: {
    description: 'Show my featured projects',
    execute: () => ({
      type: 'projects',
      content: [
        {
          name: 'Project 1',
          description: 'A full-stack web application',
          tech: ['React', 'Node.js', 'MongoDB'],
        },
        {
          name: 'Project 2',
          description: 'Cloud-native microservice',
          tech: ['Python', 'AWS', 'Docker'],
        },
      ],
    }),
  },
  contact: {
    description: 'Show contact information',
    execute: () => ({
      type: 'contact',
      content: {
        email: 'daniel@codebymini.se',
        github: 'https://github.com/codebymini/',
        linkedin: 'https://www.linkedin.com/in/codebymini/',
      },
    }),
  },
  help: {
    description: 'Show available commands',
    execute: () => ({
      type: 'help',
      content: Object.keys(commands).map((cmd) => ({
        command: cmd,
        description: commands[cmd].description,
      })),
    }),
  },
  clear: {
    description: 'Clear the terminal',
    execute: () => ({ type: 'clear' }),
  },
  spaceinvaders: {
    description: 'Play Space Invaders game',
    execute: () => ({ type: 'game' }),
  },
};

function Terminal() {
  const [history, setHistory] = useState([
    {
      type: 'text',
      content: 'Welcome to my terminal! Type "help" to see available commands.',
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const terminalRef = useRef(null);
  const gameContainerRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isPlaying && gameContainerRef.current) {
      console.log('Game mounted, focusing container');
      gameContainerRef.current.focus();
    }
  }, [isPlaying]);

  const handleCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    setHistory((prev) => [
      ...prev,
      { type: 'command', content: `$ ${command}` },
    ]);

    if (cmd === '') {
      return;
    }

    if (cmd === 'spaceinvaders') {
      console.log('Starting Space Invaders game');
      setIsPlaying(true);
      return;
    }

    if (commands[cmd]) {
      const result = commands[cmd].execute();
      if (result.type === 'clear') {
        setHistory([]);
      } else {
        setHistory((prev) => [...prev, result]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: 'error',
          content: `Command not found: ${command}. Type "help" to see available commands.`,
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleGameExit = () => {
    console.log('Game exit requested');
    setIsPlaying(false);
    setHistory((prev) => [
      ...prev,
      {
        type: 'text',
        content: 'Game ended. Type "help" to see available commands.',
      },
    ]);
  };

  const renderHistoryItem = (item, index) => {
    switch (item.type) {
      case 'command':
        return (
          <div key={index} className="text-[#60a5fa]">
            {item.content}
          </div>
        );
      case 'error':
        return (
          <div key={index} className="text-[#f87171]">
            {item.content}
          </div>
        );
      case 'list':
        return (
          <div key={index} className="text-[#94a3b8]">
            {item.content.map((skill, i) => (
              <div key={i} className="ml-4">
                • {skill}
              </div>
            ))}
          </div>
        );
      case 'projects':
        return (
          <div key={index} className="text-[#94a3b8]">
            {item.content.map((project, i) => (
              <div key={i} className="mb-4">
                <div className="text-[#60a5fa]">{project.name}</div>
                <div className="ml-4">{project.description}</div>
                <div className="ml-4 flex gap-2">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="text-[#34d399]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'contact':
        return (
          <div key={index} className="text-[#94a3b8]">
            <div>Email: {item.content.email}</div>
            <div>GitHub: {item.content.github}</div>
            <div>LinkedIn: {item.content.linkedin}</div>
          </div>
        );
      case 'help':
        return (
          <div key={index} className="text-[#94a3b8]">
            {item.content.map((cmd, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-[#60a5fa]">{cmd.command}</span>
                <span>{cmd.description}</span>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div key={index} className="text-[#94a3b8] whitespace-pre-line">
            {item.content}
          </div>
        );
    }
  };

  if (isPlaying) {
    return (
      <div
        ref={gameContainerRef}
        tabIndex={0}
        className="bg-[#1e293b] rounded-lg shadow-xl overflow-hidden"
      >
        <SpaceInvaders onExit={handleGameExit} />
      </div>
    );
  }

  return (
    <div className="bg-[#1e293b] rounded-lg shadow-xl overflow-hidden">
      {/* Terminal header */}
      <div className="bg-[#0f172a] px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#f87171]"></div>
        <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
        <div className="w-3 h-3 rounded-full bg-[#34d399]"></div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="h-[600px] overflow-y-auto p-4 font-mono text-sm"
      >
        {history.map((item, index) => renderHistoryItem(item, index))}
      </div>

      {/* Input area */}
      <div className="border-t border-[#334155] p-4">
        <div className="flex items-center gap-2">
          <span className="text-[#60a5fa]">$</span>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none text-[#94a3b8] font-mono"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

export default Terminal;
