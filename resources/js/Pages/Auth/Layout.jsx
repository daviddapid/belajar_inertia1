import { Link } from "@inertiajs/react";


export default function AuthLayout({ children }) {
    return (
        <>
            <Link href="/" style={{ textDecoration: 'none' }} className="text-primary fs-5"><i className="bi bi-arrow-left me-2"></i>Back To Home</Link>

            <div className="row h-100 w-100 justify-content-center align-items-center m-0">
                <div className="col-md-3 ">
                    {children}
                </div>

            </div>

        </>
    )
}