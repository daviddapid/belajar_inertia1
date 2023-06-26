import { Link } from "@inertiajs/react";

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="row h-100">
                <div className="col-lg-3" >
                    <div className="card h-100 p-5" style={{ borderRadius: 0 }}>
                        <Link className="btn">Posts</Link>
                        <Link className="btn">Profile</Link>
                        <Link className="btn" href="/logout">Logout</Link>
                    </div>
                </div>
                <div className="col-lg-9">{children}</div>
            </div>
        </>
    )
}