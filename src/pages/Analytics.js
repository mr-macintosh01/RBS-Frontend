import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import VerificationNotPassed from '../components/VerificationNotPassed'

import { LineChart } from '@mui/x-charts/LineChart'
import { BarChart } from '@mui/x-charts/BarChart'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import axios from 'axios'

import '../css/Analytics.css'

const minDistance = 1

const valueFormatter = date => '' + new Date(date).getFullYear() + '-' + new Date(date).toISOString().split('-')[1] + '-' + new Date(date).toString().split(' ')[2]

function Analytics() {
	const [sessionResult, setSessionResult] = useState(false)
	const [isLoader, setIsLoader] = useState(true)
    const [arrayToShow, setArrayToShow] = useState([])

    const [dates, setDates] = useState([])

    const [balanceDates, setBalanceDates] = useState([])
    const [balance, setBalance] = useState([])
    const [binanceBalance, setBinanceBalance] = useState([])
    const [bybitBalance, setBybitBalance] = useState([])

    const [positionsDates, setPositionsDates] = useState([])
    const [positionsPercentage, setPositionsPercentage] = useState([])
    const [binanceLongPositions, setBinanceLongPositions] = useState([])
    const [bybitShortPositions, setBybitShortPositions] = useState([])

    const [historicalVolatility, setHistoricalVolatility] = useState([])

    const [predictions, setPredictions] = useState([])

    const [bidIVOpenBinance, setBidIVOpenBinance] = useState([])
    const [bidIVCloseBinance, setBidIVCloseBinance] = useState([])
    const [markIVOpenBinance, setMarkIVOpenBinance] = useState([])
    const [markIVCloseBinance, setMarkIVCloseBinance] = useState([])
    const [askIVOpenBinance, setAskIVOpenBinance] = useState([])
    const [askIVCloseBinance, setAskIVCloseBinance] = useState([])

    const [bidIVOpenBybit, setBidIVOpenBybit] = useState([])
    const [bidIVCloseBybit, setBidIVCloseBybit] = useState([])
    const [markIVOpenBybit, setMarkIVOpenBybit] = useState([])
    const [markIVCloseBybit, setMarkIVCloseBybit] = useState([])
    const [askIVOpenBybit, setAskIVOpenBybit] = useState([])
    const [askIVCloseBybit, setAskIVCloseBybit] = useState([])
    
    const [valueAnalytics, setValueAnalytics] = useState([0, 1])
    const [valueBalance, setValueBalance] = useState([0, 1])
    const [valueBinanceBalance, setValueBinanceBalance] = useState([0, 1])
    const [valueBybitBalance, setValueBybitBalance] = useState([0, 1])

    const [valuePositionsPercentage, setValuePositionsPercentage] = useState([0, 1])
    const [valueBinanceLongPositions, setValueBinanceLongPositions] = useState([0, 1])
    const [valueBybitShortPositions, setValueBybitShortPositions] = useState([0, 1])

    const handleCheckboxChange = event => {
        if (event.target.checked) {
            switch(event.target.name) {
                case 'historicalVolatility':
                    setArrayToShow([
                        {
                            data: historicalVolatility,
                            label: 'Historical Volatility',
                            color: '#00b4d8',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    console.log(event.target.name)
                    break
                case 'bidIVOpenBinance': 
                    setArrayToShow([
                        {
                            data: bidIVOpenBinance,
                            color: '#38b000',
                            label: 'bidIV Open Binance',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    break
                case 'markIVOpenBinance':
                    setArrayToShow([
                        {
                            data: markIVOpenBinance,
                            color: 'yellow',
                            label: 'markIV Open Binance',
                            curve: 'linear',

                        },
                        ...arrayToShow
                    ])
                    break
                case 'askIVOpenBinance': 
                    setArrayToShow([
                        {
                            data: askIVOpenBinance,
                            color: '#d00000',
                            label: 'askIV Open Binance',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    break
                case 'prediction': 
                    setArrayToShow([
                        {
                            data: predictions,
                            color: '#ec0868',
                            label: 'Prediction',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    break
                case 'bidIVCloseBinance': 
                    setArrayToShow([
                        {
                            data: bidIVCloseBinance,
                            color: '#38b000',
                            label: 'bidIV Close Binance',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    break
                case 'markIVCloseBinance': 
                    setArrayToShow([
                        {
                            data: markIVCloseBinance,
                            color: 'yellow',
                            label: 'markIV Close Binance',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    break
                case 'askIVCloseBinance': 
                    setArrayToShow([
                        {
                            data: askIVCloseBinance,
                            color: '#d00000',
                            label: 'askIV Close Binance',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    break

                case 'bidIVOpenBybit': 
                    setArrayToShow([
                        {
                            data: bidIVOpenBybit,
                            color: '#38b000',
                            label: 'bidIV Open Bybit',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    break
                case 'markIVOpenBybit':
                    setArrayToShow([
                        {
                            data: markIVOpenBybit,
                            color: 'yellow',
                            label: 'markIV Open Bybit',
                            curve: 'linear',

                        },
                        ...arrayToShow
                    ])

                    break
                case 'askIVOpenBybit': 
                    setArrayToShow([
                        {
                            data: askIVOpenBybit,
                            color: '#d00000',
                            label: 'askIV Open Bybit',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])

                    break
                case 'bidIVCloseBybit': 
                    setArrayToShow([
                        {
                            data: bidIVCloseBybit,
                            color: '#38b000',
                            label: 'bidIV Close Bybit',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    console.log(event.target.name)
                    break
                case 'markIVCloseBybit': 
                    setArrayToShow([
                        {
                            data: markIVCloseBybit,
                            color: 'yellow',
                            label: 'markIV Close Bybit',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    console.log(event.target.name)
                    break
                case 'askIVCloseBybit': 
                    setArrayToShow([
                        {
                            data: askIVCloseBybit,
                            color: '#d00000',
                            label: 'askIV Close Bybit',
                            curve: 'linear',
                        },
                        ...arrayToShow
                    ])
                    console.log(event.target.name)
                    break
                default:
                    console.log('nothing')
                    break
            }
        } else {
            switch(event.target.name) {
                case 'historicalVolatility':
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: historicalVolatility,
                        label: 'Historical Volatility',
                        color: '#00b4d8',
                        curve: 'linear',
                    })))
                    break
                case 'bidIVOpenBinance':
                        setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                            data: bidIVOpenBinance,
                            color: '#38b000',
                            label: 'bidIV Open Binance',
                            curve: 'linear',
                        })))
                        console.log(event.target.name)
                        break    
                case 'markIVOpenBinance':
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: markIVOpenBinance,
                        color: 'yellow',
                        label: 'markIV Open Binance',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break
                case 'askIVOpenBinance':
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: askIVOpenBinance,
                        color: '#d00000',
                        label: 'askIV Open Binance',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break 
                case 'prediction': 
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: predictions,
                        color: '#ec0868',
                        label: 'Prediction',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break
                case 'bidIVCloseBinance': 
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: bidIVCloseBinance,
                        color: '#38b000',
                        label: 'bidIV Close Binance',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break
                case 'markIVCloseBinance': 
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: markIVCloseBinance,
                        color: 'yellow',
                        label: 'markIV Close Binance',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break
                case 'askIVCloseBinance': 
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: askIVCloseBinance,
                        color: '#d00000',
                        label: 'askIV Close Binance',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break
                case 'bidIVOpenBybit':
                        setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                            data: bidIVOpenBybit,
                            color: '#38b000',
                            label: 'bidIV Open Bybit',
                            curve: 'linear',
                        })))
                        console.log(event.target.name)
                        break    
                case 'markIVOpenBybit':
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: markIVOpenBybit,
                        color: 'yellow',
                        label: 'markIV Open Bybit',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break
                case 'askIVOpenBybit':
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: askIVOpenBybit,
                        color: '#d00000',
                        label: 'askIV Open Bybit',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break 
                case 'bidIVCloseBybit': 
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: bidIVCloseBybit,
                        color: '#38b000',
                        label: 'bidIV Close Bybit',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break
                case 'markIVCloseBybit': 
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: markIVCloseBybit,
                        color: 'yellow',
                        label: 'markIV Close Bybit',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break
                case 'askIVCloseBybit': 
                    setArrayToShow(arrayToShow.filter(line => JSON.stringify(line) !== JSON.stringify({
                        data: askIVCloseBybit,
                        color: '#d00000',
                        label: 'askIV Close Bybit',
                        curve: 'linear',
                    })))
                    console.log(event.target.name)
                    break
                default:
                    console.log('nothing')
                    break
            }
        }
    }

    const handleChange = (event, newValue, activeThumb, stateFunc, dates) => {
        if (!Array.isArray(newValue)) {
            return
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], dates.length - minDistance - 1)
                stateFunc([clamped, clamped + minDistance])
            } else {
                const clamped = Math.max(newValue[1], minDistance)
                stateFunc([clamped - minDistance, clamped])
            }
        } else {
            stateFunc(newValue)
        }
    }
    
    useEffect(() => {
        const obj = {
            predictionQuery: {
                find: {},
                projection: {date: 1, _id: 0, prediction: 1},
                sort: {date: 1}
            },
            dataVectorQuery: {
                find: {},
                projection: {date: 1, _id: 0, vector: 1},
                sort: {date: 1}
            },
            binanceOptionsHistoryQuery: {
                find: {},
                projection: {
                    open: {
                        date: 1,
                        Calls: 1,
                        Puts: 1
                    },
                    close: {
                        date: 1,
                        Calls: 1,
                        Puts: 1
                    },
                    _id: 0
                },
                sort: {'open.date': 1}
            },
            bybitOptionsHistoryQuery: {
                find: {},
                projection: {
                    open: {
                        date: 1,
                        Calls: 1,
                        Puts: 1
                    },
                    close: {
                        date: 1,
                        Calls: 1,
                        Puts: 1
                    },
                    _id: 0
                },
                sort: {'open.date': 1}
            },
            balanceHistoryQuery: {
                find: {},
                projection: {                    
                    date: 1,
                    _id: 0,
                    balance: 1, 
                    binanceBalance: 1,
                    bybitBalance: 1
                },
                sort: {
                    date: 1
                }
            },
            positionsHistoryQuery: {
                find: {},
                projection: {
                    date: 1,
                    _id: 0,
                    profit$: 1,
                    'profit%': 1,
                    platform: 1,
                    type: 1,
                },
                sort: {
                    date: 1
                }
            }
        }

        axios.post(`http://${process.env.REACT_APP_API_PORT}/getAnalytics`, obj, {headers: {'passwordhash': sessionStorage['passwordhash']}})
        .then(res => {
            console.log(res.headers)
            setSessionResult(res.headers.verificationstatus)
            const recreatedObj = {}   
            const allDates = {}
            
            for (let i = 0; i < Object.keys(res.data).length; i++) {
                if (Object.keys(res.data)[i] === 'binanceOptionsHistory' || Object.keys(res.data)[i] === 'bybitOptionsHistory') {
                    recreatedObj[Object.keys(res.data)[i] + 'Open'] = {}
                    recreatedObj[Object.keys(res.data)[i] + 'Close'] = {}
                } else {
                    recreatedObj[Object.keys(res.data)[i]] = {}
                }
            }

            for (let i = 0; i < Object.keys(res.data).length; i++) {
                for (let j = 0; j < res.data[Object.keys(res.data)[i]].length; j++) {
                    if (Object.keys(res.data)[i] === 'binanceOptionsHistory' || Object.keys(res.data)[i] === 'bybitOptionsHistory') {
                        recreatedObj[Object.keys(res.data)[i] + 'Open'][res.data[Object.keys(res.data)[i]][j]['open']['date']] = res.data[Object.keys(res.data)[i]][j]['open']
                        recreatedObj[Object.keys(res.data)[i] + 'Close'][res.data[Object.keys(res.data)[i]][j]['close']['date']] = res.data[Object.keys(res.data)[i]][j]['close']

                        allDates[res.data[Object.keys(res.data)[i]][j]['open']['date']] = 1
                        allDates[res.data[Object.keys(res.data)[i]][j]['close']['date']] = 1
                    } else {
                        recreatedObj[Object.keys(res.data)[i]][res.data[Object.keys(res.data)[i]][j]['date']] = res.data[Object.keys(res.data)[i]][j]
                        allDates[res.data[Object.keys(res.data)[i]][j]['date']] = 1
                    }
                }
            }

            const allDatesKeys = Object.keys(allDates)
            allDatesKeys.sort()

            for (let i = 0; i < Object.keys(recreatedObj).length; i++) {
                for (let j = 0; j < allDatesKeys.length; j++) {
                    if (!(allDatesKeys[j] in recreatedObj[Object.keys(recreatedObj)[i]])) {
                        recreatedObj[Object.keys(recreatedObj)[i]][allDatesKeys[j]] = 0
                    }
                }
            }

            const datesArr = []

            for (let i = 0; i < allDatesKeys.length; i++) {
                datesArr.push(new Date(allDatesKeys[i]).getTime())
            }
            
            setDates(datesArr)
            
            let arr = []

            for (let j = 0; j < datesArr.length; j++) {
                if (recreatedObj['predictions'][allDatesKeys[j]]['prediction']) {
                    arr.push(recreatedObj['predictions'][allDatesKeys[j]]['prediction'])

                } else {
                    arr.push(0)
                }
            }

            setPredictions(arr)

            arr = []

            for (let j = 0; j < datesArr.length; j++) {
                if (recreatedObj['dataVector'][allDatesKeys[j]]) {
                    arr.push(recreatedObj['dataVector'][allDatesKeys[j]]['vector'][0][0])

                } else {
                    arr.push(0)
                }
            }
                
            setHistoricalVolatility(arr)
            let bidIVOpen = []
            let bidIVClose = []
            let markIVOpen = []
            let markIVClose = []
            let askIVOpen = []
            let askIVClose = []

            for (let j = 0; j < datesArr.length; j++) {
                if (recreatedObj['binanceOptionsHistoryOpen'][allDatesKeys[j]]){
                    bidIVOpen.push(((+recreatedObj['binanceOptionsHistoryOpen'][allDatesKeys[j]]['Calls'][1]['bidIV'] + +recreatedObj['binanceOptionsHistoryOpen'][allDatesKeys[j]]['Puts'][1]['bidIV']) / 2) * Math.sqrt(1/365))
                    markIVOpen.push(((+recreatedObj['binanceOptionsHistoryOpen'][allDatesKeys[j]]['Calls'][1]['markIV'] + +recreatedObj['binanceOptionsHistoryOpen'][allDatesKeys[j]]['Puts'][1]['markIV']) / 2) * Math.sqrt(1/365))
                    askIVOpen.push(((+recreatedObj['binanceOptionsHistoryOpen'][allDatesKeys[j]]['Calls'][1]['askIV'] + +recreatedObj['binanceOptionsHistoryOpen'][allDatesKeys[j]]['Puts'][1]['askIV']) / 2) * Math.sqrt(1/365))
                } else {
                    bidIVOpen.push(0)
                    markIVOpen.push(0)
                    askIVOpen.push(0)
                }

                if (recreatedObj['binanceOptionsHistoryClose'][allDatesKeys[j]]){
                    bidIVClose.push(((+recreatedObj['binanceOptionsHistoryClose'][allDatesKeys[j]]['Calls'][1]['bidIV'] + +recreatedObj['binanceOptionsHistoryClose'][allDatesKeys[j]]['Puts'][1]['bidIV']) / 2) * Math.sqrt(1/365))
                    markIVClose.push(((+recreatedObj['binanceOptionsHistoryClose'][allDatesKeys[j]]['Calls'][1]['markIV'] + +recreatedObj['binanceOptionsHistoryClose'][allDatesKeys[j]]['Puts'][1]['markIV']) / 2) * Math.sqrt(1/365))
                    askIVClose.push(((+recreatedObj['binanceOptionsHistoryClose'][allDatesKeys[j]]['Calls'][1]['askIV'] + +recreatedObj['binanceOptionsHistoryClose'][allDatesKeys[j]]['Puts'][1]['askIV']) / 2) * Math.sqrt(1/365))
                } else {
                    bidIVClose.push(0)
                    markIVClose.push(0)
                    askIVClose.push(0)
                }
            }
            
            setBidIVOpenBinance(bidIVOpen)
            setMarkIVOpenBinance(markIVOpen)
            setAskIVOpenBinance(askIVOpen)
            
            setBidIVCloseBinance(bidIVClose)
            setMarkIVCloseBinance(markIVClose)
            setAskIVCloseBinance(askIVClose)

            bidIVOpen = []
            bidIVClose = []
            markIVOpen = []
            markIVClose = []
            askIVOpen = []
            askIVClose = []

            for (let j = 0; j < datesArr.length; j++) {
                if (recreatedObj['bybitOptionsHistoryOpen'][allDatesKeys[j]]){
                    bidIVOpen.push(((+recreatedObj['bybitOptionsHistoryOpen'][allDatesKeys[j]]['Calls'][1]['bid1IV'] + +recreatedObj['bybitOptionsHistoryOpen'][allDatesKeys[j]]['Puts'][1]['bid1IV']) / 2) * Math.sqrt(1/365))
                    markIVOpen.push(((+recreatedObj['bybitOptionsHistoryOpen'][allDatesKeys[j]]['Calls'][1]['markIV'] + +recreatedObj['bybitOptionsHistoryOpen'][allDatesKeys[j]]['Puts'][1]['markIV']) / 2) * Math.sqrt(1/365))
                    askIVOpen.push(((+recreatedObj['bybitOptionsHistoryOpen'][allDatesKeys[j]]['Calls'][1]['ask1IV'] + +recreatedObj['bybitOptionsHistoryOpen'][allDatesKeys[j]]['Puts'][1]['ask1IV']) / 2) * Math.sqrt(1/365))
                } else {
                    bidIVOpen.push(0)
                    markIVOpen.push(0)
                    askIVOpen.push(0)
                }

                if (recreatedObj['bybitOptionsHistoryClose'][allDatesKeys[j]]){
                    bidIVClose.push(((+recreatedObj['bybitOptionsHistoryClose'][allDatesKeys[j]]['Calls'][1]['bid1IV'] + +recreatedObj['bybitOptionsHistoryClose'][allDatesKeys[j]]['Puts'][1]['bid1IV']) / 2) * Math.sqrt(1/365))
                    markIVClose.push(((+recreatedObj['bybitOptionsHistoryClose'][allDatesKeys[j]]['Calls'][1]['markIV'] + +recreatedObj['bybitOptionsHistoryClose'][allDatesKeys[j]]['Puts'][1]['markIV']) / 2) * Math.sqrt(1/365))
                    askIVClose.push(((+recreatedObj['bybitOptionsHistoryClose'][allDatesKeys[j]]['Calls'][1]['ask1IV'] + +recreatedObj['bybitOptionsHistoryClose'][allDatesKeys[j]]['Puts'][1]['ask1IV']) / 2) * Math.sqrt(1/365))
                } else {
                    bidIVClose.push(0)
                    markIVClose.push(0)
                    askIVClose.push(0)
                }
            }

            setBidIVOpenBybit(bidIVOpen)
            setMarkIVOpenBybit(markIVOpen)
            setAskIVOpenBybit(askIVOpen)
            
            setBidIVCloseBybit(bidIVClose)
            setMarkIVCloseBybit(markIVClose)
            setAskIVCloseBybit(askIVClose)


            let balanceDates = []
            let balance = []
            let binanceBalance = []
            let bybitBalance = []

            for (let i = 0; i < res.data['balanceHistory'].length; i++) {
                balanceDates.push(new Date(res.data['balanceHistory'][i]['date']).getTime())
                balance.push(res.data['balanceHistory'][i]['balance'])
                binanceBalance.push(res.data['balanceHistory'][i]['binanceBalance'])
                bybitBalance.push(res.data['balanceHistory'][i]['bybitBalance'])
            }

            setBalanceDates(balanceDates)
            setBalance(balance)
            setBinanceBalance(binanceBalance)
            setBybitBalance(bybitBalance)

            let positionsDates = []
            let positionsPercentage= []
            let binanceLongPositions = []
            let bybitShortPositions = []

            let initialDate = new Date(res.data['positionsHistory'][0]['date']).getTime()
            positionsDates.push(initialDate)

            let deltaDays = (new Date(res.data['positionsHistory'][res.data['positionsHistory'].length - 1]['date']).getTime() - positionsDates[0])/(24 * 60 * 60 * 1000)
            
            for (let i = 0; i < deltaDays; i++) {
                positionsDates.push(initialDate + (i + 1) * 24 * 60 * 60 * 1000)
            }

            const positionsObject = {}

            for (let i = 0; i < res.data['positionsHistory'].length; i++) {
                positionsObject[new Date(res.data['positionsHistory'][i]['date']).getTime()] = res.data['positionsHistory'][i]
            }

            for (let i = 0; i < positionsDates.length; i++) {
                if (!(positionsDates[i] in positionsObject)) {
                    positionsObject[positionsDates[i]] = 0
                }
            }

            for (let i = 0; i < positionsDates.length; i++) {
                if (positionsObject[positionsDates[i]]) {
                    if (positionsObject[positionsDates[i]]['platform'] === 'Binance') {
                        if (positionsObject[positionsDates[i]]['type'] === 'LONG') {
                            binanceLongPositions.push(positionsObject[positionsDates[i]]['profit$'])
                        }
                        bybitShortPositions.push(0)

                    } else if (positionsObject[positionsDates[i]]['platform'] === 'Bybit') {
                        if (positionsObject[positionsDates[i]]['type'] === 'SHORT') {
                            bybitShortPositions.push(positionsObject[positionsDates[i]]['profit$'])
                        }
                        binanceLongPositions.push(0)
                    }
                    positionsPercentage.push(positionsObject[positionsDates[i]]['profit%'] * 100)
                } else {
                    positionsPercentage.push(0)
                    binanceLongPositions.push(0)
                    bybitShortPositions.push(0)
                }
            }

            setPositionsDates(positionsDates)
            setPositionsPercentage(positionsPercentage)
            setBinanceLongPositions(binanceLongPositions)
            setBybitShortPositions(bybitShortPositions)
        })
        .catch(e => {
            console.log(e)
            setIsLoader(false)
        })
	}, [])

    return (
        <>{sessionResult ? (
            <div style={{marginBottom: '5em'}}>
            <div className='header'>
                <div className='analyticLabel'>
                    <h1>Analytics</h1>
                </div>
                <div className='navigation-analytics'>
                    <div>
                        <Link to={'/'}>
                            <button>Home Page</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/config'}>
                            <button>Config Page</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '2em'}}>
                <Box className='box'>
                    <LineChart
                        margin={{ top: 120 }}
                        className="chart"
                        slotProps={{
                            legend: {
                                labelStyle: {
                                    fill: 'white',
                                },
                                margin: {
                                    right: 100
                                }
                            }
                        }}
                        grid={{ vertical: true , horizontal: true }}
                        xAxis={[{
                            data: dates,
                            valueFormatter: valueFormatter,
                            min: dates[valueAnalytics[0]],
                            max: dates[valueAnalytics[1]],
                            label: 'Date',
                            
                        }]}
                        series={
                            arrayToShow
                        }
                        sx={{

                            "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                                stroke: "#ffffff",
                                strokeWidth: 1,
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                                stroke: "#ffffff",
                                strokeWidth: 1,
                            },
                            "& .MuiChartsAxis-left .MuiChartsAxis-tick":{
                                stroke: "#ffffff",
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-tick":{
                                stroke: '#ffffff'
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-label":{
                                fill: '#ffffff'
                            },
                            "& .MuiChartsAxis-left .MuiChartsAxis-label":{
                                fill: '#ffffff'
                            },
                            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                fill: '#ffffff',
                            },
                        }}                            
                    /> 
                    <Slider
                        className="slider"
                        value={valueAnalytics}
                        onChange={(event, newValue, activeThumb) => handleChange(event, newValue, activeThumb, setValueAnalytics, dates)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={dates.length - 1}
                        sx={{ mt: 2 }}
                    />   
                </Box>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="checkBoxes">
                    <div style={{ marginRight: '1em'}}>
                        <input type='checkbox' name='historicalVolatility' onChange={handleCheckboxChange} />
                        <label htmlFor='historicalVolatility' style={{color: '#00b4d8'}}>Historical Volatility</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='bidIVOpenBinance' onChange={handleCheckboxChange} />
                        <label htmlFor='bidIVOpenBinance' style={{color: '#38b000'}}>bidIV Open Binance</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='markIVOpenBinance' onChange={handleCheckboxChange} />
                        <label htmlFor='markIVOpenBinance' style={{color: 'yellow'}}>markIV Open Binance</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='askIVOpenBinance' onChange={handleCheckboxChange} />
                        <label htmlFor='askIVOpenBinance' style={{color: '#d00000'}}>askIV Open Binance</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='prediction' onChange={handleCheckboxChange} />
                        <label htmlFor='prediction' style={{color: '#ec0868'}}>Prediction</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='bidIVCloseBinance' onChange={handleCheckboxChange} />
                        <label htmlFor='bidIVCloseBinance' style={{color: '#38b000'}}>bidIV Close Binance</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='markIVCloseBinance' onChange={handleCheckboxChange} />
                        <label htmlFor='markIVCloseBinance' style={{color: 'yellow'}}>markIV Close Binance</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='askIVCloseBinance' onChange={handleCheckboxChange} />
                        <label htmlFor='askIVCloseBinance' style={{color: '#d00000'}}>askIV Close Binance</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='bidIVOpenBybit' onChange={handleCheckboxChange} />
                        <label htmlFor='bidIVOpenBybit' style={{color: '#38b000'}}>bidIV Open Bybit</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='markIVOpenBybit' onChange={handleCheckboxChange} />
                        <label htmlFor='markIVOpenBybit' style={{color: 'yellow'}}>markIV Open Bybit</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='askIVOpenBybit' onChange={handleCheckboxChange} />
                        <label htmlFor='askIVOpenBybit' style={{color: '#d00000'}}>askIV Open Bybit</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='bidIVCloseBybit' onChange={handleCheckboxChange} />
                        <label htmlFor='bidIVCloseBybit' style={{color: '#38b000'}}>bidIV Close Bybit</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='markIVCloseBybit' onChange={handleCheckboxChange} />
                        <label htmlFor='markIVCloseBybit' style={{color: 'yellow'}}>markIV Close Bybit</label>
                    </div>
                    <div style={{marginRight: '1em'}}>
                        <input type='checkbox' name='askIVCloseBybit' onChange={handleCheckboxChange} />
                        <label htmlFor='askIVCloseBybit' style={{color: '#d00000'}}>askIV Close Bybit</label>
                    </div>
                </div>
            </div>
            <h1 style={{textAlign: 'center', border: '1px solid white', paddingTop: '1em', paddingBottom: '1em'}}>Balances</h1>
            <div style={{marginTop: '3em'}}>
                <div style={{textAlign: 'center'}}>
                    <h2>General Balance</h2>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box  className='box'>
                    <LineChart
                        className="chart"
                        slotProps={{
                            grid: {
                                fill: 'white',
                            },
                            legend: {
                                labelStyle: {
                                    fill: 'white',
                                }
                            }
                        }}
                        grid={{ vertical: true , horizontal: true }}
                        xAxis={[{
                            data: balanceDates,
                            valueFormatter: valueFormatter,
                            min: balanceDates[valueBalance[0]],
                            max: balanceDates[valueBalance[1]],
                            label: 'Date',
                            
                        }]}
                        series={[
                            {
                                data: balance,
                                color: 'gold',
                                label: 'General Balance',
                            }
                        ]}
                        sx={{

                            "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                                stroke: "#ffffff",
                                strokeWidth: 1,
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                                stroke: "#ffffff",
                                strokeWidth: 1,
                            },
                            "& .MuiChartsAxis-left .MuiChartsAxis-tick":{
                                stroke: "#ffffff",
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-tick":{
                                stroke: '#ffffff'
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-label":{
                                fill: '#ffffff'
                            },
                            "& .MuiChartsAxis-left .MuiChartsAxis-label":{
                                fill: '#ffffff',
                            },
                            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                fill: '#ffffff',
                            },
                        }}                            
                    /> 
                    <Slider
                        className="slider"
                        value={valueBalance}
                        onChange={(event, newValue, activeThumb) => handleChange(event, newValue, activeThumb, setValueBalance, balanceDates)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={balanceDates.length - 1}
                        sx={{ mt: 2 }}
                    />   
                </Box>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h2>Binance Balance</h2>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box className='box'>
                    <LineChart
                        className="chart"
                        slotProps={{
                            legend: {
                                labelStyle: {
                                    fill: 'white',
                                }
                            }
                        }}
                        grid={{ vertical: true , horizontal: true }}
                        xAxis={[{
                            data: balanceDates,
                            valueFormatter: valueFormatter,
                            min: balanceDates[valueBinanceBalance[0]],
                            max: balanceDates[valueBinanceBalance[1]],
                            label: 'Date',
                            
                        }]}
                        series={[
                            {
                                data: binanceBalance,
                                color: 'gold',
                                label: 'Binance Balance'
                            }
                        ]}
                        sx={{

                            "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                                stroke: "#ffffff",
                                strokeWidth: 1,
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                                stroke: "#ffffff",
                                strokeWidth: 1,
                            },
                            "& .MuiChartsAxis-left .MuiChartsAxis-tick":{
                                stroke: "#ffffff",
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-tick":{
                                stroke: '#ffffff'
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-label":{
                                fill: '#ffffff'
                            },
                            "& .MuiChartsAxis-left .MuiChartsAxis-label":{
                                fill: '#ffffff'
                            },
                            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                fill: '#ffffff',
                            },
                        }}                            
                    /> 
                    <Slider
                        className="slider"
                        value={valueBinanceBalance}
                        onChange={(event, newValue, activeThumb) => handleChange(event, newValue, activeThumb, setValueBinanceBalance, balanceDates)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={balanceDates.length - 1}
                        sx={{ mt: 2 }}
                    />   
                </Box>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h2>Bybit Balance</h2>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10em'}}>
                    <Box className='box'>
                    <LineChart
                        className="chart"
                        slotProps={{
                            legend: {
                                labelStyle: {
                                    fill: 'white',
                                }
                            }
                        }}
                        grid={{ vertical: true , horizontal: true }}
                        xAxis={[{
                            data: balanceDates,
                            valueFormatter: valueFormatter,
                            min: balanceDates[valueBybitBalance[0]],
                            max: balanceDates[valueBybitBalance[1]],
                            label: 'Date',
                            
                        }]}
                        series={[
                            {
                                data: bybitBalance,
                                color: 'gold',
                                label: 'Bybit Balance'
                            }
                        ]}
                        sx={{

                            "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                                stroke: "#ffffff",
                                strokeWidth: 1,
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                                stroke: "#ffffff",
                                strokeWidth: 1,
                            },
                            "& .MuiChartsAxis-left .MuiChartsAxis-tick":{
                                stroke: "#ffffff",
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-tick":{
                                stroke: '#ffffff'
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-label":{
                                fill: '#ffffff'
                            },
                            "& .MuiChartsAxis-left .MuiChartsAxis-label":{
                                fill: '#ffffff'
                            },
                            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                fill: '#ffffff',
                            },
                        }}                            
                    /> 
                    <Slider
                        className="slider"
                        value={valueBybitBalance}
                        onChange={(event, newValue, activeThumb) => handleChange(event, newValue, activeThumb, setValueBybitBalance, balanceDates)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={balanceDates.length - 1}
                        sx={{ mt: 2 }}
                    />   
                </Box>
                </div>
            </div>
            <h1 style={{textAlign: 'center', border: '1px solid white', paddingTop: '1em', paddingBottom: '1em'}}>Positions History</h1>
            <div style={{marginTop: '3em'}}>
                <div style={{textAlign: 'center'}}>
                    <h2>General Positions History</h2>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box  className='box'>
                        <BarChart
                            className="chart"
                            slotProps={{
                                grid: {
                                    fill: 'white',
                                },
                                legend: {
                                    labelStyle: {
                                        fill: 'white',
                                    }
                                }
                            }}
                            grid={{ vertical: true , horizontal: true }}
                            xAxis={[{
                                scaleType: 'band',
                                data: positionsDates.slice(valuePositionsPercentage[0], valuePositionsPercentage[1] + 1),
                                valueFormatter: valueFormatter,
                                label: 'Date',
                            }]}
                            yAxis={[
                                {
                                    colorMap: {
                                        type: 'piecewise',
                                        thresholds: [0],
                                        colors: ['red', 'green']
                                    }
                                }
                            ]}
                            series={[
                                {
                                    data: positionsPercentage.slice(valuePositionsPercentage[0], valuePositionsPercentage[1] + 1),
                                    color: 'gold',
                                    label: 'Positions Profit %',
                                }
                            ]}
                            sx={{

                                "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                                    stroke: "#ffffff",
                                    strokeWidth: 1,
                                },
                                "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                                    stroke: "#ffffff",
                                    strokeWidth: 1,
                                },
                                "& .MuiChartsAxis-left .MuiChartsAxis-tick":{
                                    stroke: "#ffffff",
                                },
                                "& .MuiChartsAxis-bottom .MuiChartsAxis-tick":{
                                    stroke: '#ffffff'
                                },
                                "& .MuiChartsAxis-bottom .MuiChartsAxis-label":{
                                    fill: '#ffffff'
                                },
                                "& .MuiChartsAxis-left .MuiChartsAxis-label":{
                                    fill: '#ffffff',
                                },
                                "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                    fill: '#ffffff',
                                },
                            }}                            
                        /> 
                        <Slider
                            className="slider"
                            value={valuePositionsPercentage}
                            onChange={(event, newValue, activeThumb) => handleChange(event, newValue, activeThumb, setValuePositionsPercentage, positionsDates)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={positionsDates.length - 1}
                            sx={{ mt: 2 }}
                        />   
                    </Box>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h2>Binance LONG Positions History</h2>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box  className='box'>
                        <BarChart
                            className="chart"
                            slotProps={{
                                grid: {
                                    fill: 'white',
                                },
                                legend: {
                                    labelStyle: {
                                        fill: 'white',
                                    }
                                }
                            }}
                            grid={{ vertical: true , horizontal: true }}
                            xAxis={[{
                                scaleType: 'band',
                                data: positionsDates.slice(valueBinanceLongPositions[0], valueBinanceLongPositions[1] + 1),
                                valueFormatter: valueFormatter,
                                label: 'Date',
                                
                            }]}
                            yAxis={[
                                {
                                    colorMap: {
                                        type: 'piecewise',
                                        thresholds: [0],
                                        colors: ['red', 'green']
                                    }
                                }
                            ]}
                            series={[
                                {
                                    data: binanceLongPositions.slice(valueBinanceLongPositions[0], valueBinanceLongPositions[1] + 1),
                                    color: 'gold',
                                    label: 'Positions Profit $',
                                }
                            ]}
                            sx={{

                                "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                                    stroke: "#ffffff",
                                    strokeWidth: 1,
                                },
                                "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                                    stroke: "#ffffff",
                                    strokeWidth: 1,
                                },
                                "& .MuiChartsAxis-left .MuiChartsAxis-tick":{
                                    stroke: "#ffffff",
                                },
                                "& .MuiChartsAxis-bottom .MuiChartsAxis-tick":{
                                    stroke: '#ffffff'
                                },
                                "& .MuiChartsAxis-bottom .MuiChartsAxis-label":{
                                    fill: '#ffffff'
                                },
                                "& .MuiChartsAxis-left .MuiChartsAxis-label":{
                                    fill: '#ffffff',
                                },
                                "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                    fill: '#ffffff',
                                },
                            }}                            
                        /> 
                        <Slider
                            className="slider"
                            value={valueBinanceLongPositions}
                            onChange={(event, newValue, activeThumb) => handleChange(event, newValue, activeThumb, setValueBinanceLongPositions, positionsDates)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={positionsDates.length - 1}
                            sx={{ mt: 2 }}
                        />   
                    </Box>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h2>Bybit SHORT Positions History</h2>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box  className='box'>
                        <BarChart
                            className="chart"
                            slotProps={{
                                grid: {
                                    fill: 'white',
                                },
                                legend: {
                                    labelStyle: {
                                        fill: 'white',
                                    }
                                }
                            }}
                            grid={{ vertical: true , horizontal: true }}
                            xAxis={[{
                                scaleType: 'band',
                                data: positionsDates.slice(valueBybitShortPositions[0], valueBybitShortPositions[1] + 1),
                                valueFormatter: valueFormatter,
                                label: 'Date',
                                
                            }]}
                            yAxis={[
                                {
                                    colorMap: {
                                        type: 'piecewise',
                                        thresholds: [0],
                                        colors: ['red', 'green']
                                    }
                                }
                            ]}
                            series={[
                                {
                                    data: bybitShortPositions.slice(valueBybitShortPositions[0], valueBybitShortPositions[1] + 1),
                                    color: 'gold',
                                    label: 'Positions Profit $',
                                }
                            ]}
                            sx={{

                                "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                                    stroke: "#ffffff",
                                    strokeWidth: 1,
                                },
                                "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                                    stroke: "#ffffff",
                                    strokeWidth: 1,
                                },
                                "& .MuiChartsAxis-left .MuiChartsAxis-tick":{
                                    stroke: "#ffffff",
                                },
                                "& .MuiChartsAxis-bottom .MuiChartsAxis-tick":{
                                    stroke: '#ffffff'
                                },
                                "& .MuiChartsAxis-bottom .MuiChartsAxis-label":{
                                    fill: '#ffffff'
                                },
                                "& .MuiChartsAxis-left .MuiChartsAxis-label":{
                                    fill: '#ffffff',
                                },
                                "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                    fill: '#ffffff',
                                },
                            }}                            
                        />
                        <Slider
                            className="slider"
                            value={valueBybitShortPositions}
                            onChange={(event, newValue, activeThumb) => handleChange(event, newValue, activeThumb, setValueBybitShortPositions, positionsDates)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={positionsDates.length - 1}
                            sx={{ mt: 2 }}
                        />   
                    </Box>
                </div>
            </div>
        </div>
        ) : <VerificationNotPassed isLoader={isLoader}/>}</>
    )
}

export default Analytics
