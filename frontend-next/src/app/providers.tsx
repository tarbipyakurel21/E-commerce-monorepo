"use client";
import { AuthProvider } from "@/context/AuthContext";
import { ReduxProvider } from "@/redux/ReduxProvider"; 
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'


const queryClient=new QueryClient();

const Providers=({children}:{children:React.ReactNode})=>{

    return(
        <ReduxProvider>
            <AuthProvider>
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
            </AuthProvider>
            </ReduxProvider>
    )
};

export default Providers;