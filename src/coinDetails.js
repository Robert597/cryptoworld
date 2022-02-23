import React from "react";
import {useState, useEffect} from 'react';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { useGetCryptosQuery } from './services/cryptoApi';
import axios from "axios";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Linechart from "./lineChart";
const CoinDetails = () => {
    const { id } = useParams();
    const[timePeriod, setTimePeriod] = useState('7d');
    
  const [cryptoDetails, setCryptoDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [maincoin, setMainCoin] = useState([]);
  const [coinHistory, setCoinHistory] = useState([]);
  const[lineLoading, setIsLineLoading] = useState(true);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Check your internet connection or reload page.');
  const [timestamp, setTimeStamp] = useState()
 
  useEffect(() => {
    const setUUID = async () => {
      const options1 = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
          limit: '100',
        },
        headers: {
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_CRYPTO_API_KEY
        }
      }
     
        try{
            setIsLoading(true);
           const response1 = await axios.request(options1);
          const coins = response1.data;
               const selectedIcon =  await coins?.data?.coins.filter((coin) => {
                    if(coin.rank === parseInt(id)) {
                       return coin;
                          }
                    });
                    setMainCoin(selectedIcon);
                    const options = {
                        method: 'GET',
                        url: `https://coinranking1.p.rapidapi.com/coin/${selectedIcon[0].uuid}`,
                        params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h'},
                        headers: {
                          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                          'x-rapidapi-key': process.env.REACT_APP_CRYPTO_API_KEY
                        }
                      };
                      const response = await axios.request(options);
                      setCryptoDetails(response.data.data.coin);
                      setError(false);
                }
           
        catch(err){
          setError(true);
          setErrorMessage(err.message);
        }finally{
            setIsLoading(false);
        }
     
    }
  setUUID()
  }, []);
  
  useEffect(() => {
    const getCoinHistory = async () => {
      try{
        setIsLineLoading(true);
        const options3 = {
          method: 'GET',
          url: `https://coinranking1.p.rapidapi.com/coin/${maincoin[0].uuid}/history`,
          params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: `${timePeriod}`},
          headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': 'de083142b9mshcc371426a94e1c5p15a326jsnf32378236d15'
          }
        };
       
  
        const response = await axios.request(options3);
        setCoinHistory(response);
     }catch(err){
        console.log(err.message);
      }finally{
        setIsLineLoading(false);
      }
    }
    getCoinHistory();
   }, [timePeriod, maincoin])
   
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ]; 
  const time = ['24h', ''];
  return (
     <div className=" px-4 bigtablet:px-12 py-4 bigtablet:py-8">
          {isLoading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        {!isLoading && error && <p>{errorMessage}</p>}
        {!isLoading && !error && <>
         <div>
             <div className='detailsTitle py-2 bigtablet:py-8 border-b border-fade'>
                <h1 className="font-poppins text-center text-lg bigtablet:text-2xl text-text font-bold mb-2">{`${cryptoDetails.name}(${cryptoDetails.symbol}) price`}</h1>
                <p className="text-fade font-poppins text-center text-base"> {cryptoDetails.name} live price in US dollars. View value statistics, market cap and supply</p>
             </div>
             <div className='selectField pt-4 flex flex-col'>
                 <select defaultValue="7d"
                className=" py-1 px-4 focus:outline-none placeholder:text-fade font-base font-poppins rounded focus:border-2 focus:border-text shadow w-60 mx-auto bigtablet:mx-0"
                 placeholder="select time period"
                 onChange={(e) => setTimePeriod(e.target.value)}>
                   {time.map((date) => (
                        <option value={date}>{date}</option>
                   ))}
                 </select>
                 {lineLoading ? <p className="font-poppins text-base text-green-600">Loading...</p> :     <Linechart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>}
             <p className="font-poppins text-base text-fade py-2 text-center tablet:text-left ">Note: Working on the chart timestamp</p>
             </div>
             <div className="flex flex-col py-4 laptop:flex-row laptop:justify-between laptop:py-4">
               <div className="mb-4">
             <div >
               <h1 className="font-bold text-black font-poppins text-2xl mb-2 text-center">{cryptoDetails.name} Value statistics</h1>
               <p  className=" text-black font-poppins text-base text-center">An overview showing the stats of {cryptoDetails.name}</p>
             </div>
            {stats.map(({icon, title, value}) => (
              <div className="flex items-center justify-between py-4 border-b border-fade last:border-b-0">
                <div className="flex items-center">
                  <p className="mr-2 text-base">{icon}</p>
                  <p className="font-poppins text-base">{title}</p>
                </div>
                <p className="font-poppins text-base font-bold">{value}</p>
              </div>
            ))} 
            </div>
            <div>
              <div>
               <h1 className="font-bold text-black font-poppins text-2xl mb-2 text-center">Other statistics</h1>
               <p  className=" text-black font-poppins text-base text-center">An overview showing the stats of all cryptocurrencies</p>
             </div>
            {genericStats.map(({icon, title, value}) => (
              <div className="flex items-center justify-between py-4 border-b border-fade last:border-b-0">
                <div  className="flex items-center">
                  <p className="mr-2 text-base">{icon}</p>
                  <p className="font-poppins text-base">{title}</p>
                </div>
                <p className="font-poppins text-base font-bold">{value}</p>
              </div>
            ))} 
            </div>
            </div>
            <div className="flex flex-col bigtablet:flex-row bigtablet:justify-between  bigtablet:px-8">
            
            <div className=" w-full bigtablet:w-1/2 parser">
              <h1 className="text-text mb-2 text-2xl font-poppins">What is {cryptoDetails.name}</h1>
              {HTMLReactParser(cryptoDetails.description)}
            </div>
            <div className="py-4 w-full bigtablet:w-1/2 bigtablet:px-8 bigtablet:py-8">
              <h1 className="text-2xl font-poppins font-bold text-center bigtablet:text-left">{cryptoDetails.name} Links.</h1>
              {cryptoDetails.links.map((link) => (
                <div className="flex items-center justify-between py-4 border-b border-fade">
                <h1 className="font-poppins text-base text-black">{link.type}</h1>
                <a href={link.url} target="_blank" rel='noreferrer'  className="font-poppins text-base text-text">
                  {link.name}
                </a>
                </div>
              ))}
            </div>
            </div>
        </div>
        </> }
     </div>
  )
}

export default CoinDetails;
/*  <Linechart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
 useEffect(() => {
      const getCoinHistory = async () => {
        const options3 = {
          method: 'GET',
          url: `https://coinranking1.p.rapidapi.com/coin/${maincoin[0].uuid}/history`,
          params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: {timePeriod}},
          headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': 'de083142b9mshcc371426a94e1c5p15a326jsnf32378236d15'
          }
        };
        const response = await axios.request(options3);
        console.log(response)
      }
      getCoinHistory();
     }, [timePeriod])
      const [maincoin, setMainCoin] = useState([]);
  const [coinHistory, setCoinHistory] = useState([]);
*/