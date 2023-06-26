import { Link, useForm } from "@inertiajs/react";
import AuthLayout from "./Layout";
import { useState } from "react";

function Register() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    })
    const [showPass, setShowPass] = useState(false)
    const handleClickShowPassword = () => setShowPass((show) => !show);
    const submit = (e) => {
        e.preventDefault()
        post('/register')
        console.log(errors);
    }

    return (
        <div className="card shadow">
            <div className="card-header">
                <h3 className="mb-0">Register</h3>
            </div>
            <div className="card-body mb-0">
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <span className="form-label">Username</span>
                        <input type="text" className="form-control" name="username" value={data.username} onChange={({ target }) => setData('username', target.value)} />
                        {errors.username ?? <p className="text-danger">{errors.username}</p>}
                    </div>
                    <div className="mb-3">
                        <span className="form-label">Password</span>
                        <input type="password" className="form-control" name="password" value={data.password} onChange={({ target }) => setData('password', target.value)} />
                        {errors.password ?? <p className="text-danger">{errors.password}</p>}
                    </div>
                    <button className="btn btn-primary w-100 mt-4 mb-0" type="submit" disabled={processing}>
                        {processing ?
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            :
                            'Register'
                        }
                    </button>
                </form>
            </div>
            <div className="card-footer">
                <p className="text-center my-0">Sudah Punya Akun? <Link href="/login">Login</Link></p>
            </div>
        </div>
    )
}

Register.layout = page => <AuthLayout children={page} />

export default Register;