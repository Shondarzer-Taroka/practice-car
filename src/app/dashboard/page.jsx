'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";


const MydataSaved = () => {
    let [data, setData] = useState([])
    let [loading, setLoading] = useState(true)
    let [toggle,setToggle]=useState(false)
    let session = useSession()
    console.log(data);

        useEffect(() => {
            setLoading(true)
            const getData = async () => {
                let result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/mycar/api/${session?.data?.user?.email}`)
                setData(result.data)
                setLoading(false)
            }
            getData()
        }, [session,toggle])
    
      function handleDelete(id) {
        axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/mycar/api/car-delete/${id}`)
        .then(res=> {
            console.log(res.data);
            setToggle(!toggle)
        })
        .catch(err=>{
            console.log(err);
            
        })
      }
      
    return (
     data.length>0 &&   <div>

            {loading ? <h1>loading</h1> : <div className="overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>Product name</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    {
                        data.map((car, index) => <Table.Body key={car._id} className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{index+1} Car</Table.Cell>
                                <Table.Cell>{car.title}</Table.Cell>
                                <Table.Cell>{car.price}</Table.Cell>
                                <Table.Cell>
                                    <div className='flex gap-2'>
                                        <Button color="success">Success</Button>
                                        <Button color="failure" onClick={()=>handleDelete(car._id)}>Delete</Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>

                        </Table.Body>)
                    }
                </Table>
            </div>}


        </div>
    );
};

export default MydataSaved;




















