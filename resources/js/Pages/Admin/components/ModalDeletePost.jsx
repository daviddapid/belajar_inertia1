import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import Swal from "sweetalert2"

export default function ModalDeletePost({ oldData }) {
    const { data, setData, delete: destroy, processing } = useForm({ id: null })

    useEffect(() => {
        setData(oldData)
    }, [oldData])

    const submit = (e) => {
        e.preventDefault()
        destroy(`/admin/${data.id}`, {
            onSuccess: () => {
                const modal = document.querySelector('#modal-delete')
                bootstrap.Modal.getInstance(modal).hide()
                Swal.fire({
                    title: 'Sukses',
                    text: 'Sukses menambah data baru',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            },
            onError: () => {
                Swal.fire({
                    title: 'Error',
                    text: 'Gagal menambah data baru',
                    icon: 'error',
                    confirmButtonText: 'ok'
                })
            }
        })
    }

    return (
        <div className="modal fade" id="modal-delete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={submit} >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Apakah Anda Yakin Akan Menghapus Data Ini? : <b>{data.nama}</b>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-danger" disabled={processing}>
                                {processing ?
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    'Delete Post'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}