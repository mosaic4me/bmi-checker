'use client';

import { ReproductiveHealthImpact } from '@/lib/medical-data';
import { useState } from 'react';

interface ReproductiveHealthImpactProps {
  data: ReproductiveHealthImpact;
  categoryColor: string;
}

export function ReproductiveHealthImpactPanel({ data, categoryColor }: ReproductiveHealthImpactProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('fertility');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    { key: 'fertility', icon: '🔬', label: 'Fertility & Conception', data: data.impacts.fertility },
    { key: 'pregnancy', icon: '🤰', label: 'Pregnancy Outcomes', data: data.impacts.pregnancy },
    { key: 'menstrual', icon: '📅', label: 'Menstrual Health', data: data.impacts.menstrual },
    { key: 'longTerm', icon: '🏥', label: 'Long-term Health', data: data.impacts.longTerm },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-teal-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <span className="text-3xl">🔬</span>
        Impact on Reproductive Health
      </h3>
      <p className="text-gray-600 mb-6 font-medium">{data.category}</p>

      {/* Impact Sections */}
      <div className="space-y-3 mb-6">
        {sections.map((section) => (
          <div key={section.key} className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 flex items-center justify-between transition-colors"
            >
              <span className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                {section.label}
              </span>
              <span className="text-2xl text-gray-600">
                {expandedSection === section.key ? '▼' : '▶'}
              </span>
            </button>

            {expandedSection === section.key && (
              <div className="px-4 py-4 bg-white">
                <ul className="space-y-2">
                  {section.data.map((impact, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">•</span>
                      <span className="text-gray-700">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Collapsible Evidence Section */}
      <details className="group bg-blue-50 border-2 border-blue-200 rounded-xl overflow-hidden">
        <summary className="cursor-pointer p-4 hover:bg-blue-100 transition-colors flex items-center justify-between font-bold text-blue-900">
          <span className="flex items-center gap-2">
            <span>📊</span> View Research Evidence & WHO Guidelines
          </span>
          <span className="group-open:rotate-180 transition-transform text-2xl">▼</span>
        </summary>

        <div className="p-4 space-y-4 border-t-2 border-blue-200">
          {/* Statistical Evidence */}
          <div>
            <h5 className="font-semibold text-blue-900 mb-3">Key Statistical Findings</h5>
            <div className="space-y-2">
              {data.statistics.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="font-semibold text-blue-800 text-sm mb-1">{stat.finding}</div>
                  <div className="text-gray-700 text-xs mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 italic">Source: {stat.source}</div>
                </div>
              ))}
            </div>
          </div>

          {/* WHO Evidence */}
          <div className="bg-white bg-opacity-80 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>🏛️</span> WHO Evidence Summary
            </h5>
            <p className="text-gray-800 text-sm leading-relaxed mb-3">{data.whoEvidence.summary}</p>

            <div className="space-y-1">
              {data.whoEvidence.keyPoints.slice(0, 3).map((point, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  <span className="text-sm" style={{ color: categoryColor }}>✓</span>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-600">
                <span className="font-semibold">Citations:</span> {data.whoEvidence.citation}
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
