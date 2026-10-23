import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Send, Sparkles, ArrowRight, ShieldCheck, Scale, ExternalLink } from 'lucide-react';

interface QnA {
  question: string;
  answer: string;
  findings: string[];
  cases: Array<{ id: string; title: string; court: string }>;
  recommendedAction: string;
  confidence: number;
}

const deterministicAnswers: Record<string, QnA> = {
  default: {
    question: 'What requires the Government’s immediate intervention today?',
    answer: '5 high-impact matters require executive attention today. The most acute is DEMO-TN-REV-0001 (Parandur Land Acquisition) where an interim status-quo order is pressed before the Hon’ble First Bench, and DEMO-TN-HIGHWAYS-0005 where Commercial Court granted 48 hours before garnishee attachment of Highways Treasury accounts for ₹240 Cr.',
    findings: [
      'Parandur Land Acquisition compensation benchmark instructions are pending from District Collector Kanchipuram to Advocate General (Hearing 2:15 PM today).',
      'Highways Department Treasury account attachment warning issued under Section 36 of Arbitration Act for ₹240 Cr.',
      'School Education Division Bench reserved judgment involving 4,200 aided teachers (₹215 Cr annual budget impact).'
    ],
    cases: [
      { id: 'DEMO-TN-REV-0001', title: 'Sriperumbudur Landowners vs. State of TN', court: 'Madras High Court (Principal Bench)' },
      { id: 'DEMO-TN-HIGHWAYS-0005', title: 'South India Infrastructure Concessionaires vs. Highways Dept', court: 'Commercial Division, Madras HC' }
    ],
    recommendedAction: 'Direct District Collector Kanchipuram to transmit instructions to AG Office by 1:00 PM; instruct Finance & Law Departments to move urgent commercial appellate motion.',
    confidence: 96
  },
  critical: {
    question: 'Show critical Government litigation and adverse order risks.',
    answer: 'Currently, 42 matters statewide are categorized as CRITICAL. 4 adverse orders/observations have been logged in the past 24 hours across Madras High Court and Commercial Courts.',
    findings: [
      'Contempt warnings issued to ACS Home over 21-day procedural delay in considering Goondas detention representation.',
      'Southern Zone NGT strictures against TWAD Board & Coimbatore Corporation for delayed sewage treatment plant commissioning.',
      'Madurai Bench reserved orders in teachers regularisation appeal.'
    ],
    cases: [
      { id: 'DEMO-TN-HOME-0002', title: 'Preventive Detention Delay Review', court: 'Madras High Court (Criminal Division)' },
      { id: 'DEMO-TN-MAWS-0004', title: 'Industrial Effluent & Noyyal River NGT Dispute', court: 'NGT Southern Zone' }
    ],
    recommendedAction: 'Convene urgent inter-departmental compliance meeting chaired by Chief Secretary with ACS Home and MAWS Secretary.',
    confidence: 94
  },
  exposure: {
    question: 'Which departments have the highest litigation financial exposure?',
    answer: 'The total statewide contingent liability stands at ₹1,845.6 Crores across 8 departments. The top 3 departments account for 69% of all exposure.',
    findings: [
      'Highways & Minor Ports: ₹540.0 Cr (Arbitral awards and contract default claims).',
      'Revenue & Disaster Management: ₹412.5 Cr (Enhanced land acquisition compensation under RFCTLARR Act).',
      'Municipal Administration (MAWS): ₹320.2 Cr (Underground drainage execution contracts and NGT environmental penalties).'
    ],
    cases: [
      { id: 'DEMO-TN-HIGHWAYS-0005', title: 'Ring Road Arbitral Execution (₹240 Cr)', court: 'Madras HC Commercial Division' },
      { id: 'DEMO-TN-REV-0001', title: 'Parandur Infrastructure Link Compensation (₹145 Cr)', court: 'Madras High Court' }
    ],
    recommendedAction: 'Audit arbitration limitation deadlines across Highways & MAWS to ensure Section 34 appeals are filed within 90 days.',
    confidence: 98
  }
};

export const AssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const [inputQuery, setInputQuery] = useState('');
  const [currentResponse, setCurrentResponse] = useState<QnA>(deterministicAnswers.default);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'What requires the Government’s immediate intervention today?',
    'Show critical Government litigation and adverse order risks.',
    'Which departments have the highest litigation financial exposure?',
    'Which cases have hearings scheduled today before Madras High Court?',
    'What are the statewide policy risks emerging across education and revenue?'
  ];

  const handleAsk = (query: string) => {
    setIsTyping(true);
    setInputQuery(query);

    setTimeout(() => {
      if (query.toLowerCase().includes('critical') || query.toLowerCase().includes('adverse')) {
        setCurrentResponse(deterministicAnswers.critical);
      } else if (query.toLowerCase().includes('financial') || query.toLowerCase().includes('exposure') || query.toLowerCase().includes('crore')) {
        setCurrentResponse(deterministicAnswers.exposure);
      } else {
        setCurrentResponse({
          ...deterministicAnswers.default,
          question: query
        });
      }
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-tn-navy-900" />
            <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
              AI Government Litigation Assistant
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Executive conversational intelligence grounded in certified cause lists, government orders, and law officer briefs.
          </p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-1.5 text-[11px] font-mono font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>EVIDENCE-BACKED RESPONSE MATRIX</span>
        </div>
      </div>

      {/* Suggested Executive Prompts */}
      <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
          Suggested Executive Queries (Click to Execute):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              className="text-xs text-left px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 hover:border-tn-navy-700 hover:bg-slate-100 text-slate-700 font-medium transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Active Conversation Response Box */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="font-bold text-sm text-tn-navy-950 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-tn-gold-500"></span>
            <span>Query: "{currentResponse.question}"</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Confidence: <strong className="text-emerald-700">{currentResponse.confidence}%</strong>
          </span>
        </div>

        {isTyping ? (
          <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-tn-navy-900 border-t-transparent rounded-full animate-spin"></div>
            <span>Synthesizing case registries, cause lists, and departmental briefs...</span>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            {/* Core Answer */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 leading-relaxed font-medium">
              {currentResponse.answer}
            </div>

            {/* Key Findings */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Evidence-Backed Key Findings:
              </span>
              <ul className="space-y-1 pl-4 list-disc text-slate-700 leading-relaxed">
                {currentResponse.findings.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {/* Underlying Critical Cases */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Directly Cited Case Files:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentResponse.cases.map(c => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/cases/${c.id}`)}
                    className="p-2.5 rounded border border-slate-200 hover:border-tn-navy-700 bg-white hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono font-bold text-tn-navy-950 block">{c.id}</span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{c.title}</span>
                      <span className="text-[10px] text-slate-400">{c.court}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action */}
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                Recommended Cabinet / Executive Intervention:
              </span>
              <p className="font-semibold">{currentResponse.recommendedAction}</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputQuery.trim()) {
            handleAsk(inputQuery.trim());
          }
        }}
        className="flex items-center space-x-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask executive question regarding orders, departments, advocates, or financial risks..."
          className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:border-tn-navy-900 focus:outline-none shadow-xs"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-tn-navy-900 hover:bg-tn-navy-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-xs"
        >
          <span>Submit Query</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
