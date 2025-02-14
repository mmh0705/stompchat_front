const localUrl = 'localhost:8080';
const remoteUrl = '121.162.75.86:8080';

export const apiIP = remoteUrl;
export const apiUrl = 'http://' + apiIP;

export const requestGet = async(url:string):Promise<any> => {
    // const token = ""; //로컬 스토리지에서 가져와야함
    // //const UUID = ""; //로컬 스토리지에서 가져와야함
    try{
        const response = await fetch(
            apiUrl + url, 
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        const result = await response.json();
        
        if(!response.ok) throw new Error("Failed to fetch user"); {
            return result;
        }
    }
    catch(err){
        if(err instanceof Error){
            console.log(err.message);
            return  err.message;
        }else {
            return '에러발생';
        }
    }
}

export const requestPost = async (url:string, data:object):Promise<any>  => {
    try{
        const response = await fetch(
            apiUrl + url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
        );
        const result = await response.json();
        if(!response.ok) throw new Error("Failed to fetch user"); {
            return result;
        }
    }
    catch(err){
        if(err instanceof Error){
            console.log(err.message);
            return  err.message;
        }else {
            return '에러발생';
        }
    }
}
