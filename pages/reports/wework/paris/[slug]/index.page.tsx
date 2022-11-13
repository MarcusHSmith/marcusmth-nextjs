import { useRouter } from 'next/router';
import { EmblaCarousel } from '../../../../../components/EmblaCarousel/EmblaCarousel';
import { HeaderBio } from '../../../../../components/HeaderBio/HeaderBio';
import Map from '../../../../../components/MapBox/map';
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
      <span className="font-bold text-lg">{locationData.name}</span>
          <hr/>
        <div className='flex flex-row justify-between'>
          <div className='h-64 w-64 aspect-square'>
           <EmblaCarousel images={locationData.allImages} />
          </div>
          <div className='h-64 relative'>
            <Map location={locationData.location}/>
          </div>
        </div>
        <span>{locationData.name}</span>
        <span>{locationData.address}</span>
      </div>
    </div>
  );
}