import {Routes, Route,  useLocation} from "react-router-dom";
import Navbar from "./navbar.js";
import Home from "./Home";
import News from "./news.js";
import Cryptocurrencies from "./cryptocurrencies.js";
import CoinDetails from "./coinDetails.js";
import Mobile from "./mobileBar.js";
import Mobilemenu from "./Mobilemenu.js";
import Main from "./main.js";
import { useEffect, useState } from "react";


function App() {
 let location = useLocation();
 const [match, setMatch] = useState(false);
  useEffect(() => {
    if(location.pathname === "/"){
      setMatch(true);
    }else{
      setMatch(false);
    }
  }, [location.pathname]);
  
  return (
    <div className= "App relative w-screen bg-body min-h-screen bigtablet:h-screen bigtablet:flex">
    <Routes>
    <Route exact path = "/" element={ <Main/> }></Route>
    </Routes>

      <div className={match ? "hidden" : `header w-1/4 hidden bigtablet:block`}>
      <Navbar/>
      </div>
      <div className={ match ? "hidden" : "mobileheader max-w-screen block bigtablet:hidden sticky top-0 z-50"}>
      <Mobile/>
      </div>
      <div className={match ? "hidden" : "bg-nav hide fixed bigtablet:hidden z-30"} id="mobile">
      <Mobilemenu/>
      </div>
     
      <div className={match ? "hidden" : "w-screen bigtablet:w-3/4 flex flex-col bigtablet:overflow-y-scroll"}>
      <div className="main min-h-screen  w-full overflow-x-hidden ">
      <Routes>
        <Route exact path = "/home" element={ <Home/> }></Route>
        <Route exact path = "/news" element={ <News/> }></Route>
        <Route exact path = "/cryptocurrencies" element={ <Cryptocurrencies/> }></Route>
        <Route exact path = "/cryptocurrencies/:id" element={ <CoinDetails/> }></Route>
        </Routes>
      </div>
      <div className="footer bg-nav py-4 flex justify-center">
        <div className="footerContent">
          <p className="text-center text-white font-poppins text-sm bigtablet:text-base">Cryptoworld &copy;Robert Oluwaseun Jonathan, All Rights Reserved.</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
