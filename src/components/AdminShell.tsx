'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
function withBasePath(path:string){const base=process.env.NEXT_PUBLIC_BASE_PATH||'';return `${base}${path}`}
export default function AdminShell({children}:{children:React.ReactNode}){
 const pathname=usePathname()??''; const normalized=pathname.replace(/\/+$/,''); const isLogin=normalized.endsWith('/admin/login');
 const[state,setState]=useState<'checking'|'authenticated'|'unauthenticated'>('checking');
 useEffect(()=>{if(isLogin){setState('unauthenticated');return}const yes=sessionStorage.getItem('dar_demo_auth')==='1';if(yes){setState('authenticated');return}setState('unauthenticated');window.location.replace(withBasePath('/admin/login/'))},[isLogin]);
 if(isLogin)return <>{children}</>; if(state==='checking')return <main className="shell section"><p>Checking admin session…</p></main>; if(state==='unauthenticated')return <main className="shell section"><p>Redirecting to login…</p></main>;
 return <div className="admin-shell"><aside className="sidebar"><h2>D.A.R. Admin</h2><Link href="/admin/">Dashboard</Link><Link href="/admin/cars/">Vehicles</Link><Link href="/admin/cars/new/">Add vehicle</Link><Link href="/admin/leads/">Leads</Link><Link href="/">Public site</Link><button type="button" onClick={()=>{sessionStorage.removeItem('dar_demo_auth');window.location.replace(withBasePath('/admin/login/'))}} style={{background:'none',border:0,color:'#ddd',padding:8,cursor:'pointer'}}>Log out</button></aside><main className="admin-main">{children}</main></div>
}
