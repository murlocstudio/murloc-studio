import { getStudioData } from '@/lib/data/studio-api';
import { AdminDashboardClient } from './components/AdminDashboardClient';

export const revalidate = 0;

export default async function AdminPage() {
  const initialData = await getStudioData();

  return <AdminDashboardClient initialData={initialData} />;
}
