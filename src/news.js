import React, {useState, useEffect} from 'react'
import { useGetCryptoNewsQuery } from './services/crptonewsApi';
import moment from "moment";
import {useGetCryptosQuery}  from "./services/cryptoApi";
const News = () => {
  const {data, isFetchin} = useGetCryptosQuery(100);
  const[newscategory, setNewsCategory] = useState('cryptocurrency');
  const {data: news, isFetching} = useGetCryptoNewsQuery({newsCategory: newscategory, count: 100});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Check your internet connection or reload page.')
  const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

   
  if(!isFetching && !data){
    setError(true);
}

  return (
    <div>
      
    <div className='w-full fixed top-20 flex justify-end bg-text  p-4'>
      {isFetchin ? <p className='font-poppins text-lg text-green-600'>Loading...</p> :
    <select name="news" id="news" onChange={(e) => setNewsCategory(e.target.value)} className=" py-1 px-4 focus:outline-none placeholder:text-fade font-base font-poppins rounded focus:border-2 focus:border-text shadow">
    <option value="cryptocurrency">cryptocurrency</option>
      {data?.data?.coins?.map((newss) => (
        <option value={newss.name}>{newss.name}</option>
      ))}
    </select>
}
    </div>
    {isFetching && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
    {error && <div className=' font-poppins text-red-600 text-lg'>{errorMessage}</div>}
        {!isFetching && !error && <>
      <div className='newsContainer grid gap-4 grid-cols-1 midtablet:grid-cols-2 laptop:grid-cols-3 w-full p-4 mt-24'>
      <p className='text-base text-fade font-poppins capitalize'>click on any news for more details...</p>
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
    </>}
    </div>
  )
}

export default News;