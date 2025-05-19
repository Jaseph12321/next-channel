import { use } from 'react';
import ProfileClient from './ProfileClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  return <ProfileClient id={id} />;
}
