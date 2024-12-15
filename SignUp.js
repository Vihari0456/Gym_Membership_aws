import React, { useState } from 'react';

function SignUp() {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bucket_name", "gym-access-images");
        formData.append("file_name", image.name);
        formData.append("file", image);

        try {
            const response = await fetch("https://tz0bttd3sg.execute-api.us-east-1.amazonaws.com/dev/signup", {
                method: "POST",
                body: JSON.stringify({
                    bucket_name: "gym-access-images",
                    file_name: image.name,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Sign-Up Successful!");
            } else {
                setMessage(`Error: ${result.error}`);
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Upload Profile Picture:</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Sign Up</button>
            <p>{message}</p>
        </form>
    );
}

export default SignUp;
