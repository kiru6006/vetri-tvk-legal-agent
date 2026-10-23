import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, MapPin, AlertCircle, ArrowUpRight, Phone } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { OfficialItem } from '@/types';
import { OfficialContactModal } from '@/components/officials/OfficialContactModal';

export const OfficialsPage: React.FC = () => {
  const navigate = useNavigate();
  const [officials, setOfficials] = useState<OfficialItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOfficial, setSelectedOfficial] = useState<OfficialItem | null>(null);

  useEffect(() => {
    mockApi.getOfficials().then(res => {
      setOfficials(res);
      setLoading(false);
    });
  }, []);

  const filtered = officials.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.department.toLowerCase().includes(search.toLowerCase()) ||
    o.district.toLowerCase().includes(search.toLowerCase()) ||
    o.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
            Government Officials & Administrative Cadre
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify Secretaries, District Collectors, and Heads of Departments responsible for court compliance and instructions.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Official, Cadre, District..."
            className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded focus:border-tn-navy-700 outline-none w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(off => (
          <div
            key={off.id}
            onClick={() => setSelectedOfficial(off)}
            className="p-5 bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 font-mono">
                  {off.cadre} Cadre
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {off.district}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 mt-2.5 tracking-tight">
                {off.name}
              </h3>
              <div className="text-xs text-slate-700 font-semibold mt-0.5">
                {off.designation}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Dept: <strong className="text-tn-navy-950 font-bold">{off.department}</strong>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3.5 border-t border-slate-100 text-center">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Matters</span>
                  <span className="text-base font-extrabold text-slate-900">{off.activeMatters}</span>
                </div>
                <div className="p-2 rounded-lg bg-red-50/80 border border-red-100">
                  <span className="text-[10px] text-red-700 uppercase font-bold block">Critical</span>
                  <span className="text-base font-extrabold text-red-700">{off.criticalMatters}</span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-100">
                  <span className="text-[10px] text-amber-800 uppercase font-bold block">Actions</span>
                  <span className="text-base font-extrabold text-amber-900">{off.pendingActions}</span>
                </div>
              </div>

              {/* Historical Postings */}
              <div className="mt-3.5 p-2 bg-slate-50/80 rounded-lg border border-slate-100 text-xs text-slate-600">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Direct Official Contact:</span>
                <div className="font-mono text-[11px] font-semibold text-tn-navy-900 flex items-center">
                  <Phone className="w-3 h-3 mr-1 text-emerald-600" />
                  {off.contactDetails.officialPhone}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-tn-navy-900 hover:text-blue-800">
              <span>View Contact Dossier & Hierarchy</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Official Contact Modal Popup */}
      <OfficialContactModal
        official={selectedOfficial}
        onClose={() => setSelectedOfficial(null)}
      />
    </div>
  );
};
