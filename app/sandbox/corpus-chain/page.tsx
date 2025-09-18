'use client'

import { useRouter } from 'next/navigation'
import { CorpusChain } from '@/components/CorpusChain'

export default function CorpusChainPage() {
  const router = useRouter()

  return <CorpusChain onBack={() => router.push('/')} />
}


