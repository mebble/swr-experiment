import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';

const postsUrl = 'http://localhost:3000/posts';

const App = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const { data: posts, error } = useSWR(postsUrl, url => {
        return fetch(url).then(res => res.json())
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        mutate(postsUrl, async posts => {
            const response = await fetch(postsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: Math.random(), title, author })
            })
            const newPost = await response.json();
            return [...posts, newPost];
        });
    };

    if (error) return <p>Error!</p>;
    if (!posts) return <p>Loading...</p>;
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts?.map(post => (
                    <li key={post.id}>
                        <p>Title: {post.title}</p>
                        <p>Author: {post.author}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>Title: <input name="title" value={title} onChange={e => setTitle(e.target.value)} /></label><br />
                <label>Author: <input name="author" value={author} onChange={e => setAuthor(e.target.value)} /></label>
                <button type="submit">Add Post</button>
            </form>
        </div>
    );
};

export default App;
