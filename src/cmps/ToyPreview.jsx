
import dollPng from '../assets/img/bear.png'
import { utilService } from '../services/util.service'

export function ToyPreview({ toy }) {
    const dynClass = !toy.inStock ? 'out-of-stock' : ''

    const imgNames = ["train_lk4zzl", "puzzle-box_hw7q1t", "rubber-duck_gao8pi"]
    const { name, price, inStock } = toy

    return (
        <article className={dynClass + " toy-preview"} >
            <h3>{utilService.capitalizeFirstLetter(name)}</h3>
            <h4>{price}$</h4>
            <h4>{inStock ? 'Avialable' : 'Out of stock'}</h4>
            {/* <img src={dollPng} /> */}
            <img src={`https://res.cloudinary.com/daydgnssy/image/upload/v1704110027/${imgNames[utilService.getRandomIntInclusive(0, imgNames.length - 1)]}.png`} />

        </article>
    )
}

