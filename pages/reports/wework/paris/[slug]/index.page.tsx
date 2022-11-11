import { useRouter } from 'next/router';
import { EmblaCarousel } from '../../../../../components/EmblaCarousel/EmblaCarousel';
import { HeaderBio } from '../../../../../components/HeaderBio/HeaderBio';
import { data } from '../index.page';


export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query as {
    slug: string;
  };
    const locationData = data.find((d) => {
    if (d.address === slug) {
      return true
    }
    return false
  })
  if (!locationData) {
    return (<span>loading</span>)
  }
  return (
    <div className='prose mx-auto'>
      <HeaderBio presenation='min'/>
      <div className='flex flex-col gap-1'>
        <div className='w-64 h-64 bg-red-200'>
        <EmblaCarousel images={locationData.allImages} />
        </div>
        <span>{locationData.name}</span>
        <span>{locationData.address}</span>
      </div>
    </div>
  );
}