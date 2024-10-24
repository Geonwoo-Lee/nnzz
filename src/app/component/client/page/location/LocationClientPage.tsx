'use client'

import {Controller, useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";

import Input from "../../common/input/Input"
import Button from "../../common/button/Button";

import Location from '../../../../../../public/svg/items/common/Location.svg'
import Search from '../../../../../../public/svg/items/common/Search.svg'
import {searchAddressByKeyword} from "@/src/app/func/common/geo.utils";
import {locationSearch, Place} from "@/src/app/types/page/location/location";
import {useFunnel} from "@/src/app/hooks/useFunnel";
import LocationComponent from "@/src/app/component/client/page/location/features/LocationComponent";
import useLocationBasedNavigation from "@/src/app/hooks/useLocationBasedNavigation";
import {MapPlace} from "@/src/app/component/client/common/map/NaverMap";
import {useRouter} from "next/navigation";

const LocationClientPage = () => {
    const router = useRouter()
    const {control, handleSubmit} = useForm<locationSearch>({
        defaultValues: {
            address: "",
        }
    });
    const handleLocationRequest = useLocationBasedNavigation();
    const [searchList, setSearchList] = useState<Place[]>([]);
    const [Funnel, setFunnel] = useFunnel(['tip', 'current', 'list', 'notFound'], "tip");

    const onSubmit = handleSubmit((data:locationSearch) => {
        searchAddressByKeyword(data.address).then((results) => {
            if (results.length > 0) {
                const newPlaces = results.map(result => ({
                    name: result.name,
                    address: result.address,
                    roadAddress: result.roadAddress,
                    latitude: result.latitude,
                    longitude: result.longitude
                }));
                setSearchList(() => [ ...newPlaces]);
            } else {
                setFunnel('notFound')
            }
        });
    });

    const setLocation = (place: Place) => {
        const pinnedLocation: MapPlace = {
            name: place.name,
            lat: place.latitude,
            lng: place.longitude
        }
        window.localStorage.setItem('pinedLocation', JSON.stringify(pinnedLocation));
        router.push('/home')
    }

    useEffect(() => {
        if(searchList.length > 0) {
            setFunnel('list')
        }else {
            const getLocation = JSON.parse(window.localStorage.getItem('currentLocation') || '[]');
            if(getLocation.length > 0) {
                setFunnel('current')
            }else {
                setFunnel('tip')
            }
        }
    }, [searchList]);


    return <div className='  overflow-y-scroll h-basic-body-with-header'>
        <div className='flex flex-col  py-6'>
            <div className='flex flex-col gap-7 px-4 pb-6 sticky top-0 bg-common-white'>
                <div className='whitespace-pre-wrap text-title1 font-bold text-text-1-'>
                    현재 계신 곳의 위치를<br/>
                    검색해주세요
                </div>
                <Controller
                    name="address"
                    control={control}
                    render={({field}) => (
                        <Input
                            {...field}
                            autoFocus
                            style="w-full"
                            placeHolder="도로명으로 검색"
                            left={<Search/>}
                            onSubmit={onSubmit}
                        />
                    )}
                />
                <Button type='outlined' size='lg' style='w-full' onClick={handleLocationRequest}>
                    <div className='flex flex-row gap-1'>
                        <Location/>
                        현재 위치로 찾기
                    </div>
                </Button>
            </div>
                <Funnel>
                    <Funnel.Step name='tip'>
                        <LocationComponent.SearchTip/>
                    </Funnel.Step>
                    <Funnel.Step name='current'>
                        <LocationComponent.CurrentLocation />
                    </Funnel.Step>
                    <Funnel.Step name='list'>
                        <LocationComponent.SearchList setLocation={setLocation} places={searchList} />
                    </Funnel.Step>
                    <Funnel.Step name='notFound'>
                        <LocationComponent.NoSearch />
                    </Funnel.Step>
                </Funnel>
        </div>
    </div>
}

export default LocationClientPage