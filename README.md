# Node Google Vision

Requires Node version `8.7.0` or higher.

### Install Dependencies
`npm install`

### Authenticate with Google Cloud Platform
add `.env` file:

```
GOOGLE_APPLICATION_CREDENTIALS="path-to-creds.json"
```
https://cloud.google.com/docs/authentication/getting-started?authuser=2

### Run app (local)
`npm run start-dev`

### Get image data

Visit `http://localhost:3000` to upload image.

Recieve JSON output at `http://localhost:3000/getImageData/[image-url]`.
