import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import Swal from "sweetalert2"

export default function ModalAddPost() {
    const { data, setData, post, processing, errors, progress, recentlySuccessful, reset } = useForm({
        nama: '',
        image: null,
        kategori: ''
    })
    const submit = (e) => {
        e.preventDefault()
        post('/admin', {
            onSuccess: () => {
                const modal = document.querySelector('#exampleModal')
                bootstrap.Modal.getInstance(modal).hide()

                Swal.fire({
                    title: 'Sukses',
                    text: 'Sukses menambah data baru',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                reset()
            },
            onError: (e) => {
                console.log(e);
                Swal.fire({
                    title: 'Error',
                    text: 'Gagal Menambah Data',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }

        })
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={submit} >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label">Nama</label>
                                <input type="text" className="form-control" name="nama" id="nama" value={data.nama} onChange={({ target }) => setData('nama', target.value)} />
                                {errors.nama && <p className="text-danger">{errors.nama}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kategori" className="form-label">Kategori</label>
                                <input type="text" className="form-control" name="kategori" id="kategori" value={data.kategori} onChange={({ target }) => setData('kategori', target.value)} />
                                {errors.kategori && <p className="text-danger">{errors.kategori}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" name="image" id="image" onChange={({ target }) => setData('image', target.files[0])} />
                                {errors.image && <p className="text-danger">{errors.image}</p>}
                            </div>
                            {progress &&
                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar" style={{ width: `${progress.percentage}%` }}></div>
                                </div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {processing ?
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    'Add Post'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}