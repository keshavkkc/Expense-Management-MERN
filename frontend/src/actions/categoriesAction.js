import axios from "axios"

const token = localStorage.getItem("token")

export const startCreateCategories = (data, resetForm) => {
    return (dispatch) => {
        dispatch(isLoading())
        axios
            .post("http://localhost:3055/api/users/categories", data, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                dispatch(isLoading())
                const result = response.data
                if (result) {
                    alert("Successfullt Added Categories")
                    resetForm()
                }
            })
            .catch((err) => {
                isError(err.message)
            })
    }
}
export const startGetCategories = () => {
    return (dispatch) => {
        axios
            .get("http://localhost:3055/api/categories", {
                headers: {
                    Authorization: token,
                },
            })

            .then((response) => {
                // console.log(response.data)
                dispatch(listCategories(response.data))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startUpdateCategories = (id, data, handleEdit) => {
    return (dispatch) => {
        axios
            .put(`http://localhost:3055/api/users/categories/${id}`, data, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                // console.log(response.data)
                dispatch(updateCategories(response.data))
                handleEdit()
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startSoftDeleteCategories = (id) => {
    return (dispatch) => {
        axios
            .put(`http://localhost:3055/api/categories/${id}`, null, {
                headers: {
                    Authorization: token,
                }
            })
            .then((response) => {
                dispatch(softDeleteCategories(response.data))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
const softDeleteCategories = (data) => {
    return {
        type: 'SOFT_DELETE',
        payload: data
    }
}

const updateCategories = (data) => {
    return {
        type: 'UDPATE_CATEGORIES',
        payload: data
    }
}


const listCategories = (data) => {
    return {
        type: "LIST_CATEGORIES",
        payload: data,
    }
}

const isLoading = () => {
    return {
        type: "LOADING",
    }
}

const isError = (error) => {
    return {
        type: "ERROR",
        payload: error,
    }
}
