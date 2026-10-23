import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, ArrowUpRight, Scale, AlertTriangle, Coins } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { DistrictItem } from '@/types';

export const DistrictsPage: React.FC = () => {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState<DistrictItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getDistricts().then(res => {
      setDistricts(res);
      setLoading(false);
    });
  }, []);

  const filtered = districts.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.collectorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
            Tamil Nadu District Litigation Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Regional litigation density, pending collector instructions, and municipal/revenue compliance across Tamil Nadu districts.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search District or Collector..."
            className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded focus:border-tn-navy-700 outline-none w-64"
          />
        </div>
      </div>

      {/* District Intelligence Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">District Collector</th>
                <th className="py-2.5 px-3 text-center">Active Cases</th>
                <th className="py-2.5 px-3 text-center">Critical Matters</th>
                <th className="py-2.5 px-3 text-center">Hearings Today/Week</th>
                <th className="py-2.5 px-3 text-center">Adverse Orders</th>
                <th className="py-2.5 px-3">Financial Exposure</th>
                <th className="py-2.5 px-3">Dominant Legal Issues</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(d => (
                <tr
                  key={d.id}
                  onClick={() => navigate(`/cases?district=${encodeURIComponent(d.name)}`)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 whitespace-nowrap font-bold text-tn-navy-950">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-tn-gold-600" />
                      <span>{d.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-700">
                    {d.collectorName}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-900">
                    {d.activeCases}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-red-700">
                    {d.criticalMatters}
                  </td>
                  <td className="py-2.5 px-3 text-center font-medium text-blue-800">
                    {d.upcomingHearings}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-red-600">
                    {d.adverseOrders}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap font-bold text-slate-800">
                    ₹{d.financialExposureCr} Cr
                  </td>
                  <td className="py-2.5 px-3 max-w-[260px] truncate text-slate-500" title={d.dominantIssues.join(', ')}>
                    {d.dominantIssues.join(' • ')}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <span className="text-xs font-semibold text-tn-navy-900 hover:underline flex items-center justify-end">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
