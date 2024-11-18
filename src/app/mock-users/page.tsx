type MockUser = {
    id: number;
    name: string;
    city: string;
    street: string;
    zipcode: string;
}

export default async function MockUsers(){
    const response = await fetch("http://localhost:8080/api/test/user");
    const users = await response.json();

    return(
        <div className="grid grid-cols-4 gap-4 py-10 p-4">
            {
                users.map((user: MockUser) => (
                    <div 
                        key={user.id}
                        className="bg-white shadow-md rounded-lg p-4 text-gray-700"
                    >
                        {user.name}
                    </div>
                ))
            }
        </div>
    );
}