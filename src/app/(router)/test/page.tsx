'use client'

import React, {useState} from 'react';
import { Controller, useForm } from "react-hook-form";
import { searchAddressToCoords } from "@/src/app/func/common/geo.utills";

interface FormData {
    address: string;
}

const TestPage = () => {
    const [address, setAddress] = useState("");
    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            address: "",
        }
    });

    const onSubmit = handleSubmit((data: FormData) => {
        searchAddressToCoords(data.address).then((result) => {
            if(result?.fullAddress) {
            setAddress(result?.fullAddress);
            }else {
                setAddress('위치정보를 찾을 수 없습니다')
            }
        });
    });

    return (
        <form onSubmit={onSubmit}>
            <Controller
                name="address"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        autoFocus
                        className="w-full text-black"
                        placeholder="주소를 입력하세요"
                    />
                )}
            />
            <button type="submit">검색</button>
            {
                address
            }
        </form>
    );
}

export default TestPage;