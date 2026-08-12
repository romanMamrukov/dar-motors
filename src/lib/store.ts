'use client'; import {seedVehicles,seedLeads} from './seed'; import {Vehicle,Lead} from './types';
const V='dar_vehicles_v1',L='dar_leads_v1';
export const getVehicles=():Vehicle[]=>{if(typeof window==='undefined')return seedVehicles;const x=localStorage.getItem(V);if(!x){localStorage.setItem(V,JSON.stringify(seedVehicles));return seedVehicles}return JSON.parse(x)};
export const saveVehicles=(v:Vehicle[])=>localStorage.setItem(V,JSON.stringify(v));
export const getLeads=():Lead[]=>{if(typeof window==='undefined')return seedLeads;const x=localStorage.getItem(L);if(!x){localStorage.setItem(L,JSON.stringify(seedLeads));return seedLeads}return JSON.parse(x)};
export const saveLeads=(v:Lead[])=>localStorage.setItem(L,JSON.stringify(v));
export const resetDemo=()=>{localStorage.removeItem(V);localStorage.removeItem(L);location.reload()};
