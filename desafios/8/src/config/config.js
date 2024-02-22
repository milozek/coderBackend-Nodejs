export default {
    port: process.env.PORT || 8080,
    mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce",
    cookieSecret: process.env.COOKIE_SECRET,
    githubAppId: process.env.GITHUB_APP_ID,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
}
