import { Link } from 'react-router-dom'

import Loader from './Loader'

function VerificationNotPassed({isLoader}) {
    return (
        <>
            {isLoader ? (
                <Loader />
            ) : (
                <div style={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div>
                            <h1 style={{color: 'yellow'}}>You are not verified!</h1>
                        </div>
                        <Link to={'/verification'}>
                            <button style={{border: '1px solid white', borderRadius: '1em', padding: '2em', background: 'white', fontSize: '1em'}}>Verification Page</button>
                        </Link>
                    </div>
                </div>
            )}
            
        </>
    )
}

export default VerificationNotPassed