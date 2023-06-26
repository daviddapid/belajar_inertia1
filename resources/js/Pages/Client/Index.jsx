import ClientLayout from "./Layout"

export default function Index() {
    return (
        <h1>klien page</h1>
    )
}

Index.layout = page => <ClientLayout children={page} />