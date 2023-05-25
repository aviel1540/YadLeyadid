import React, { useRef } from 'react'
import ReactApexChart from "react-apexcharts";

export const Pie = ({ users }) => {

    const usersName = users?.map((u) => u.name);
    const productsList = users?.map((u) => u.userProductList === undefined ? 0 : u.userProductList.length);

    const info = useRef({
        series: productsList,
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: usersName,
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
        <div className='p-6 w-full mr-5 mt-10 shadow-md shadow-black/10 md:w-full'>
            <ReactApexChart
                options={info.current.options}
                series={info.current.series}
                type="pie"
                height={300}
            />
        </div>
    )
}
