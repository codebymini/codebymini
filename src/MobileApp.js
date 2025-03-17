import './output.css';
import Terminal from './components/Terminal';

function MobileApp() {
  return (
    <div className="bg-[#0f172a] min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#3b82f6] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#10b981] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#8b5cf6] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="images/profile-picture.png"
              alt="profile"
              className="w-16 h-16 rounded-full border-2 border-[#3b82f6] object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">
                Daniel Johansson
              </h1>
              <p className="text-[#94a3b8] font-mono">~/codebymini</p>
            </div>
          </div>
          <div className="text-[#94a3b8] font-mono text-sm">
            Type <span className="text-[#60a5fa]">help</span> to see available
            commands
          </div>
        </div>

        {/* Terminal */}
        <div className="max-w-4xl mx-auto">
          <Terminal />
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-[#94a3b8] text-sm font-mono">
            © {new Date().getFullYear()} codebymini
          </p>
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
