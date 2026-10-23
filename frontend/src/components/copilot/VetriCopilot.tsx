import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  ShieldCheck, 
  Scale, 
  Building2, 
  Clock, 
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { mockCases } from '@/data/mockCases';

interface Message {
  id: string;
  sender: 'USER' | 'COPILOT';
  text: string;
  timestamp: string;
  findings?: string[];
  cases?: Array<{ id: string; title: string }>;
  action?: string;
  personaTarget?: 'CM_VIJAY' | 'GOVT_ADVOCATE' | 'GENERAL';
}

export const VetriCopilot: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePersona, setActivePersona] = useState<'CM_VIJAY' | 'GOVT_ADVOCATE'>('CM_VIJAY');
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'COPILOT',
      text: 'Vanakkam! I am Vetri Copilot — Chief Minister’s Office & Government Law Officers Legal Intelligence Assistant. How can I assist leadership today?',
      timestamp: 'Just now',
      personaTarget: 'CM_VIJAY'
    }
  ]);

  const quickPrompts = activePersona === 'CM_VIJAY' ? [
    'What urgent matters need my immediate intervention today?',
    'Which cases carry financial exposure exceeding ₹100 Crore?',
    'Show adverse orders that threaten statewide policy.',
    'Summarize instructions pending from District Collectors.'
  ] : [
    'Show upcoming hearings today before Madras High Court.',
    'List matters where counter-affidavits are pending.',
    'Review seigniorage & mining penalty SLP status in Supreme Court.',
    'Display NGT Southern Bench compliance deadlines.'
  ];

  const handleSend = (textToSend?: string) => {
    const promptText = (textToSend || query).trim();
    if (!promptText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'USER',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    // Contextual Synthesis
    setTimeout(() => {
      let botResponse: Message;

      const lower = promptText.toLowerCase();

      if (lower.includes('urgent') || lower.includes('immediate') || lower.includes('today')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'COPILOT',
          text: 'CM Sir, 2 matters require immediate attention before 2:15 PM today:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          findings: [
            'DEMO-TN-REV-0001 (Parandur Land Acquisition): Hon’ble First Bench hearing at 2:15 PM. Collector Kanchipuram instructions pending to AG.',
            'DEMO-TN-HIGHWAYS-0005 (Ring Road Arbitral Execution): Commercial Court 48-hour indulgence expires tomorrow; ₹240 Cr treasury attachment threat.'
          ],
          cases: [
            { id: 'DEMO-TN-REV-0001', title: 'Sriperumbudur Landowners vs State of TN' },
            { id: 'DEMO-TN-HIGHWAYS-0005', title: 'South India Infrastructure vs Highways Dept' }
          ],
          action: 'Direct Collector Kanchipuram to immediately transmit compensation parameters to Advocate General office.'
        };
      } else if (lower.includes('100') || lower.includes('financial') || lower.includes('crore') || lower.includes('exposure')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'COPILOT',
          text: 'Here are the highest financial exposure matters currently tracked statewide:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          findings: [
            'Supreme Court SLP No. 4192/2026 (Granite seigniorage): ₹310 Cr revenue risk.',
            'Highways Dept Commercial Arbitration (Ring Road): ₹240 Cr execution petition.',
            'School Education Writ Appeal (Aided Teachers): ₹215.8 Cr annual recurring liability.'
          ],
          cases: [
            { id: 'DEMO-TN-SC-0008', title: 'Southern Granite Exporters vs State of TN' },
            { id: 'DEMO-TN-HIGHWAYS-0005', title: 'Ring Road Arbitral Award Execution' },
            { id: 'DEMO-TN-EDU-0003', title: 'Aided School Teachers Grant Regularisation' }
          ],
          action: 'Review contingency SLP preparations with Law Secretary & Finance Department.'
        };
      } else if (lower.includes('hearing') || lower.includes('cause list') || lower.includes('high court')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'COPILOT',
          text: 'Law Officer Cause List Digest for Madras High Court (Principal & Madurai):',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          findings: [
            'Item 18 (Court 1): Special Mention WP/28914/2026 (AG appearing).',
            'Item 8 (Court 4 - Crl Div): HCP/1042/2026 Goondas delay (Public Prosecutor).',
            'Court 3 (Madurai Bench): Orders reserved for pronouncement in WA(MD)/891/2026.'
          ],
          cases: [
            { id: 'DEMO-TN-REV-0001', title: 'Parandur Infrastructure Hearing' },
            { id: 'DEMO-TN-HOME-0002', title: 'Detention Order Procedural Delay' }
          ],
          action: 'Ensure draft counter-affidavit is approved by Special GP before call work starts.'
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'COPILOT',
          text: `Analysis complete regarding: "${promptText}". The Government of Tamil Nadu is tracking related proceedings across 8 departments and 5 judicial tiers.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          findings: [
            'State Law Officers have entered appearance in all connected benches.',
            'Cross-department instructions have been requested through Secretariat tapal records.'
          ],
          cases: [
            { id: 'DEMO-TN-REV-0001', title: 'Revenue & Land Administration Benchmark' }
          ],
          action: 'Click below to review underlying certified case record in Case Explorer.'
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 p-3 bg-gradient-to-r from-tn-navy-950 via-tn-navy-900 to-slate-900 text-white rounded-full shadow-2xl border-2 border-tn-gold-500/80 hover:scale-105 transition-all flex items-center space-x-2.5 group"
          title="Open Vetri Copilot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-tn-gold-400 group-hover:rotate-12 transition-transform" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-1 -right-1 animate-pulse"></span>
          </div>
          <span className="text-xs font-bold tracking-wide pr-1 font-serif">
            VETRI COPILOT
          </span>
          <span className="text-[10px] bg-tn-gold-500/20 text-tn-gold-300 font-mono px-1.5 py-0.5 rounded border border-tn-gold-500/30">
            CM & Law
          </span>
        </button>
      )}

      {/* Floating Copilot Modal / Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-5 right-5 z-50 bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden transition-all duration-200 ${
            isExpanded ? 'w-[750px] h-[640px]' : 'w-[420px] h-[540px]'
          }`}
        >
          {/* Header */}
          <div className="h-14 bg-gradient-to-r from-tn-navy-950 via-tn-navy-900 to-slate-900 px-4 text-white flex items-center justify-between border-b border-tn-gold-500/40">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-tn-gold-500/20 border border-tn-gold-500/60 flex items-center justify-center">
                <Bot className="w-4 h-4 text-tn-gold-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-serif font-black text-xs text-tn-gold-400 tracking-wider">
                    VETRI COPILOT
                  </span>
                  <span className="text-[9px] bg-emerald-950 text-emerald-300 font-mono px-1 rounded border border-emerald-700">
                    LIVE
                  </span>
                </div>
                <div className="text-[10px] text-slate-300">
                  CM Office & Govt Law Officers AI Intelligence
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-slate-400">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:text-white rounded hover:bg-white/10"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-white rounded hover:bg-white/10"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Persona Mode Switcher */}
          <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Executive Mode:
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActivePersona('CM_VIJAY')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  activePersona === 'CM_VIJAY'
                    ? 'bg-tn-navy-950 text-tn-gold-400 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                CM Vijay (CMO)
              </button>
              <button
                onClick={() => setActivePersona('GOVT_ADVOCATE')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  activePersona === 'GOVT_ADVOCATE'
                    ? 'bg-tn-navy-950 text-tn-gold-400 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Govt Advocates
              </button>
            </div>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/70 text-xs">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex flex-col ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[88%] rounded-lg p-3 ${
                    m.sender === 'USER'
                      ? 'bg-tn-navy-900 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-none space-y-2'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                  {m.findings && (
                    <div className="pt-1 border-t border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        Verified Findings:
                      </span>
                      <ul className="list-disc pl-3.5 space-y-0.5 text-[11px] text-slate-700">
                        {m.findings.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {m.cases && (
                    <div className="pt-1 flex flex-wrap gap-1">
                      {m.cases.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setIsOpen(false);
                            navigate(`/cases/${c.id}`);
                          }}
                          className="font-mono text-[10px] text-tn-navy-900 font-bold bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded border border-slate-300 flex items-center space-x-1"
                        >
                          <span>{c.id}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      ))}
                    </div>
                  )}

                  {m.action && (
                    <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-950 text-[11px]">
                      <strong>Direct Recommendation:</strong> {m.action}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1 font-mono">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 p-2 bg-white rounded-lg border border-slate-200 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-tn-navy-800 animate-bounce"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-tn-navy-800 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-tn-navy-800 animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[10px] text-slate-400 font-mono ml-1">Vetri Copilot analyzing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2 bg-white border-t border-slate-200">
            <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
              Suggested {activePersona === 'CM_VIJAY' ? 'CM Vijay' : 'Law Officer'} Prompts:
            </span>
            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="text-[10px] text-left px-2 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors truncate max-w-full"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center space-x-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={activePersona === 'CM_VIJAY' ? "Ask Vetri Copilot for executive briefing..." : "Ask Vetri Copilot regarding cause list, counters, or hearing..."}
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded focus:border-tn-navy-900 focus:outline-none shadow-xs"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="p-1.5 bg-tn-navy-900 hover:bg-tn-navy-800 disabled:opacity-40 text-white rounded transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
