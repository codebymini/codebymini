import { CardWrapper } from './Card';

export default function Contact({ title, linkedin, github, email }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white font-mono">{title}</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[#60a5fa]">$</span>
          <a
            href={linkedin[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors font-mono"
          >
            linkedin.com/in/codebymini
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#60a5fa]">$</span>
          <a
            href={github[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors font-mono"
          >
            github.com/codebymini
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#60a5fa]">$</span>
          <a
            href={`mailto:${email[0]}`}
            className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors font-mono"
          >
            {email[0]}
          </a>
        </div>
      </div>
    </div>
  );
}
