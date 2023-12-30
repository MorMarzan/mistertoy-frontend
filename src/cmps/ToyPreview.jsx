
import dollPng from '../assets/img/bear.png'
import { utilService } from '../services/util.service'

export function ToyPreview({ toy }) {
    const dynClass = !toy.inStock ? 'out-of-stock' : ''

    const { name, price, inStock } = toy

    return (
        <article className={dynClass + " toy-preview"} >
            <h3>{utilService.capitalizeFirstLetter(name)}</h3>
            <h4>{price}$</h4>
            <h4>{inStock ? 'Avialable' : 'Out of stock'}</h4>
            <img src={dollPng} />

        </article>
    )
}