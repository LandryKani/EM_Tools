import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Sector, Cell } from 'recharts';

function GetChart() {
    const data = [
        { name: "Mon", views: 950 },
        { name: "Tue", views: 750 },
        { name: "Wed", views: 300 },
        { name: "Thu", views: 650 },
        { name: "Fri", views: 800 },
        { name: "Sat", views: 250 },
        { name: "Sun", views: 630 }
    ];

    const COLORS = ['#316efa', '#00C49F', '#e80707', '#FF8042', '#6674bb', '#ffdd00', '#414040'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <div>
            <div className='Bloc_barChart'>
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{
                        top: 1,
                        right: 1,
                        left: 1,
                        bottom: 1,
                    }}
                    barSize={5}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis dataKey="views" />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="5" />
                    <Bar dataKey="views" fill="#6674BB" background={{ fill: '#fff' }} />
                </BarChart>
            </div>
            <div className='Bloc_pieChart display-flex-center'>
                <PieChart width={300} height={300} className='display-flex-center'>
                    <Pie
                        dataKey="views"
                        isAnimationActive={false}
                        data={data}
                        cx="400px"
                        cy="400px"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    )
}
export default GetChart