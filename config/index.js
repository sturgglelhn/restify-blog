module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 7711,
    URL: process.env.BASE_URL || 'http://localhost:7711',
    MONGODB_URL: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/HM-blog',

    JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}