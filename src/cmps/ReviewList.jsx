import { Link } from "react-router-dom";

export function ReviewList({ reviews, user, onRemoveReview }) {

    if (!reviews || !reviews.length) return <p>No reviews yet, be the first one to write!</p>

    return (
        <ul className="review-list clean-list" >
            {reviews.map(review =>
                <li key={review._id}>
                    {review.txt + ' '}
                    <span>by: {review.user.username}</span>
                    <section className="tools">
                        {user && (user.isAdmin || user._id === review.user._id) &&
                            <>
                                {/* <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link> */}
                                <button className="btn" onClick={() => onRemoveReview(review._id)}>X</button>
                            </>
                        }
                    </section>
                </li>
            )}
        </ul>
    )
}
