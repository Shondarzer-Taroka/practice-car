"use client";
import React from 'react';
import { Button,Label, TextInput } from "flowbite-react";
import axios from 'axios';


const page = () => {

   async function handleSubmit(e) {
        e.preventDefault()
        let form=e.target
        let newUser={
            name:form.name.value,
            email:form.email.value,
            password:form.password.value,
            image:form.image.value
        }

    let res=await fetch('http://localhost:3000/signup/api',{
        method:'POST',
        body:JSON.stringify(newUser),
        headers:{
            'content-type':'application/json'
        }
    })

    console.log(res);
        
    }

    
    return (
        <div className='w-full'>
            <form className="flex max-w-md mx-auto mt-9 flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput id="email1" type="email" name='email' placeholder="name@flowbite.com" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="name" />
                    </div>
                    <TextInput id="name" name='name' type="text" placeholder="Asif Mahmud" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="image" value="image" />
                    </div>
                    <TextInput id="image" name='image' type="text"  />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput id="password1" name='password' type="password" required />
                </div>

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    );
};

export default page;