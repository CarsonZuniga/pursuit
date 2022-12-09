class AppService {
    apiUrlEndPoint : string;
    
    constructor() {
        this.apiUrlEndPoint = "http://localhost:4080/";
    }

    createUser = async (userArr: [username:string, password_hash:string]) => {
        let request = {
            method: 'POST',
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(userArr)
        }
        let rawResponse = await fetch(this.apiUrlEndPoint + 'createUser', request);
        const data = await rawResponse.json();
        return new Promise((resolve) => { resolve(data) });
    }

    login = async (userArr: [username:string, password_hash:string]) => {
        let request = {
            method: 'POST',
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(userArr)
        }
        let rawResponse = await fetch(this.apiUrlEndPoint + 'login', request);
        const data = await rawResponse.json();
        return new Promise((resolve) => { resolve(data) });
    }
}

export default AppService;