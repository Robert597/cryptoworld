import React, {useState} from 'react';
import millify from "millify";
import {Link} from "react-router-dom";
import {useGetCryptosQuery}  from "./services/cryptoApi";

const HomeCrypto = () => {
    const count = 10;
    const {data, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(data?.data?.coins);
    if(isFetching) return 'Loading ...';
  
  return (
    <div className = "grid gap-4 grid-cols-1 midtablet:grid-cols-2 laptop:grid-cols-3 w-full py-2 midtablet:py-4">
      {
          cryptos?.map((crypto) => (
            <Link to = {`/cryptocurrencies/${crypto.rank}`}  key={crypto.rank}>
              <div className="cardContainer bg-white px-4 py-2 h-60 hover:shadow-xl">
                  <div className='cardTop h-1/4 border-b-solid border-b border-fade flex justify-between items-center'>
                      <p className="font-poppins font-bold">{`${crypto.rank}. ${crypto.name}`}</p>
                      <div className='logoContainer w-8 h-8'>
                          <img src={crypto.iconUrl} alt="icon" className="w-full h-full"/>
                      </div>
                  </div>
                  <div className='cardBody py-4'>
                      <p className='font-poppins mb-2'>Price: {millify(crypto.price)}</p>
                      <p  className='font-poppins mb-2'>Market Cap: {millify(crypto.marketCap)}</p>
                      <p  className='font-poppins mb-2'>Daily Change: {millify(crypto.change)}</p>
                  </div>
              </div>
              </Link>
          ))
      }

    </div>
  )
}

export default HomeCrypto;