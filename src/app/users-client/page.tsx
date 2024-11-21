"use client";

import { useState, useEffect } from "react";
import { requestGet } from '../apis/request';

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
                let userList = await requestGet('/api/test/user');

                if(userList !== null){
                    setUsers(userList);
                }
            }
            catch(err){
                setError("Failed to fetch users" + err);
                if(err instanceof Error){
                    setError("Failed to fetch users : " + err.message);

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