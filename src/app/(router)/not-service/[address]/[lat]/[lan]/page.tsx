import NotServiceClient from '@/src/component/client/page/not-service/NotServiceClient'

interface PageProps {
  params: Promise<{ address: string, lat: string, lan: string }>
}

export default async function NotServicePage({ params }: PageProps) {
  const { address, lat, lan } = await params

  return <NotServiceClient address={address} lat={lat} lan={lan} />
}