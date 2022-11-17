import Link from 'next/link';
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
      <Link href={'/reports/wework/paris'}>Paris Guide</Link>
          <hr/>
        <div className='flex flex-row justify-between'>
          <div className='h-64 w-64 aspect-square'>
            {locationData.allImages.length > 0 && (
              <EmblaCarousel images={locationData.allImages} />
            )}
          </div>
          <div className='h-64 relative'>
            <Map location={locationData.location}/>
          </div>
        </div>
        <div>
          <span>Location</span> <br/>
          <a href={`https://www.google.com/maps?q=${locationData.address}`}>{locationData.address}</a>
        </div>
        <div>
          <a href={locationData.weworkURL.toString()}>WeWork Link</a>
        </div>
        {locationData.accolades.length > 0 && (
          <>
            <span className='text-xl font-bold'>Accolades</span>
            {locationData.accolades.map((a) => {
              return (
                <div key={a}>
                  <span>{a}</span>
                </div>
              )
            })}
          </>
        )}
        {locationData.positives && locationData.positives.length > 0 && (
          <>
            <span className='text-xl font-bold'>Positives</span>
            {locationData.positives.map((a) => {
              return (
                <div key={a}>
                  <span>{a}</span>
                </div>
              )
            })}
          </>
        )}
        {locationData.negatives && locationData.negatives.length > 0 && (
          <>
            <span className='text-xl font-bold'>Negatives</span>
            {locationData.negatives.map((a) => {
              return (
                <div key={a}>
                  <span>{a}</span>
                </div>
              )
            })}
          </>
        )}

      </div>
    </div>
  );
}