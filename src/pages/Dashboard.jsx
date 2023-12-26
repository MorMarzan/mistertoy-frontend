import { useSelector } from 'react-redux'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { toyService } from "../services/toy.service"
import { loadToys, setFilterBy } from '../store/actions/toy.actions'
import { showErrorMsg } from '../services/event-bus.service'
import { useEffect } from 'react'
import { ProfitChart } from '../cmps/ProfitsChart'
import { LabelsChart } from '../cmps/LabelsChart'

ChartJS.register(ArcElement, Tooltip, Legend)

export function Dashboard() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
            .catch(() => { showErrorMsg('Cannot show toys') })
    }, [])

    const toysByLabelMap = toys.reduce((acc, toy) => {
        toy.labels.forEach((label) => {
            if (!acc[label]) {
                acc[label] = []
            }
            acc[label].push(toy)
        })
        return acc
    }, {})
    // console.log('toysByLabelMap', toysByLabelMap)

    const toyLabels = Object.keys(toysByLabelMap)

    const toyPerLabelCount = toyLabels.map((label) => toysByLabelMap[label].length)

    const pricePerLabelAvgs = toyLabels.map((label) => {
        const sameLabelToys = toysByLabelMap[label] || []
        const totalPrice = sameLabelToys.reduce((sum, toy) => sum + toy.price, 0)
        const avgPrice = totalPrice / sameLabelToys.length || 0 // Avoid division by zero
        return avgPrice
    })

    const inStockPerLabelPercs = toyLabels.map((label) => {
        const sameLabelToys = toysByLabelMap[label] || []
        const inStockCount = sameLabelToys.reduce((sum, toy) => {
            return (toy.inStock) ? ++sum : sum
        }, 0)
        const inStockPerc = (inStockCount / sameLabelToys.length) * 100 || 0
        return inStockPerc
        // return { label, inStockPerc }
    })

    const chartInfo = [
        { label: 'Avg price', data: pricePerLabelAvgs },
        { label: 'Num of toys', data: toyPerLabelCount },
        { label: 'In stock percent', data: inStockPerLabelPercs },
    ]

    return (
        <>
            {/* <label htmlFor="chart">Choose a chart:</label>
            <select name="chart" id="chart" onChange={handleChange} >
                <option value="">All</option>
            </select> */}

            {/* <LabelsChart chartInfo={chartInfo[0]} toyLabels={toyLabels} /> */}
            <ProfitChart />
        </>
    )
}