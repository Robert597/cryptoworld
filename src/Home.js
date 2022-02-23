import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import millify from "millify";
import {useGetCryptosQuery}  from "./services/cryptoApi";
import HomeCryptoNews from './homeCryptoNews';
import HomeCrypto from './homeCrypto';


const Home = () => {
    const {data, isFetching} = useGetCryptosQuery(10);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Check your internet connection or reload page.');
    const globalStats = data?.data?.stats;
  
   if(!isFetching && !data){
       setError(true);
   }
  return (
    <div className='homeContainer p-4'>
        {isFetching && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        { error && <div className=' font-poppins text-red-600 text-lg'>{errorMessage}</div>}
       {!isFetching && !error && <> <h1 className='font-medium text-3xl text-left font-poppins'>Global Crypto Stats</h1>
  <div className='homecurrencyCont flex flex-wrap w-screen py-4 '>
        <div className='w-1/2 py-2 px-2'>
            <h1 className='text-fade font-light font-poppins'>Total Cryptocurrencies</h1>
            <p className='text-2xl font-medium font-poppins'>{millify(globalStats.total)}</p>
        </div>
        <div className='w-1/2 py-2'>
            <h1 className='text-fade font-light font-poppins'>Total Market Cap</h1>
            <p className='text-2xl font-medium font-poppins'>{millify(globalStats.totalMarketCap)}</p>
        </div>
        <div className='w-1/2 py-2'>
            <h1 className='text-fade font-light font-poppins'>Total Market</h1>
            <p className='text-2xl font-medium font-poppins'>{millify(globalStats.totalMarkets)}</p>
        </div>
        <div className='w-1/2 py-2'>
            <h1 className='text-fade font-light font-poppins'>Total Exchanges</h1>
            <p className='text-2xl font-medium font-poppins'>{millify(globalStats.totalExchanges)}</p>
        </div>
        <div className='w-1/2 py-2'>
            <h1 className='text-fade font-light font-poppins'>Total 24h volume</h1>
            <p className='text-2xl font-medium font-poppins'>{millify(globalStats.total24hVolume)}</p> 
        </div>
    </div>
    
    <div className='flex justify-between py-2'>
        <h1 className='font-poppins text-base bigtablet:text-2xl font-bold'>Top 10 Cryptocurrencies in the world</h1>
        <Link to="/cryptocurrencies" className='font-poppins text-base bigtablet:text-xl font-bold text-text'>Show More</Link>
    </div>
    <div className='w-full mb-4'>
   <HomeCrypto/>
   </div>
    <div  className='flex justify-between py-2'>
        <h1 className='font-poppins text-2xl font-bold'>Latest Crypto News</h1>
        <Link to="/news" className='font-poppins text-xl font-bold text-text'>Show More</Link>
    </div>
    <HomeCryptoNews/>
    </>
}
    </div>

  )
}

export default Home;