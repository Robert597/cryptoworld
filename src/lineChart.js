import React from 'react';
import {Line} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import moment from 'moment';

const Linechart = ({coinHistory, currentPrice, coinName}) => {
  const coinPrice = [];
  const coinTimeStamp = [];
  
  for(let i = 0; i < coinHistory?.data?.data?.history.length; i++){
    coinPrice.push(coinHistory?.data?.data?.history[i].price);
    coinTimeStamp.push(new Date(coinHistory?.data?.data?.history[i].timestamp).toLocaleDateString());
  }
 console.log(new Date(1645527535000).toLocaleDateString())
 
  const data = {
    labels: coinTimeStamp,
    datasets: [
      {label: 'price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
    }
    ]
  }
  const options = {
    scales: {
      y: {
        beginAtZero: false
    },
    x: {
     reverse: true
      }
    }
  }
  return (
    <>
    <div className='flex justify-between items-center py-4'>
    <h1 className=' text-sm bigtablet:text-xl font-poppins font-bold text-text'>{coinName} Price Chart</h1>
    <div className='flex flex-col min-tablet:flex-row justify-between items-center'>
      <h1 className='mr-2 font-bold text-sm font-poppins text-black'>
        {coinHistory?.data?.data?.change}%
      </h1>
      <h1  className='font-bold text-sm font-poppins text-black'>
       current {coinName} price: ${currentPrice}%
      </h1>
    </div>
    
    </div>
    <div className="">
    <Line data={data} options={options} className=""/>
    </div>
    </>
  )
}

export default Linechart