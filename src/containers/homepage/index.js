import ParityList from "./parity-list";
import Chart from "./chart";
import BetArea from "./bet-area";

const Homepage = () => {


    return (
        <div className="container">
            <div className="row">

                <ParityList/>
                <Chart/>
                <BetArea/>
            </div>
        </div>

    )

}

export default Homepage
