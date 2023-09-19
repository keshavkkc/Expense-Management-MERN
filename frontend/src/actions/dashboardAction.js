import axios from "axios"

export const startGetInfo = () => {
    return (dispatch) => {
        axios.get('http://localhost:3055/api/dashboard', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                dispatch(getInfo(response.data))
            })
            .catch((err) => {
                alert(err.messge)
            })
    }
}

const getInfo = (data) => {
    return {
        type: 'GET_INFO',
        payload: data
    }
}