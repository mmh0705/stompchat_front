"use client";

import { useState, useEffect } from "react";

type User = {
    id: number;
    name: string;
    city: string;
    street: string;
    zipcode: string;
}

export default function UsersClient(){
    const [users,  setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers(){
            try{
                const response = await fetch(
                    "http://localhost:8080/api/test/user",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        
                    }
                );

               
                if(!response.ok) throw new Error("Failed to fetch user");{
                    const data = await response.json();
                    console.log(data);
                    setUsers(data);
                }
            }
            catch(err){
                setError("Failed to fetch users");
                if(err instanceof Error){
                    setError("Failed to fetch users" + err.message);

                }
            }
            finally{
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>{error}</div>;

    return(
        <ul className="space-y-4 p-4">
            {
                users.map((user) => (
                    <li
                        key={user.id}
                        className="p-4 bg-white shadow-md rounded-lg text-gray-700"
                    >
                        {user.name} ({user.city})
                    </li>
                ))
            }
        </ul>
    );
}