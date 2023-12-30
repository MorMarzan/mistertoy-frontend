// import { ToyPreview } from "./ToyPreview.jsx";
// const { Link } = ReactRouterDOM

import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onRemoveToy, user }) {

    if (!toys) return <div>Loading...</div>
    if (!toys.length) return <h3>No toy match the filter</h3>

    return (
        <ul className="toy-list" >
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section className="tools">
                        <Link className="btn" to={`/toy/${toy._id}`}>Details</Link>
                        {user && user.isAdmin &&
                            <>
                                <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link>
                                <button className="btn" onClick={() => onRemoveToy(toy._id)}>X</button>
                            </>
                        }
                    </section>
                </li>
            )}
        </ul>
    )
}