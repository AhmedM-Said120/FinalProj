import { createContext, useState } from "react";

export let countContext = createContext()


export default function CountContextProvider(props) {

    const [cont, setCount] = useState('s0')

    return <countContext.Provider value={{ cont, setCount }}>

        {props.children}

    </countContext.Provider>
}