'use client'
import React, { useState } from 'react';
import axios from 'axios';

type Journal = {
    title: string;
    text: string;
    id: string
}

function UpdateJournal({ title, text, id }: Journal) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentText, setCurrentText] = useState(text);
    const [message, setMessage] = useState('') // For displaying success or error messages


    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSubmitClick = async (e) => {
        e.preventDefault()
        setIsEditing(false)

        const updatedJournal = {
            title: currentTitle,
            text: currentText
        }
        try {
           const response = await axios.put(`/api/journal/${id}`, updatedJournal) 
           setMessage('Journal updated successfully')
           console.log('Response data :', response.data) 
            
        } catch (error: any) {
            console.error('Error updating the jorunal: ', error)
        }


        // Here you can handle the submission logic, like sending the updated data to an API.
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentText(e.target.value);
    }

    return (
        <div>
            {isEditing ? (
                <>
                    <input type="text" value={currentTitle} onChange={handleTitleChange} />
                    <textarea value={currentText} onChange={handleTextChange}></textarea>
                    <button onClick={handleSubmitClick}>Submit</button>
                </>
            ) : (
                <>
                    <h1>{currentTitle}</h1>
                    <p>{currentText}</p>
                    <button onClick={handleEditClick}>Update</button>
                </>
            )}
        </div>
    )
}

export default UpdateJournal;
