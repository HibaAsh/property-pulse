"use client"

import AuthProvider from "@/components/AuthProvider"
import { GlobalProvider } from "@/context/GlobalContext"

export default function ClientProviders({ children }) {
    return (
        <GlobalProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </GlobalProvider>
    )
}