import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import associateServices from "../../../services";
import store from "../../../reducers/store";
import INFORMATION_CONSTANTS from "../../../constants/information";
import ClosedBetItem from "./item";
import Loading from "../../../components/loading";

const stringSort = ['code']
const ClosedBets = () => {


    const [data, setData] = useState([])
    const [sorted, setSorted] = useState([])
    const [sort, setSort] = useState("time_end")
    const [direction, setDirection] = useState("desc")
    const [loading, setLoading] = useState(true)

    const {instruments} = useSelector(state => state.dataReducer)

    const {t} = useTranslation()
    useEffect(() => {
        setLoading(true)
        associateServices.getFutureHistory({
            page: 1,
            limit: 100
        }).then(res => {
            setData(res?.data || [])
            setLoading(false)
        })
    }, [])


    useEffect(() => {

        if (stringSort?.includes(sort)) {
            setSorted(direction === 'asc' ? data?.sort((a, b) => a[sort].localeCompare(b[sort])) : data?.sort((a, b) => b[sort].localeCompare(a[sort])))
        } else
            setSorted(direction === 'asc' ? data?.sort((a, b) => b[sort] - a[sort]) : data?.sort((a, b) => a[sort] - b[sort]))
    }, [data, sort, direction])

    const handleSort = type => {
        if (type === sort)
            setDirection(prevState => prevState === 'asc' ? 'desc' : 'asc')

        setSort(type)
    }
    const handleClick = (theBet) => {
        const data = instruments?.find(i => i.code === theBet?.code)
        store.dispatch({type: INFORMATION_CONSTANTS.SET_PARITY, data})
    }


    return (
        <div className="btable">
            {
                loading ?
                    <Loading/> :
                    sorted?.map(bet => <ClosedBetItem key={bet?.unique_id} bet={bet}/>)
            }
        </div>
    )
}

export default ClosedBets
