
// src/app/admin/referrals/page.tsx
'use client';

import { useEffect, useState } from 'react';
import MetricCard from './components/MetricCard';
import ReferralTable from './components/ReferralTable';
import TimeChart from './components/TimeChart';
import RefBarChart from './components/RefBarChart';

// Define types for the data
interface Click {
  id: number;
  ref: string;
  utm: string | null;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
  [key: string]: string | number | null;
}

interface Conversion {
  id: number;
  ref: string;
  action: string;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
  [key: string]: string | number | null;
}

interface ClicksPerRef {
  ref: string;
  clicks: number;
}

interface ConversionsPerRef {
  ref: string;
  conversions: number;
}

interface ClicksPerUtm {
  utm: string;
  clicks: number;
}

interface TimeData {
  date: string;
  clicks?: number;
  conversions?: number;
}

interface DashboardData {
  clicksPerRef: ClicksPerRef[];
  conversionsPerRef: ConversionsPerRef[];
  clicksPerUtm: ClicksPerUtm[];
  latestClicks: Click[];
  latestConversions: Conversion[];
  clicksOverTime: TimeData[];
  conversionsOverTime: TimeData[];
}

export default function ReferralsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('30'); // 7, 30, all
  const [refInput, setRefInput] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [savedLinks, setSavedLinks] = useState<Array<{ref: string; url: string; created_at: string;}>>([]);
  const [selectedRef, setSelectedRef] = useState('');
  const [selectedUtm, setSelectedUtm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams();
        params.set('days', timeFilter);
        if (selectedRef) params.set('ref', selectedRef);
        if (selectedUtm) params.set('utm', selectedUtm);
        const response = await fetch(`/api/admin/referrals?${params.toString()}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching referral data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [timeFilter, selectedRef, selectedUtm]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('generated_referral_links') || '[]');
      setSavedLinks(saved);
    } catch {}
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading Dashboard...</div>;
  }

  if (!data) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Error loading data. Please check the database connection.</div>;
  }

  // Process data for metrics and charts
  const totalClicks = data.clicksPerRef.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = data.conversionsPerRef.reduce((sum, item) => sum + item.conversions, 0);
  const overallConversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) + '%' : '0%';

  const refPerformance = data.clicksPerRef.map(clickData => {
    const conversionData = data.conversionsPerRef.find(convData => convData.ref === clickData.ref);
    return {
      ref: clickData.ref,
      clicks: clickData.clicks,
      conversions: conversionData ? conversionData.conversions : 0,
    };
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Referral Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Generate Referral URL</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input value={refInput} onChange={(e) => setRefInput(e.target.value)} placeholder="ref" className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" />
          <input value={utmSource} onChange={(e) => setUtmSource(e.target.value)} placeholder="utm_source" className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" />
          <input value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} placeholder="utm_medium" className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" />
          <input value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} placeholder="utm_campaign" className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" />
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              const origin = typeof window !== 'undefined' ? window.location.origin : '';
              const params = new URLSearchParams();
              if (refInput) params.set('ref', refInput);
              if (utmSource) params.set('utm_source', utmSource);
              if (utmMedium) params.set('utm_medium', utmMedium);
              if (utmCampaign) params.set('utm_campaign', utmCampaign);
              const url = `${origin}/go?${params.toString()}`;
              setGeneratedUrl(url);
              try {
                const next = [{ ref: refInput, url, created_at: new Date().toISOString() }, ...savedLinks].slice(0, 50);
                setSavedLinks(next);
                localStorage.setItem('generated_referral_links', JSON.stringify(next));
              } catch {}
              navigator.clipboard?.writeText(url);
            }}
            className="px-4 py-2 bg-accent rounded-md"
          >Create & Copy</button>
          <span className="text-gray-300 break-all">{generatedUrl}</span>
        </div>
        {savedLinks.length > 0 && (
          <div className="mt-4">
            <h4 className="text-white font-semibold mb-2">Saved Links</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th className="px-6 py-3">Ref</th>
                    <th className="px-6 py-3">URL</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedLinks.map((l, i) => (
                    <tr key={i} className="bg-gray-800 border-b border-gray-700">
                      <td className="px-6 py-4">{l.ref}</td>
                      <td className="px-6 py-4 break-all">{l.url}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button onClick={() => { setSelectedRef(l.ref); const url = new URL(l.url); setSelectedUtm(url.searchParams.get('utm_source') || ''); }} className="px-3 py-1 bg-gray-700 rounded">View Stats</button>
                        <button onClick={() => navigator.clipboard?.writeText(l.url)} className="px-3 py-1 bg-gray-700 rounded">Copy</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {(selectedRef || selectedUtm) && (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-300">
              <span className="mr-4">Active Filters:</span>
              {selectedRef && <span className="mr-4">ref={selectedRef}</span>}
              {selectedUtm && <span>utm~{selectedUtm}</span>}
            </div>
            <button onClick={() => { setSelectedRef(''); setSelectedUtm(''); }} className="px-3 py-1 bg-gray-700 rounded">Clear Filters</button>
          </div>
        </div>
      )}

      

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <MetricCard title="Total Clicks" value={totalClicks} />
        <MetricCard title="Total Conversions" value={totalConversions} />
        <MetricCard title="Overall Conversion Rate" value={overallConversionRate} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TimeChart title="Clicks Over Time" data={data.clicksOverTime} label="clicks" />
        <TimeChart title="Conversions Over Time" data={data.conversionsOverTime} label="conversions" />
      </div>
      
      <div className="mb-6">
        <RefBarChart title="Referrer Performance (Clicks vs. Conversions)" data={refPerformance} />
      </div>


      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReferralTable title="Latest 100 Clicks" data={data.latestClicks} columns={['id', 'ref', 'utm', 'ip', 'created_at']} />
        <ReferralTable title="Latest 100 Conversions" data={data.latestConversions} columns={['id', 'ref', 'action', 'ip', 'created_at']} />
      </div>
    </div>
  );
}
