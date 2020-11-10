# useSWR experiment

## Development

Create a file `db.json` that'll serve as the database, with the contents:

```json
{
    "posts": [
        {
            "id": 1,
            "title": "Heyy",
            "author": "Someone"
        }
    ]
}
```

Run the REST API server

```
npm run dev:server
```

Run the client in a dev server

```
npm run dev:client
```

Open the app in `localhost:1234`
