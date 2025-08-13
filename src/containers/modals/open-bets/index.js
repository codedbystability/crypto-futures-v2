import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Big from "big.js";
import OpenBetItem from "./item";
import Loading from "../../../components/loading";

const stringSort = ['code']

const OpenBets = () => {


    const {myBets} = useSelector(state => state.informationReducer)
    const {instruments} = useSelector(state => state.dataReducer)

    const {t} = useTranslation()

    const [openBets, setOpenBets] = useState([])
    const [uniques, setUniques] = useState([])
    const [sorted, setSorted] = useState([])
    const [total, setTotal] = useState("")
    const [sort, setSort] = useState("time")
    const [direction, setDirection] = useState("asc")
    const [ids, setIds] = useState([])
    const [loadings, setLoadings] = useState([])

    useEffect(() => {
        // console.log('myBets = ', myBets)
        setIds(myBets?.map(i => i.unique_id))
        const newUniques = [...new Set(myBets.map(item => item.code))]

        if (newUniques?.sort().join(',') !== uniques.sort().join(','))
            setUniques(newUniques)

        // setOpenBets(myBets)
        setOpenBets(
            myBets.map(
                iii => {
                    const itm = openBets?.find(li => li.unique_id === iii.unique_id && li.amount === iii.amount && li.tp === iii.tp && li.leverage === iii.leverage) || iii
                    // console.log('itm => ', itm)
                    return {
                        ...iii,
                        current: itm.current,
                        price_end: itm.price_end,
                        profit: itm.profit,
                        leverage: iii?.leverage,
                        volume: iii?.volume,
                        amount: iii?.amount,
                        price: iii?.price,
                        tp: itm.tp,
                        sl: itm.sl,
                    }
                }
            )
        )

    }, [myBets])

    useEffect(() => {
        uniques.map(symbol => window.globalDataSocket?.emit('join', 'P~' + symbol))

        window?.globalDataSocket?.on('p-update', e => {

            const updatedData = JSON.parse(e)
            // updatedData.b = Big(updatedData.a).plus(updatedData.b).div(2).toFixed(parseInt(updatedData.digit || 0))
            // updatedData.b = Big(updatedData?.b)?.toFixed(parseInt(updatedData?.digit || 0))
            const pp = instruments?.find(i => i.code === updatedData?.c)
            // const newB = Big(updatedData.b).plus((pp?.bs || 0) / Math.pow(10, updatedData.digit || 1)).toFixed(parseInt(updatedData.digit || 0))
            const newB = Big(updatedData?.b || 0)
                ?.plus((pp?.bs || 0) / Math.pow(10, parseInt(pp?.digits || 1)))
                // ?.plus((600) / Math.pow(10, parseInt(pp.digits || 1)))
                ?.toFixed(parseInt(pp?.digits || 0))

            const newA = Big(updatedData?.a || 0)
                ?.plus((pp?.as || 0) / Math.pow(10, parseInt(pp?.digits || 1)))
                // ?.plus((-600) / Math.pow(10, parseInt(pp.digits || 1)))
                ?.toFixed(parseInt(pp?.digits || 0))

            // if (updatedData.c === 'BCHUSDT') {
            //     // console.log('pp = ', pp)
            //     console.log({
            //         b: updatedData?.b,
            //         n: Big(updatedData?.b || 0)
            //             ?.plus((pp?.bs || 0) / Math.pow(10, parseInt(pp.digits || 1)))
            //             ?.toFixed(parseInt(pp?.digits || 0))
            //     })
            //
            // }

            setOpenBets(prevState => prevState.map(position => {
                return position.code === updatedData.c ? {
                    ...position,
                    price_end: position?.type === 'up' ?
                        Big(newB || 0).toFixed(parseInt(updatedData.digit || 0))
                        :
                        Big(newA || 0).toFixed(parseInt(updatedData.digit || 0)),

                    profit:
                        position?.type === 'up' ?
                            // Big(newB || 0).minus(position?.price || 0).times(position?.p_multiplier || 1)?.times(position?.volume || 0).minus(position?.commission||0)?.toFixed(2)
                            Big(newB || 0).minus(position?.price || 0).times(position?.p_multiplier || 1)?.times(position?.volume || 0)?.minus(position?.commission || 0).toFixed(2)
                            :
                            // Big(newA || 0).minus(position?.price || 0).times(position?.p_multiplier || 1)?.times(position?.volume || 0)?.minus(position?.commission||0)?.toFixed(2),
                            Big(newA || 0).minus(position?.price || 0).times(position?.p_multiplier || 1)?.times(position?.volume || 0)?.minus(position?.commission || 0)?.toFixed(2),

                    leverage: position?.leverage,
                    volume: position?.volume,
                    amount: position?.amount,
                    price: position?.price,
                } : position
            }))

        });
    }, [uniques, myBets, window?.globalDataSocket?.connected, instruments])


    useEffect(() => {

        if (stringSort?.includes(sort)) {
            setSorted(direction === 'asc' ? openBets?.sort((a, b) => a[sort].localeCompare(b[sort])) : openBets?.sort((a, b) => b[sort].localeCompare(a[sort])))
        } else
            setSorted(direction === 'asc' ? openBets?.sort((a, b) => b[sort] - a[sort]) : openBets?.sort((a, b) => a[sort] - b[sort]))
    }, [openBets, sort, direction])

    useEffect(() => {
        // console.log('openbets = , ', openBets)
        // if (openBets?.length >= 1)
        setTotal(openBets?.reduce(function (currentSum, currentNumber) {
            return (currentSum || 0) + parseFloat(currentNumber?.profit || 0)
        }, 0))


    }, [openBets])
    const handleSort = type => {
        if (type === sort)
            setDirection(prevState => prevState === 'asc' ? 'desc' : 'asc')

        setSort(type)
    }


    return (
        <div className="btable">
            {
                sorted?.length <= 0 ? <p>No Active Bet Found</p>
                    :
                    sorted?.map(bet => <OpenBetItem key={bet?.unique_id} bet={bet}/>)
            }
        </div>
    )

}
export default OpenBets
