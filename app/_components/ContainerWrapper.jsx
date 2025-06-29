export function ContainerWrapper({children}) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-6">
            {/*// We must ship. - Taylor Otwell*/}
            {children}
        </div>
    )
}