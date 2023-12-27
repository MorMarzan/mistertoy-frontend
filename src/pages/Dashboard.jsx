import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { loadToys } from '../store/actions/toy.actions'
import { showErrorMsg } from '../services/event-bus.service'
import { ProfitChart } from '../cmps/ProfitsChart'
import { LabelsChart } from '../cmps/LabelsChart'


export function Dashboard() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [chartToDisplay, setChartToDisplay] = useState(0)


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
        { label: '', data: [] }
    ]

    function handleChange({ target }) {
        let value = +target.value
        setChartToDisplay(value)
    }

    return (
        <section className='dashboard'>
            <label htmlFor="chart">Choose a chart:</label>
            <select name="chart" id="chart" onChange={handleChange} value={chartToDisplay}>
                <option value={0}>Avarge price per label</option>
                <option value={1}>Number of toys per label</option>
                <option value={2}>In stock percentage per label</option>
                <option value={3}>Income per month</option>
            </select>

            {(chartToDisplay !== 3) &&
                <LabelsChart chartInfo={chartInfo[chartToDisplay]} toyLabels={toyLabels} />
            }
            {(chartToDisplay === 3) &&
                <ProfitChart />
            }
        </section>
    )
}