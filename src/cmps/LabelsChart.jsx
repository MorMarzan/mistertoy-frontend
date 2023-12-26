import { useSelector } from 'react-redux'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { toyService } from "../services/toy.service"
import { loadToys, setFilterBy } from '../store/actions/toy.actions'
import { showErrorMsg } from '../services/event-bus.service'
import { useEffect } from 'react'
import { ProfitChart } from './ProfitsChart'

ChartJS.register(ArcElement, Tooltip, Legend)

export function LabelsChart({ chartInfo, toyLabels }) {

    const data = {
        labels: toyLabels,
        datasets: [
            {
                label: chartInfo.label,
                data: chartInfo.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <>
            <h2>{chartInfo.label + ' per label'}</h2>
            <Doughnut data={data} />
        </>
    )
}