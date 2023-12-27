// import { ToyPreview } from "./ToyPreview.jsx";
// const { Link } = ReactRouterDOM

import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onRemoveToy }) {

    const ulProps = {
        className: "toy-list",
        title: 'toy'
    }


    if (!toys) return <div>Loading...</div>
    if (!toys.length) return <h3>No toy match the filter</h3>

    return (
        <ul {...ulProps} >
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section className="tools">
                        <button className="btn" onClick={() => onRemoveToy(toy._id)}>X</button>
                        <Link className="btn" to={`/toy/${toy._id}`}>Details</Link>
                        <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link>
                    </section>
                </li>
            )}
        </ul>
    )
}