import React, { useState, useRef, useEffect } from 'react';
import SpaceInvaders from './SpaceInvaders';

interface Command {
  input: string;
  output: string;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current && !isPlaying) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (command: string) => {
    const newCommand: Command = {
      input: command,
      output: '',
    };

    switch (command.toLowerCase()) {
      case 'help':
        newCommand.output = `Available commands:
- help: Show this help message
- about: Learn more about me
- contact: Get my contact information
- clear: Clear the terminal
- spaceinvaders: Play Space Invaders
- exit: Exit the terminal`;
        break;
      case 'about':
        newCommand.output = `Hi, I'm Daniel Johansson!

I'm a Full Stack Developer based in Sweden with a passion for building innovative web applications. 
My expertise includes:
- Frontend: React, TypeScript, Next.js, Tailwind CSS
- Backend: Node.js, Express, Python, Django
- DevOps: Docker, AWS, CI/CD 
- Database: PostgreSQL, MongoDB

I love creating clean, efficient code and solving complex problems. When I'm not coding, 
you can find me exploring new technologies or contributing to open-source projects.`;
        break;
      case 'contact':
        newCommand.output = `Let's connect!

- Email: daniel@codebymini.se
- GitHub: https://github.com/codebymini
- LinkedIn: https://www.linkedin.com/in/codebymini
- Website: https://codebymini.se

Feel free to reach out for collaborations, opportunities, or just to say hi!`;
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'spaceinvaders':
        setIsPlaying(true);
        break;
      case 'exit':
        window.close();
        break;
      default:
        newCommand.output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, newCommand]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        handleCommand(input.trim());
      }
    }
  };

  const handleGameExit = () => {
    setIsPlaying(false);
    setHistory((prev) => [
      ...prev,
      {
        input: 'exit',
        output: 'Game ended. Type "help" for available commands.',
      },
    ]);
  };

  return (
    <div className="w-full md:w-[800px] h-[calc(100vh-8rem)] md:h-[600px] bg-terminal-bg rounded-lg overflow-hidden shadow-xl border border-terminal-accent/20 mx-auto">
      <div className="bg-terminal-header p-2 md:p-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-terminal-text text-sm md:text-base">
          Terminal
        </div>
      </div>
      <div
        ref={terminalRef}
        className="p-3 md:p-4 h-[calc(100%-2.5rem)] overflow-y-auto font-mono cursor-text scroll-smooth
          scrollbar-thin scrollbar-thumb-terminal-accent/50 scrollbar-track-terminal-header hover:scrollbar-thumb-terminal-accent/70
          text-sm md:text-base"
        onClick={focusInput}
      >
        <div className="mb-4 text-terminal-accent">
          Welcome to the terminal! Type 'help' for available commands.
          {isMobile && (
            <div className="mt-2 text-terminal-text text-xs">
              Note: Some features may be limited on mobile devices.
            </div>
          )}
        </div>
        {history.map((command, index) => (
          <div key={index} className="mb-2">
            <div className="text-terminal-accent break-all">
              $ {command.input}
            </div>
            {command.output && (
              <div className="text-terminal-text whitespace-pre-wrap break-words">
                {command.output}
              </div>
            )}
          </div>
        ))}
        {isPlaying ? (
          <SpaceInvaders onExit={handleGameExit} />
        ) : (
          <div className="flex items-center">
            <span className="text-terminal-accent mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-terminal-text caret-terminal-accent text-sm md:text-base"
              autoFocus
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
