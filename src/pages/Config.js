import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import VerificationNotPassed from '../components/VerificationNotPassed'

import axios from 'axios'

import '../css/Config.css'

function Config() {
	const [sessionResult, setSessionResult] = useState(false)
	const [isLoader, setIsLoader] = useState(true)
    
    const [configStatusText, setConfigStatusText] = useState("Config doesn't exist, create it!")
    const [configId, setConfigId] = useState(1)

    const [predToIVOpenParam, setPredToIVOpenParam] = useState('')
    const [deltaThreshold, setDeltaThreshold] = useState('')
    const [realzVolThreshold, setRealzVolThreshold] = useState('')
    const [minAllowedSpentFromBalanceLONG, setMinAllowedSpentFromBalanceLONG] = useState('')
    const [trailingStopPercentage, setTrailingStopPercentage] = useState('')

    const [IVForClose, setIVForClose] = useState('')
    const [minAllowedSpentFromBalanceSHORT, setMinAllowedSpentFromBalanceSHORT] = useState('')
    const [maxDeviation, setMaxDeviation] = useState('')
    const [marginFactor, setMarginFactor] = useState('')

    useEffect(() => {
        axios
        .get(`http://${process.env.REACT_APP_API_PORT}/config`, {headers: {'passwordhash': sessionStorage['passwordhash']}})
        .then(res => {
            setSessionResult(res.data.verificationStatus)
            if (res.data['config'].length) {
                const config = res.data['config'][0]

                setConfigStatusText('Config exist, you can update it!')
                setConfigId(config['_id'])

                setPredToIVOpenParam(config['LONG']['predToIVOpenParam'])
                setDeltaThreshold(config['LONG']['deltaThreshold'])
                setRealzVolThreshold(config['LONG']['realzVolThreshold'])
                setMinAllowedSpentFromBalanceLONG(config['LONG']['minAllowedSpentFromBalance'])
                setTrailingStopPercentage(config['LONG']['trailingStopPercentage'])

                setIVForClose(config['SHORT']['IVForClose'])
                setMinAllowedSpentFromBalanceSHORT(config['SHORT']['minAllowedSpentFromBalance'])
                setMaxDeviation(config['SHORT']['maxDeviation'])
                setMarginFactor(config['SHORT']['marginFactor'])
            }
        })
        .catch(e => {
            console.log(e)
            setIsLoader(false)
        })
    }, [])

    const handleOnClick = () => {
        const obj = {
            LONG: {
                predToIVOpenParam: +predToIVOpenParam,
                deltaThreshold: +deltaThreshold,
                realzVolThreshold: +realzVolThreshold,
                minAllowedSpentFromBalance: +minAllowedSpentFromBalanceLONG,
                trailingStopPercentage: +trailingStopPercentage
            },
            SHORT: {
                IVForClose: +IVForClose,
                minAllowedSpentFromBalance: +minAllowedSpentFromBalanceSHORT,
                maxDeviation: +maxDeviation,
                marginFactor: +marginFactor
            }
        }

        axios.put(`http://${process.env.REACT_APP_API_PORT}/config/${configId}`, obj, {headers: {'passwordhash': sessionStorage['passwordhash'], "Access-Control-Allow-Origin": process.env.REACT_APP_API_PORT}})
		.then(res => {
            setConfigStatusText(res.data.message)
            console.log(res.data)
		})
		.catch(e => {
            setConfigStatusText(e.response.data.message)
			console.log(e.response.data.message)
		})
    }

    const handleInputChange = event => {

        switch(event.target.name) {
            case "predToIVOpenParam":
                setPredToIVOpenParam(event.target.value)
                break
            case "deltaThreshold":
                setDeltaThreshold(event.target.value)
                break
            case "realzVolThreshold":
                setRealzVolThreshold(event.target.value)
                break
            case "minAllowedSpentFromBalanceLONG":
                setMinAllowedSpentFromBalanceLONG(event.target.value)
                break
            case "trailingStopPercentage":
                setTrailingStopPercentage(event.target.value)
                break
            case "IVForClose":
                setIVForClose(event.target.value)
                break
            case "minAllowedSpentFromBalanceSHORT":
                setMinAllowedSpentFromBalanceSHORT(event.target.value)
                break
            case "maxDeviation":
                setMaxDeviation(event.target.value)
                break
            case "marginFactor":
                setMarginFactor(event.target.value)
                break
            default:
                console.log('')
        }
    }
    
    return (
        <>{sessionResult ? (
            <div>
                <div className="INBLOCK">
                    <div>
                        <h1>Config Status: {configStatusText}</h1>
                    </div>
                    <h1 style={{marginTop: '2em'}}>LONG</h1>
                    <div className="POS">
                        <div>
                            <h2>predToIVOpenParam</h2>
                            <input type="number" name="predToIVOpenParam" value={predToIVOpenParam} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <h2>deltaThreshold</h2>
                            <input type="number" name="deltaThreshold" value={deltaThreshold} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <h2>realzVolThreshold</h2>
                            <input type="number" name="realzVolThreshold" value={realzVolThreshold} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <h2>minAllowedSpentFromBalanceLONG</h2>
                            <input type="number" name="minAllowedSpentFromBalanceLONG" value={minAllowedSpentFromBalanceLONG} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <h2>trailingStopPercentage</h2>
                            <input type="number" name="trailingStopPercentage" value={trailingStopPercentage} onChange={handleInputChange}></input>
                        </div>
                    </div>
                    
                </div>
                <div className="INBLOCK">
                    <h1 style={{marginTop: '2em'}}>SHORT</h1>
                    <div className="POS">
                        <div>
                            <h2>IVForClose</h2>
                            <input type="number" name="IVForClose" value={IVForClose} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <h2>minAllowedSpentFromBalanceSHORT</h2>
                            <input type="number" name="minAllowedSpentFromBalanceSHORT" value={minAllowedSpentFromBalanceSHORT} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <h2>maxDeviation</h2>
                            <input type="number" name="maxDeviation" value={maxDeviation} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <h2>marginFactor</h2>
                            <input type="number" name="marginFactor" value={marginFactor} onChange={handleInputChange}></input>
                        </div>
                    </div>
                </div>
                <div style={{marginBottom: "2em", marginLeft: "2em", marginRight: "2em"}}>
                    <div className='navigation'>
                       <Link to={'/'}>
                            <button>Home Page</button>
                        </Link>
                        <Link to={'/analytics'}>
                            <button>Analytics Page</button>
                        </Link>
                        <button onClick={handleOnClick}>Add/Update</button>
                    </div>
                </div>
            </div>
        ) : <VerificationNotPassed isLoader={isLoader}/>}
            
        </>
    )
}

export default Config