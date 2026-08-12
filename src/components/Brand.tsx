import { publicAsset } from '@/lib/paths';
export default function Brand({ compact = false }: { compact?: boolean }) {
  return <span className={`brand ${compact ? 'brand-compact' : ''}`}><span className="brand-emblem"><img src={publicAsset('/brand/dar-signage.png')} alt="D.A.R. Motors" /></span><span className="brand-copy"><strong>D.A.R.</strong><small>Motors</small></span></span>;
}
