'use client'

import { Card } from './Card'
import { Section as SectionType } from '@/config/sections'

interface SectionProps {
  section: SectionType
}

export function Section({ section }: SectionProps) {
  return (
    <section className="mb-6">
      <h2 className={`text-lg font-bold ${section.titleColor} mb-2`}>
        {section.title}
      </h2>

      {section.description && (
        <p className="text-xs text-gray-600 mb-2">{section.description}</p>
      )}

      {section.details && (
        <ul className="text-xs text-gray-600 mb-2 list-disc list-inside">
          {section.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      )}

      <div className={`grid ${section.gridCols} gap-3`}>
        {section.cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  )
}