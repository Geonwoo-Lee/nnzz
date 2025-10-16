import {ReactNode} from "react";


export interface FoodieWayProps {
    type: 'fast' | 'slow'
    onChangeWay: () => void
}

export interface FoodieWayType {
    title: string
    description: string
    icon: ReactNode
}

export interface FoodieWayConfigType {
    fast: FoodieWayType,
    slow: FoodieWayType
}