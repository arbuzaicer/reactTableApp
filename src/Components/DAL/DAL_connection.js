import axios from 'axios'

export const connection = {
    async getData(url) {
        const req = await axios.get(url, { headers: {'Content-Type': 'application/json'}})
            .then(res=>res.data);
        return req;
    }
};
