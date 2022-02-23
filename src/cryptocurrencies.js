import React, {useState, useEffect} from 'react';
import millify from "millify";
import {Link} from "react-router-dom";
import {useGetCryptosQuery}  from "./services/cryptoApi";


const Cryptocurrencies = () => {
 const count = 100;
   const {data, isFetching} = useGetCryptosQuery(count);
   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('Check your internet connection or reload page.')
    const [cryptoss, setCryptos] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredCrypto, setFilteredCrypto] = useState([]);
  useEffect(() => {
    if(!isFetching){
      setCryptos(data?.data?.coins);
      setFilteredCrypto(data?.data?.coins);
    }
  }, [isFetching, data?.data?.coins])
    const handleChange =  (e) => {
      setSearchValue(e.target.value);
      const regex = new RegExp(e.target.value, "i", "g");
      if(!isFetching){
        const returnedPost = cryptoss.filter((post) => {
          if((post.name).match(regex)){
            return post;
          }else{
              return;
          }
  })
  setFilteredCrypto(returnedPost);
 }
}
if(!isFetching && !data){
  setError(true);
}

    
  return (
    <div className='relative'>
        {isFetching && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        {!isFetching && error && <div className=' font-poppins text-red-600 text-lg'>{errorMessage}</div>}
        {!isFetching && !error && <>
    <div className='w-full fixed top-20 flex justify-center bigtablet:justify-end bg-text  p-4'>
      <input type="text" placeholder="Search CryptoCurrency" onFocus={() => {
                        document.querySelector('.main').scrollTo(0, 0);
                    }} value={searchValue} onChange={(e) => handleChange(e)} className=" py-1 px-4 focus:outline-none placeholder:text-fade font-base font-poppins rounded focus:border-2 focus:border-text shadow"/>
    </div>
    <div className = "grid gap-4 grid-cols-1 midtablet:grid-cols-2 laptop:grid-cols-3 w-full p-4 mt-24">
    <p className='text-base text-fade font-poppins capitalize '>click on any coin for more details...</p>
      {
          filteredCrypto?.map((crypto) => (
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
    </>}
    </div>
  )
}

export default Cryptocurrencies;