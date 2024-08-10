import axios from "axios";
import CardCar from "./CardCar";


export const getData = async () => {
    let data = await axios.get(`http://localhost:3000/carstore/api`)
    return data.data
}

const Maycar = async () => {
    // const mycar=async()=>{
    //     return await getData()
    // }
    let cars = await getData() || []
    console.log(cars);

    return (
        <div>
            <h1>Cars</h1>
            {
                cars.length
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
                {
                    cars.length > 0 && cars.map((car, index) => <CardCar _id={car._id} title={car.title} price={car.price} image={car.image} key={car._id}></CardCar>)
                }
                {
                    cars.length == 0 && <h2>Not Found any car</h2>
                }
            </div>
        </div>
    );
};

export default Maycar;