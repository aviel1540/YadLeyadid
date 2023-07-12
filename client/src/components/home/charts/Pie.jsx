import React, { useRef } from 'react'
import ReactApexChart from "react-apexcharts";
import { ProductPlace } from '~/constants/productPlace';
export const Pie = ({ product, blur }) => {

    const info = useRef({
        series: [product?.repair, product?.loaned, product?.inStock],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: [ProductPlace.REPAIR, ProductPlace.LOANED, ProductPlace.IN_STOCK],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },

    })


    return (
        <div className={`${blur && "blur-sm"} p-6 w-full mr-5 mt-10 shadow-md shadow-black/10 md:w-full`}>
            <ReactApexChart
                options={info.current.options}
                series={info.current.series}
                type="pie"
                height={300}
            />
        </div>
    )
}
