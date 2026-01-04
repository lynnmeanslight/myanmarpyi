'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'
import { LanguageProvider } from './i18n/LanguageContext'

import { getConfig } from './wagmiProvider'

export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          {props.children}
        </LanguageProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
