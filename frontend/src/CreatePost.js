import React from 'react'

const CreatePost = (props) => {

    return (
        <div>
            <form>
                <label> Post text: </label>
                <input type="text" />
                <label> Select Gif: </label>
                <select>
                    <option value="Select GIF"></option>
                </select>
            </form>
        </div>
    )
}

export default CreatePost