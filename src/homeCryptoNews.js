import react from 'react'
import { useGetCryptoNewsQuery } from './services/crptonewsApi';
import moment from "moment";

const HomeCryptoNews = () => {
    const {data: news, isFetching} = useGetCryptoNewsQuery({newsCategory: "cryptocurrency", count: 10});
  console.log(news);
  const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";
  return (
    <div>
    {isFetching ? <p>Loading...</p> : 
    <div className='newsContainer grid gap-4 grid-cols-1 midtablet:grid-cols-2 laptop:grid-cols-3 w-full py-2 midtablet:py-4'>
      {news.value.map((newss, i) => (
        <div className='newsCardContainer  bg-white px-4 py-2 hover:shadow-xl' key={i}>
         <a href={newss.url} target='_blank' rel='noreferrer'>
           <div className='news-image-container flex justify-between mb-4'>
             <h1 className="font-poppins font-bold w-3/4">{newss.name}</h1>
             <div className='newsImgCont w-1/4'>
               <img src={newss?.image?.thumbnail?.contentUrl || demoImage} alt="newsicon" className='w-full'/>
             </div>
           </div>
           <p className='font-poppins text-sm mb-4'>
             {newss.description > 100 ? `${news.description.substring(0, 100)}...`: newss.description}
           </p>
           <div className='providerContainer flex justify-between items-center pb-2'>
             <div className='flex w-full items-center'>
             <div className='Avatar w-8 h-8'>
               <img src={newss.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" className='rounded-full'/>
             </div>
             <p className='font-poppins text-xs ml-2 font-bold'>{newss.provider[0]?.name}</p>
           </div>
         <p className='font-poppins text-xs w-1/2  font-bold'>{moment(newss.datePublished).startOf('ss').fromNow()}</p>
           </div>
         </a>
         </div>
      ))}
    </div>
    }
  </div>
  )
}

export default HomeCryptoNews;