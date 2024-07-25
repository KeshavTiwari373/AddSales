import { useState, useEffect } from "react"
import Axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TopSales = () => {

    const [topSales, setTopSales] = useState([]);

    useEffect(() => {
        // Use useEffect to fetch data when the component mounts
        Axios.get(`${API_BASE_URL}/topsales`,)
            .then((response) => {
                // Assuming response.data contains the array of top sales
                setTopSales(response.data);
            })
            .catch((error) => {
                console.error("Error fetching top sales:", error);
                // Handle error
            });
    }, []);


    return (
        // using row col to show data
        <div className="container">
            <h3 className="text-center mt-4">TOP 5 SALES</h3>
            <div className="row mt-4">
                <div className="col"><h5>#</h5></div>
                <div className="col"><h5>Sales Id:</h5></div>
                <div className="col"><h5>Product Name</h5></div>
                <div className="col"><h5>Quantity</h5></div>
                <div className="col"><h5>Sale Amount</h5></div>
            </div>
            <hr style={{ height: '1px', backgroundColor: '#000000' }}></hr>
            {topSales.length === 0? "No data entered" : topSales.map((sale, index) => (
                <>
                    <div className="row" key={index}>
                        <div className="col"><h5>{index + 1}</h5></div>
                        <div className="col"><p>S|3{sale.quantity}</p></div>
                        <div className="col"><p>{sale.productName}</p></div>
                        <div className="col"><p>{sale.quantity}</p></div>
                        <div className="col"><p>{sale.amount}</p></div>
                    </div>
                    <hr />
                </>
            ))}
        </div>
    )
}

export default TopSales