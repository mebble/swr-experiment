import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';

const postsUrl = 'http://localhost:3000/posts';

const getPosts = url => {
    return fetch(url).then(res => res.json());
};

const postNewPost = async (url, newPost) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    const newPostResponse = await response.json();
    return newPostResponse;
};

const App = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const { data: posts, error } = useSWR(postsUrl, url => getPosts(url));

    const handleSubmit = (event) => {
        event.preventDefault();

        mutate(postsUrl, async posts => {
            const newPost = await postNewPost(postsUrl, { id: Math.random(), title, author });
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
                <label>
                    <input name="title" value={title} onChange={e => setTitle(e.target.value)} /> Title
                </label><br />
                <label>
                    <input name="author" value={author} onChange={e => setAuthor(e.target.value)} /> Author
                </label><br />
                <button type="submit">Add Post</button>
            </form>
        </div>
    );
};

export default App;
