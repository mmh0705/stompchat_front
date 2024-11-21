import {requestGet} from "../apis/request";


type User = {
    id: number;
    name: string;
    city: string;
    street: string;
    zipcode: string;
}

export default async function UsersServer(){
    //await new Promise((resolve) => setTimeout(resolve, 2000));

    const users = await requestGet('/api/test/user');
    
    return (
        <ul className="space-y-4 p-4">
            {users.map((user: User) => (
                <li
                    key={user.id}
                    className="p-4 bg-white shadow-md rounded-lg text-gray-700"
                >
                    {user.name} ({user.city})
                </li>
            ))}
        </ul>
        
    );
}