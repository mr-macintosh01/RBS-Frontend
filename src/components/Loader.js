import '../css/Loader.css'

function Loader() {
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
                <div className="loader"></div>
                <h2 style={{marginTop: '1em', textAlign: 'center'}}>Loading ...</h2>
            </div>
        </>
    )
}

export default Loader