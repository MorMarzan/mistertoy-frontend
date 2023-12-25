

export function ToyPreview({ toy }) {

    const dynClass = !toy.inStock ? 'out-of-stock' : ''

    const { name, price, inStock } = toy

    return (
        <article className={dynClass + " toy-preview"} >
            <h3>{name}</h3>
            <h4>{price}$</h4>
            <h4>{inStock ? 'Avialable' : 'Out of stock'}</h4>
        </article>
    )
}