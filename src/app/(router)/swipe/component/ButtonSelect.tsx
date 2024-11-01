import {Dispatch, SetStateAction} from "react";
import {LocationType} from "@/src/app/types/models/geo";


const ButtonSelect = ({selectData, setStep} : {selectData: (length: number) => void , setStep:  Dispatch<SetStateAction<"0" | "1" | "2">>}) => {
    const locationString = localStorage.getItem('userLocation');
    const location: LocationType | null = locationString ? JSON.parse(locationString) : null;

    return <div className="flex flex-col gap-3 h-[100vh] items-center justify-center">
        {location ? location.address : '위치 못찾았음'}
        <button className="w-full h-10 rounded-full bg-black text-white" onClick={() => {
            selectData(12)
            setStep('1')
        }}>
            12개
        </button>
        <button className="w-full h-10 rounded-full bg-black text-white"  onClick={() => {
            selectData(30)
            setStep('1')
        }}>
            30개
        </button>
        <button className="w-full h-10 rounded-full bg-black text-white"  onClick={() => {
            selectData(60)
            setStep('1')
        }}>
            60개
        </button>
        <button className="w-full h-10 rounded-full bg-black text-white"  onClick={() => {
            selectData(120)
            setStep('1')
        }}>
            120개
        </button>
    </div>
}

export default ButtonSelect