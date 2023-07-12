import React, { useRef } from 'react'
import ReactApexChart from 'react-apexcharts'

export const Columns = ({ blur, users }) => {

    const usersName = users?.map((u) => u.name);
    const productsList = users?.map((u) => u.userProductList === undefined ? 0 : u.userProductList.length);


    const info = useRef({
        series: [
            {
                name: "מוצרים",
                data: productsList,
                color: "#068DA9",
            },
        ],

        options: {
            chart: {
                type: "bar",
                height: 350,
                redrawOnWindowResize: true,
            },

            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "5%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            title: {
                text: 'מוצרים מושאלים ללקוחות',
                align: 'center',
                style: {
                    fontSize: "16px",
                    fontWeight: "bold",
                },
            },
            xaxis: {
                categories: usersName,

            },

            fill: {
                opacity: 1,
            },
        },
    })

    return (
        <div className={`${blur && "blur-sm"} p-6 w-full mr-5 mt-10 shadow-md shadow-black/10 md:w-full`}>
            <ReactApexChart
                options={info.current.options}
                series={info.current.series}
                type="bar"
                height={350}
            />
        </div >
    )
}
