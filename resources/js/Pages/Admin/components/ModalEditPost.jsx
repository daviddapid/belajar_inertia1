import { router, useForm } from "@inertiajs/react"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function ModalEditPost({ oldData }) {
    const [processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState({
        nama: null,
        kategori: null,
        image: null
    })
    const { data, setData, progress } = useForm({
        id: null,
        nama: '',
        image: null,
        kategori: ''
    })
    const submit = (e) => {
        e.preventDefault()
        const payload = {
            _method: 'put',
            ...data
        }
        router.post(`/admin/${data.id}`, payload, {
            onStart: () => setProcessing(true),
            onSuccess: () => {
                const modal = document.querySelector('#modal-edit')
                bootstrap.Modal.getInstance(modal).hide()
                Swal.fire({
                    title: 'Sukses',
                    text: 'Sukses menambah data baru',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                setProcessing(false)
                setErrors({})
            },
            onError: (err) => {
                setErrors(err)
                setProcessing(false)
            }
        })
    }
    // set/ re-update the data
    useEffect(() => {
        setData(oldData)
    }, [oldData])

    return (
        <div className="modal fade" id="modal-edit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={submit} >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="nama" className="form-label">Nama</label>
                                <input type="text" className="form-control" name="nama" id="nama" value={data.nama} onChange={({ target }) => setData('nama', target.value)} />
                                {errors.nama && <p className="text-muted">{errors.nama}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kategori" className="form-label">Kategori</label>
                                <input type="text" className="form-control" name="kategori" id="kategori" value={data.kategori} onChange={({ target }) => setData('kategori', target.value)} />
                                {errors.kategori && <p className="text-muted">{errors.kategori}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" name="image" id="image" onChange={({ target }) => setData('image', target.files[0])} />
                                {errors.image && <p className="text-muted">{errors.image}</p>}
                                {progress &&
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {processing ?
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    'Update Post'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}