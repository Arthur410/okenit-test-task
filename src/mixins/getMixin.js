import axios from "axios";

export default function get(variableName, link) {
    variableName.splice(0, variableName.length)
    return axios.get(link).then(response => {
        for (let i = 0; i < response.data.length; i++) {
            variableName.push(response.data[i])
        }
    })
}

