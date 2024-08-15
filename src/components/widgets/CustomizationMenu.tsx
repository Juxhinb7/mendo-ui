import { lazy } from "react";
import LazyComponent from "../lazy/LazyComponent";
import RectSkeleton from "./RectSkeleton";

const BGCover = lazy(() => import("./BGCover"));

const CustomizationMenu = (props: any): JSX.Element => {
    
    return (
        <div className="text-sm text-gray-600">
            <p>Pick a background color</p>
            <div className="flex space-x-2 mt-2">
                <div onClick={() => props.setBackground("bg-red-200")} className="bg-red-200 w-8 h-8 rounded-md cursor-pointer border-2 border-cyan-500"/>
                <div onClick={() => props.setBackground("bg-gray-200")} className="bg-gray-200 w-8 h-8 rounded-md cursor-pointer border-2 border-cyan-500"/>
                <div onClick={() => props.setBackground("bg-white")} className="bg-white w-8 h-8 rounded-md cursor-pointer border-2 border-cyan-500"/>
                <div onClick={() => props.setBackground("bg-orange-200")} className="bg-orange-200 w-8 h-8 rounded-md cursor-pointer border-2 border-cyan-500"/>
                <div onClick={() => props.setBackground("bg-indigo-200")} className="bg-indigo-200 w-8 h-8 rounded-md cursor-pointer border-2 border-cyan-500"/>
                <div onClick={() => props.setBackground("bg-green-200")} className="bg-green-200 w-8 h-8 rounded-md cursor-pointer border-2 border-cyan-500"/>
            </div>
            <p className="mt-4">Pick a background image</p>
            <div className="flex space-x-2 mt-2">
                <div onClick={() => props.setBackground("bg-cover bg-[url('assets/pexels-fox-1172675.jpg')]")}>
                <LazyComponent fallback={<RectSkeleton />} element={<BGCover url={"assets/pexels-fox-1172675.jpg"}/>} />
                </div>
                <div onClick={() => props.setBackground("bg-cover bg-[url('assets/navagio.jpg')]")}>
                    <LazyComponent fallback={<RectSkeleton />} element={<BGCover url={"assets/navagio.jpg"}/>} />
                </div>
                <div onClick={() => props.setBackground("bg-cover bg-[url('assets/maldives.webp')]")}>
                    <LazyComponent fallback={<RectSkeleton />} element={<BGCover url={"assets/maldives.webp"}/>} />
                </div>
            </div>
        </div>
    )
}

export default CustomizationMenu;