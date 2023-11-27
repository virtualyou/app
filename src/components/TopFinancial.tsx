/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import FinancialService from "../services/financial.service.ts";
import AssetDisplay from "./display/AssetDisplay.tsx";
import DebtDisplay from "./display/DebtDisplay.tsx";
import {Button} from "react-bootstrap";
import {useState,useEffect} from "react";

const TopFinancial = () => {
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);

    useEffect(() => {
        FinancialService.getAssets()
            .then((response) => {
                setAssets(response.data);
            })
    }, [])

    useEffect(() => {
        FinancialService.getDebts()
            .then((response) => {
                setDebts(response.data);
            })
    }, [])

    if (!assets || !debts) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Financial</h1>
                <p>This is where we work with the financials.</p>

                <h3 className="font-weight-light">Assets <Button className="spacial-button" variant="primary">New</Button></h3>
                <AssetDisplay data={assets} />

                <h3 className="font-weight-light">Debts <Button className="spacial-button" variant="primary">New</Button></h3>
                <DebtDisplay data={debts} />
            </header>
        </div>
    );
};

export default TopFinancial;
