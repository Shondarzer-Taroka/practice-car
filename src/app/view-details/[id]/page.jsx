// 'use client'
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';


// const DetailsPage = ({ params }) => {
//     let [cardata, setCarData] = useState({})
//     let [loading, setLoading] = useState(true)
//     let session = useSession()

//     useEffect(() => {
//         setLoading(true)
//         const getData = async (id) => {

//             let result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/view-details/api/${params.id}`)
//             setCarData(result.data)
//             setLoading(false)
//         }
//         getData()
//         console.log(cardata);
        
//     }, [])
//     // console.log(title);
//     const savecar = async () => {
//         let result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/carstore/savecar/api`, { ...cardata, email: session.data?.user?.email, name: session.data?.user?.name, profile: session.data?.user?.image, })
//         console.log(result.data);
//         return result.data
//     }
//     console.log(session);
    
//     return (
//         <>
//             {loading ? <h2>loading.....</h2>
//                 : <div>

//                     <div>
//                         <Image alt={cardata} width={500} height={300} src={cardata.image} />
//                     </div>

//                     <p>title:{cardata.title}</p>
//                     <p>price:{cardata.price}</p><br />
//                     <button className='bg-red-400 px-4 py-2 rounded-xl' onClick={savecar}> Add to cart </button>
//                 </div>
//             }
//         </>);
// };

// export default DetailsPage;










'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const DetailsPage = ({ params }) => {
    const [cardata, setCarData] = useState({});
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        const getData = async (id) => {
            try {
                setLoading(true);
                const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/view-details/api/${id}`);
                setCarData(result.data);
            } catch (error) {
                console.error('Error fetching car data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            getData(params.id);
        }
    }, [params.id]);

    const savecar = async () => {
        try {
            if (!session) {
                alert('You need to be logged in to save this car.');
                return;
            }

            const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/carstore/savecar/api`, { 
                image:cardata.image, 
                title:cardata.title, 
                price:cardata.price, 
                email: session.user?.email, 
                name: session.user?.name, 
                profile: session.user?.image 
            });

            console.log(result.data);
        } catch (error) {
            console.error('Error saving car:', error);
        }
    };

    return (
        <>
            {loading ? <h2>Loading.....</h2> :
                <div>
                    <div>
                        {cardata.image && (
                            <Image alt={cardata.title} width={500} height={300} src={cardata.image} />
                        )}
                    </div>
                    <p>Title: {cardata.title}</p>
                    <p>Price: {cardata.price}</p><br />
                    <button className='bg-red-400 px-4 py-2 rounded-xl' onClick={savecar}> Add to cart </button>
                </div>
            }
        </>
    );
};

export default DetailsPage;
