import React, { useRef } from 'react'
import ReactApexChart from 'react-apexcharts'

export const Line = ({ blur, users }) => {

    const usersName = users?.map((u) => u.name);
    const productsList = users?.map((u) => u.userProductList === undefined ? 0 : u.userProductList.length);

    const info = useRef({
        series: [{
            name: "מוצרים",
            data: productsList,
            color: "#F97B22",
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'מוצרים מושאלים ללקוחות',
                align: 'center'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: usersName,
            }
        },
    })




    return (
        <div className={`${blur && "blur-sm"} p-6 w-full mr-5 mt-10 shadow-md shadow-black/10 md:w-full`}>
            <ReactApexChart
                options={info.current.options}
                series={info.current.series}
                type="line" height={350} />
        </div >
    )
}
