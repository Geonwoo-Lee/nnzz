'use client'
import Deck from "@/src/app/component/client/deck/Deck";
import freeFoodData from "@/src/app/dummy/dummy";
import {useFunnel} from "@/src/app/hooks/useFunnel";
import {useEffect, useState} from "react";
import ButtonSellect from "@/src/app/(router)/swap/component/ButtonSellect";
import CompletePage from "@/src/app/(router)/swap/component/Comple";
import {useGeolocation} from "@/src/app/hooks/useGeoloaction";

// <Deck cards={freeFoodData}/>
const SwapPage = () => {
    const {  requestGeolocation } = useGeolocation();

    const [Funnel, setStep] = useFunnel(["0", "1", "2"], "0");
    const [selectedData, setSelectedData] = useState(freeFoodData)
    const selectData = (length: number) => {
        const shuffled = [...freeFoodData].sort(() => Math.random() - 0.5);
        setSelectedData(shuffled.slice(0, length));
    }
    useEffect(() => {
        requestGeolocation();
    }, []);
    return   <Funnel>
        <Funnel.Step name="0">
           <ButtonSellect selectData={selectData} setStep={setStep}/>
        </Funnel.Step>
        <Funnel.Step name="1">
            <Deck cards={selectedData} setStep={setStep}/>
        </Funnel.Step>
        <Funnel.Step name="2">
           <CompletePage/>
        </Funnel.Step>
    </Funnel>
}


export default SwapPage