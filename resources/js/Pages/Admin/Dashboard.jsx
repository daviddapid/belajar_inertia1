import { useState } from "react"
import AdminLayout from "./AdminLayout"
import ModalAddPost from "./components/ModalAddPost"
import ModalEditPost from "./components/ModalEditPost"
import ModalDeletePost from "./components/ModalDeletePost"

function Dashboard({ posts }) {
    const [currentData, setCurrentData] = useState({
        nama: '',
        kategori: '',
        image: ''
    })
    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h3>Your Post</h3>
                        <button className="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Nama</td>
                                    <td>Image</td>
                                    <td>Kategori</td>
                                    <td>Likes</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((p, index) =>
                                    <tr key={p.id}>
                                        <td>{index + 1}</td>
                                        <td>{p.nama}</td>
                                        <td style={{ width: '9px', whiteSpace: 'nowrap', }}><img style={{ width: '100px' }} src={'/storage/' + p.image} alt="" /></td>
                                        <td>{p.kategori}</td>
                                        <td>{p.like}</td>
                                        <td className="text-center" style={{ width: '9px', whiteSpace: 'nowrap' }}>
                                            <button className="btn btn-warning me-3" data-bs-toggle="modal" data-bs-target="#modal-edit" onClick={() => setCurrentData(p)}>Edit</button>
                                            <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal-delete" onClick={() => setCurrentData(p)}>Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalAddPost />
            <ModalEditPost oldData={currentData} />
            <ModalDeletePost oldData={currentData} />
        </>
    )
}


Dashboard.layout = page => <AdminLayout children={page} />
export default Dashboard