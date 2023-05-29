import React, { useRef } from 'react'
import ReactApexChart from 'react-apexcharts'

export const Line = ({ blur }) => {

    const info = useRef({
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
