import { Link } from "react-router-dom";
// import { ToyPreview } from "./ToyPreview";

// export function MsgList({ msgs, onRemoveMsg }) {
export function MsgList({ msgs, onRemoveMsg, user }) {

    if (!msgs || !msgs.length) return <p>No msgs yet, be the first one to write!</p>

    // console.log('user', user)
    // console.log('msgs', msgs)
    return (
        <ul className="msg-list" >
            {msgs.map(msg =>
                <li key={msg.id}>
                    {msg.txt + ' '}
                    <span>by: {msg.by.fullname}</span>
                    <section className="tools">
                        {user && (user.isAdmin || user._id === msg.by._id) &&
                            <>
                                {/* <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link> */}
                                <button className="btn" onClick={() => onRemoveMsg(msg.id)}>X</button>
                            </>
                        }
                    </section>
                </li>
            )}
        </ul>
    )
}
