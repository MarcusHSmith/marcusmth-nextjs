import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
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
      <HeaderBio presentation='min'/>
      <div className='flex flex-col gap-1'>
      <Header text={locationData.name}/>
      <Link href={'/reports/wework/berlin'}>Berlin Guide</Link>
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
          <Header text='Location'/> <br/>
          <a href={`https://www.google.com/maps?q=${locationData.address}`}>{locationData.address}</a>
        </div>
        <div>
          <a href={locationData.weworkURL.toString()}>WeWork Link</a>
        </div>
        {locationData.accolades.length > 0 && (
          <>
            <Header text='Accolades'/>
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
          <Details header='Positives' content={locationData.positives}/>
        )}
        {locationData.negatives && locationData.negatives.length > 0 && (
          <Details header='Negatives' content={locationData.negatives}/>
        )}
      </div>
    </div>
  );
}

function Header({text}: {text:string}): ReactElement {
  return (<span className='text-xl font-bold'>{text}</span>)
}

function Details({header, content}: {header: string, content: string[]}): ReactElement {
  return (
    <div className='flex flex-col'>
      <Header text={header}/>
      {content.map((a) => {
        return (
          <div key={a}>
            <span className='italic'><q>{a}</q></span>
          </div>
        )
      })}
    </div>
  )
}