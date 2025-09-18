'use client'

import { Card } from './Card'
import { Section as SectionType } from '@/config/sections'

interface SectionProps {
  section: SectionType
}

export function Section({ section }: SectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className={`text-2xl font-bold ${section.titleColor} mb-3 flex items-center gap-2`}>
          {section.title}
        </h2>

        {section.description && (
          <p className="text-base text-gray-700 mb-3 font-medium">
            {section.description}
          </p>
        )}

        {section.details && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <ul className="text-sm text-gray-600 space-y-1">
              {section.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={`grid ${section.gridCols} gap-6`}>
        {section.cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  )
}