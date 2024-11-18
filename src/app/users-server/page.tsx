type User = {
    id: number;
    name: string;
    city: string;
    street: string;
    zipcode: string;
}

export default async function UsersServer(){
    //await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch("http://localhost:8080/api/test/user");
    const users = await response.json();
    
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