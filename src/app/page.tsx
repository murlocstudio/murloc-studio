import { getStudioData } from '@/lib/data/studio-api';
import { OnePageStudioClient } from '@/components/OnePageStudioClient';

export const revalidate = 0; // Fresh dynamic data on every request

export default async function HomePage() {
  const data = await getStudioData();

  return <OnePageStudioClient initialData={data} />;
}
