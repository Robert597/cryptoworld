import { createContext, useState } from "react";
const DataContext = createContext({});
export const DataProvider = ({children}) => {
    const[isHome, setIsHome] = useState(false);
    const count = isHome ? 10 : 50;
    return (
        <DataContext.Provider value={{isHome, setIsHome, count}}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;