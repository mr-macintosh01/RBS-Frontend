import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import VerificationNotPassed from '../components/VerificationNotPassed'

import axios from 'axios'

import '../css/Home.css'

function sendOrderToOMS(event) {
	axios
	.get(`http://${process.env.REACT_APP_API_PORT}/${event.target.innerHTML.replaceAll(' ', '')}`, {headers: {'passwordhash': sessionStorage['passwordhash'], "Access-Control-Allow-Origin": 'http://' + process.env.REACT_APP_API_PORT}})
	.then(res => {
		console.log(res.data)
	})
	.catch(e => {
		console.log(e)
	})
}

function Home() {
	const [sessionResult, setSessionResult] = useState(false)
	const [isLoader, setIsLoader] = useState(true)
	const [currentPositionCost, setCurrentPositionCost] = useState({'status': false})

	const [data, setData] = useState({
		'balanceData': {
            'balance': 0.0,
            'binanceBalance': 0.0,
            'bybitBalance': 0.0
        },
        'analytics': {
            'price': 0.0,
			'tradingRegime': 'None',
            'serverTime': 0.0,
            'prediction': 0.0,
            'binanceOpen': 0.0,
            'bybitOpen': 0.0,
            'openTime': 0.0,
            'dataVector': {
				'vector': []
			},
			'fatalErrorInAnalytics': false,
			'decisionToTrade': false,
        },
        'position': {
			'status': false,
			'text': 'There are no opened positions!'
		}
	})

	const updateCurrentPositionCost = () => {
		axios
		.get(`http://${process.env.REACT_APP_API_PORT}/updateCurrentPositionCost`, {headers: {'passwordhash': sessionStorage['passwordhash'], "Access-Control-Allow-Origin": 'http://' + process.env.REACT_APP_API_PORT}})
		.then(res => {
			const data = res.data
			console.log(data)
			
			if (data['status']) {	
				setCurrentPositionCost(data)
				return 0
			}
			setCurrentPositionCost(0)
		})
		.catch(e => {
			console.log(e)
			setCurrentPositionCost(0)
		})
	}

	useEffect(() => {
		axios
		.get(`http://${process.env.REACT_APP_API_PORT}/getData`, {headers: {'passwordhash': sessionStorage['passwordhash'], "Access-Control-Allow-Origin": 'http://' + process.env.REACT_APP_API_PORT}})
		.then(res => {
			console.log(res.data)
			setSessionResult(res.data.verificationStatus)
			setData(res.data)
		})
		.catch(e => {
			console.log(e)
			setIsLoader(false)
		})
	}, [])
	
	
	return (
		<>{sessionResult ? (
			<div>
			<div className="info">
				<div>
					<div style={{border: '2px solid white', paddingLeft: '1em', marginTop: '1em'}}>
						<h1>Account: {data['balanceData']['balance'].toFixed(2)} $</h1>
						<div>
							<h2>Binance balance: {data['balanceData']['binanceBalance'].toFixed(2)} $</h2>
							<h2>Bybit balance: {data['balanceData']['bybitBalance'].toFixed(2)} $</h2>
						</div>
					</div>
					
					<div style={{display: 'flex', marginTop: '3em'}}>
						<div style={{marginRight: '3em'}}>
							<h3>Binance open IV</h3>
							<h3>{data['analytics']['binanceOpen'] ? ('C ' +
								(+data['analytics']['binanceOpen']['Calls'][1]['bidIV']).toFixed(2) + '/' +
								(+data['analytics']['binanceOpen']['Calls'][1]['markIV']).toFixed(2) + '/' +
								(+data['analytics']['binanceOpen']['Calls'][1]['askIV']).toFixed(2)
							) : 'None'}</h3>
							<h3>{data['analytics']['binanceOpen'] ? ('P ' +
								(+data['analytics']['binanceOpen']['Puts'][1]['bidIV']).toFixed(2) + '/' +
								(+data['analytics']['binanceOpen']['Puts'][1]['markIV']).toFixed(2) + '/' +
								(+data['analytics']['binanceOpen']['Puts'][1]['askIV']).toFixed(2)
							) : 'None'}</h3>
							<h3>AveOpenIVBinance</h3>
							<h3>{data['analytics']['binanceOpen'] ? (Math.sqrt(1/365) * (data['analytics']['binanceOpen']['Calls'].reduce((accum, current) => accum + +current['markIV'], 0) + data['analytics']['binanceOpen']['Puts'].reduce((accum, current) => accum + +current['markIV'], 0))/6).toFixed(5) : 'None'}</h3>
						</div>
						<div>
							<h3>Bybit open IV</h3>
							<h3>{data['analytics']['bybitOpen'] ? ('C ' +
								(+data['analytics']['bybitOpen']['Calls'][1]['bid1IV']).toFixed(2) + '/' +
								(+data['analytics']['bybitOpen']['Calls'][1]['markIV']).toFixed(2) + '/' +
								(+data['analytics']['bybitOpen']['Calls'][1]['ask1IV']).toFixed(2)
							) : 'None'}</h3>
							<h3>{data['analytics']['bybitOpen'] ? ('P ' +
								(+data['analytics']['bybitOpen']['Puts'][1]['bid1IV']).toFixed(2) + '/' +
								(+data['analytics']['bybitOpen']['Puts'][1]['markIV']).toFixed(2) + '/' +
								(+data['analytics']['bybitOpen']['Puts'][1]['ask1IV']).toFixed(2)
							) : 'None'}</h3>
							<h3>AveOpenIVBybit</h3>
							<h3>{data['analytics']['bybitOpen'] ? (Math.sqrt(1/365) * (data['analytics']['bybitOpen']['Calls'].reduce((accum, current) => accum + +current['markIV'], 0) + data['analytics']['bybitOpen']['Puts'].reduce((accum, current) => accum + +current['markIV'], 0))/6).toFixed(5) : 'None'}</h3>
						</div>
					</div>
				</div>
				<div>
					<h1>Day Analytics:</h1>
					<div>
						<h4>Prediction: {data['analytics']['prediction']}</h4>
						<h4>Open Time: {data['analytics']['openTime']}</h4>
						<div>
							<h4>Data Vector: </h4>
							{data['analytics']['dataVector']['vector'].map(key => <h4 style={{margin: 0}} key={key}>{key.toFixed(3)}</h4>)}
						</div>
					</div>
				</div>
				<div>
					<h1>Config: {data['position']['type']}</h1>
					{ data['position']['status'] ? (
						<div>
							{Object.keys(data['position']['config']).map(key => {
								return <h3 key={key}>{key}: {data['position']['config'][key]}</h3>
							})}
						</div>
					) : ''}
				</div>
				<div>
					<h2>Server Time: {new Date(data['analytics']['serverTime']).toISOString().split('.')[0]}</h2>
					<div className="control-panel">
						<div>
							<button onClick={sendOrderToOMS} style={{background:'#26ff00'}}>Start</button>
							<button onClick={sendOrderToOMS} style={{background:'#ff9101'}}>Soft Stop</button>
							<button onClick={sendOrderToOMS} style={{background:'#ad0d0d'}}>Hard Stop</button>
						</div>
					</div>
					<div>
						<h2 style={{marginBottom: '0'}}>Current Trading Regime: {data['analytics']['tradingRegime']}</h2>
						<h2>Error during analytics: {String(data['analytics']['fatalErrorInAnalytics'])}</h2>
						<h2>Decision to trade today: {String(data['analytics']['decisionToTrade'])}</h2>
						<h2 style={{marginBottom: '0', textAlign: 'center'}}>Position: </h2>
						<div style={{display: 'flex', justifyContent: 'space-around'}}>
							<div>
								<h3>Status: {data['positionStatus'] || 'None'}</h3>
							</div>
							<div>
								<h3>Regime: {data['positionRegime'] || 'None'}</h3>
							</div>
						</div>
					</div>
                    <div className='navigation' >
                        <Link to={'/analytics'}>
                            <button>Analytics Page</button>
                        </Link>
                        <Link to={'/config'}>
                            <button>Config Page</button>
                        </Link>
                    </div>
				</div>
			</div>
			<div className="position">
					{ data['position']['status'] ? (
						<div className="generalPositionInfo">
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<h1>Status: {data['position']['text']}</h1>
							</div>
							<div className="positionInfo">
								<div>
									<h3>Price Index Open: {(+data['position']['priceIndexOpen']).toFixed(2)} $</h3>
									<h3>Entry Position Cost: {(+data['position']['positionEntryCost']).toFixed(2)} $</h3>
									<div>
										<h3>Current Position Cost:  $</h3>
										<button onClick={updateCurrentPositionCost}>Update</button>
									</div>
								</div>
								<div>
									<h3>Upper Price: {(+data['position']['upperPrice']).toFixed(2)} $</h3>
									<h3>Price Index: {(+data['position']['priceIndex']).toFixed(2)} $</h3>
									<h3>Lower Price: {(data['position']['lowerPrice']).toFixed(2)} $</h3>
								</div>
								<div>
									<h3>OSSA: {(+data['position']['oneStraddleSpentAmount']).toFixed(2)} $</h3>
									{data['position']['type'] === 'LONG' ? <h3>atORV: {(+data['position']['atOpenRealizedVol'] * 100).toFixed(2)} %</h3> : <h3>atORV: -:- %</h3>}
								</div>
								{data['position']['type'] === 'LONG' ?
									<div>
										<h3>TSS: {data['position']['trailingStopSide']}</h3>
										<h3>TSP: {(+data['position']['trailingStopPrice']).toFixed(2)}</h3>
										<h3>TSP: {data['position']['trailingStopPercentage']}</h3>
										<h3>TSACP: {(+data['position']['trailingStopPrice'] * data['position']['trailingStopPercentage']).toFixed(2)}</h3>
									</div>
									: ''
								}
								<div>
									<h3>Platform: {data['position']['platform']}</h3>
									<h3>Type: {data['position']['type']}</h3>
								</div>
							</div>
						</div>

					) : (
						<div className="generalPositionInfo">
							<h1>Status: {data['position']['text']}</h1>
						</div>
							
						)
					}
			</div>
			<div className='currentPositionInformation'>
				{ currentPositionCost['status'] ? (
					<div>
						<div style={{textAlign: 'center'}}>
							<h1>Current Straddle Information</h1>
						</div>
						<div style={{textAlign: 'center'}}>
							<h2>Position Information</h2>
						</div>
						<div style={{display: 'flex', justifyContent: 'space-around', border: '2px solid white'}}>
							<div>
								<h3>Entry Cost</h3>
								<h3>{(+data['position']['positionEntryCost']).toFixed(2)}</h3>
							</div>
							<div>
								<h3>Market Close</h3>
								<h3>{(+data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['mp'] + +currentPositionCost['positionCurrentCost'][1]['mp'])).toFixed(2)} $</h3>
							</div>
							<div>
								<h3>Order Book Close</h3>
								<h3>{(
										data['position']['type'] === 'LONG' ?
										+data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['bo'] + +currentPositionCost['positionCurrentCost'][1]['bo']) : 
										+data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['ao'] + +currentPositionCost['positionCurrentCost'][1]['ao'])
									).toFixed(2)} $</h3>
							</div>
							<div>
								<h3>Market Close P/L</h3>
								<h3>{(
									data['position']['type'] === 'LONG' ?
									+data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['mp'] + +currentPositionCost['positionCurrentCost'][1]['mp']) - +data['position']['positionEntryCost'] :
									data['position']['positionEntryCost'] - +data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['mp'] + +currentPositionCost['positionCurrentCost'][1]['mp'])
									).toFixed(2)} $</h3>
								<h3>{(
									data['position']['type'] === 'LONG' ?
									(+data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['mp'] + +currentPositionCost['positionCurrentCost'][1]['mp']) - +data['position']['positionEntryCost']) /+data['position']['positionEntryCost'] * 100 :
									(+data['position']['positionEntryCost'] - +data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['mp'] + +currentPositionCost['positionCurrentCost'][1]['mp'])) / +data['position']['positionEntryCost'] * 100
									).toFixed(2)} %</h3>
							</div>
							<div>
								<h3>Order Book Close P/L</h3>
								<h3>{(
									data['position']['type'] === 'LONG' ?
									+data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['bo'] + +currentPositionCost['positionCurrentCost'][1]['bo']) - +data['position']['positionEntryCost'] :
									+data['position']['positionEntryCost'] - +data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['ao'] + +currentPositionCost['positionCurrentCost'][1]['ao'])
									).toFixed(2)} $</h3>
								<h3>{(
									data['position']['type'] === 'LONG' ?
									(+data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['bo'] + +currentPositionCost['positionCurrentCost'][1]['bo']) - +data['position']['positionEntryCost']) / +data['position']['positionEntryCost'] * 100 :
									(+data['position']['positionEntryCost'] - +data['position']['openPositions'][0]['quantity'] * (+currentPositionCost['positionCurrentCost'][0]['ao'] + +currentPositionCost['positionCurrentCost'][1]['ao'])) / +data['position']['positionEntryCost'] * 100
									).toFixed(2)} %</h3>
							</div>
							<div>
								<h3>Bid</h3>
								<h3>C {(+currentPositionCost['positionCurrentCost'][0]['bo']).toFixed(2)} $</h3>
								<h3>P {(+currentPositionCost['positionCurrentCost'][1]['bo']).toFixed(2)} $</h3>
							</div>
							<div>
								<h3>Mark</h3>
								<h3>C {(+currentPositionCost['positionCurrentCost'][0]['mp']).toFixed(2)} $</h3>
								<h3>P {(+currentPositionCost['positionCurrentCost'][1]['mp']).toFixed(2)} $</h3>
							</div>
							<div>
								<h3>Ask</h3>
								<h3>C {(+currentPositionCost['positionCurrentCost'][0]['ao']).toFixed(2)} $</h3>
								<h3>P {(+currentPositionCost['positionCurrentCost'][1]['ao']).toFixed(2)} $</h3>
							</div>
						</div>
						<div style={{textAlign: 'center'}}>
							<h2>Contract Information</h2>
						</div>
						<div style={{display: 'flex', justifyContent: 'space-around', border: '2px solid white'}}>
							<div>
								<h3>Type</h3>
								<h3>{currentPositionCost['positionCurrentCost'][0]['s'].split('-')[3]}</h3>
							</div>
							<div>
								<h3>Symbol</h3>
								<h3>{currentPositionCost['positionCurrentCost'][0]['s']}</h3>
							</div>
							<div>
								<h3>bid IV/Price</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][0]['b']).toFixed(2)}</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][0]['bo']).toFixed(2)}</h3>
							</div>
							<div>
								<h3>mark IV/Price</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][0]['vo']).toFixed(2)}</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][0]['mp']).toFixed(2)}</h3>
							</div>
							<div>
								<h3>ask IV/Price</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][0]['a']).toFixed(2)}</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][0]['ao']).toFixed(2)}</h3>
							</div>
						</div>
						<div style={{display: 'flex', justifyContent: 'space-around',  border: '2px solid white'}}>
							<div>
								<h3>Type</h3>
								<h3>{currentPositionCost['positionCurrentCost'][1]['s'].split('-')[3]}</h3>
							</div>
							<div>
								<h3>Symbol</h3>
								<h3>{currentPositionCost['positionCurrentCost'][1]['s']}</h3>
							</div>
							<div>
								<h3>bid IV/Price</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][1]['b']).toFixed(2)}</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][1]['bo']).toFixed(2)}</h3>
							</div>
							<div>
								<h3>mark IV/Price</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][1]['vo']).toFixed(2)}</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][1]['mp']).toFixed(2)}</h3>
							</div>
							<div>
								<h3>ask IV/Price</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][1]['a']).toFixed(2)}</h3>
								<h3>{(+currentPositionCost['positionCurrentCost'][1]['ao']).toFixed(2)}</h3>
							</div>
						</div>	
					</div>
				) : ''}
			</div>
			{ data['position']['status'] ? (
				<div className='openPositionInformation'>
					<div style={{textAlign: 'center'}}>
						<h1>Open Order Information</h1>
					</div>
					<div className="Call">
						<div>
							<h3>Type</h3>
							<h3>{data['position']['openPositions'][0]['symbol'].split('-')[3]}</h3>
						</div>
						<div>
							<h3>Symbol</h3>
							<h3>{data['position']['openPositions'][0]['symbol']}</h3>
						</div>
						<div>
							<h3>Order Price</h3>
							<h3>{(+data['position']['openPositions'][0]['price']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>AvgPrice</h3>
							<h3>{(+data['position']['openPositions'][0]['avgPrice']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>Quantity</h3>
							<h3>{(+data['position']['openPositions'][0]['quantity']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>Fee</h3>
							<h3>{(+data['position']['openPositions'][0]['fee']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>Side</h3>
							<h3>{data['position']['openPositions'][0]['side']}</h3>
						</div>
						<div>
							<h3>CreateTime</h3>
							<h3>{new Date(data['position']['openPositions'][0]['createTime']).toISOString().split('.')[0]}</h3>
						</div>
						<div>
							<h3>bidIV</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][0]['b']).toFixed(2)}</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][0]['bo']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>markIV</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][0]['vo']).toFixed(2)}</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][0]['mp']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>askIV</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][0]['a']).toFixed(2)}</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][0]['ao']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>delta</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][0]['d']).toFixed(2)}</h3>
						</div>
					</div>
					<div className="Put">
						<div>
							<h3>Type</h3>
							<h3>{data['position']['openPositions'][1]['symbol'].split('-')[3]}</h3>
						</div>
						<div>
							<h3>Symbol</h3>
							<h3>{data['position']['openPositions'][1]['symbol']}</h3>
						</div>
						<div>
							<h3>Order Price</h3>
							<h3>{(+data['position']['openPositions'][1]['price']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>AvgPrice</h3>
							<h3>{(+data['position']['openPositions'][1]['avgPrice']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>Quantity</h3>
							<h3>{(+data['position']['openPositions'][1]['quantity']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>Fee</h3>
							<h3>{(+data['position']['openPositions'][1]['fee']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>Side</h3>
							<h3>{data['position']['openPositions'][1]['side']}</h3>
						</div>
						<div>
							<h3>CreateTime</h3>
							<h3>{new Date(data['position']['openPositions'][1]['createTime']).toISOString().split('.')[0]}</h3>
						</div>
						<div>
							<h3>bidIV</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][1]['b']).toFixed(2)}</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][1]['bo']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>markIV</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][1]['vo']).toFixed(2)}</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][1]['mp']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>askIV</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][1]['a']).toFixed(2)}</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][1]['ao']).toFixed(2)}</h3>
						</div>
						<div>
							<h3>delta</h3>
							<h3>{(+data['position']['openPositionMarketConditions'][1]['d']).toFixed(2)}</h3>
						</div>
					</div>

				</div>
			) : ''}

    	</div>
		) : <VerificationNotPassed isLoader={isLoader}/>}</>	
	)
}

export default Home;
