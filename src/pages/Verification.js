import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Verification() {
    const navigate = useNavigate()

    const [color, setColor] = useState('green')
    const [passwordText, setPasswordText] = useState('')
    const [verificationMessage, setVerificationMessage] = useState('')

    const verify = () => {
        const obj = {
            'passwordText': passwordText
        }

        axios.post(`http://${process.env.REACT_APP_API_PORT}/verify`, obj)
        .then(res => {
            setVerificationMessage(res.data.message)
            window.sessionStorage.setItem('passwordhash', res.data.passwordHash)
            navigate('/')

            return res
        })
        .catch(err => {
            setColor('red')
            setVerificationMessage(err.response.data.message)
            console.log(err)
        })
    }

    const handleInputChange = event => {
        setPasswordText(event.target.value)
    }

    return (
        <>
            <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{marginBottom: '2em', width: '100%', textAlign: 'center'}}>
                    <h1>Verification</h1>
                </div>

                <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div>
                        <h2>Password:</h2>
                        <input name="password" type="password" onChange={handleInputChange}></input>
                    </div>
                    <div>
                        <h3 style={{color: color}}>{verificationMessage}</h3>
                    </div>
                </div>

                <div style={{marginTop: '2em', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <button style={{border: '1px solid white', borderRadius: '1em', padding: '1em', background: 'white', fontSize: '1em', paddingLeft: '2em', paddingRight: '2em'}} onClick={verify}>Verify</button>
                </div>
            </div>
        </>
    )
}

export default Verification
