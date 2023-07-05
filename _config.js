var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://dankip:@Sirdancun12@cluster0.ntf17ql.mongodb.net/gallery?retryWrites=true&w=majority',
    development: 'mongodb+srv://dankip:@Sirdancun12@cluster0.ntf17ql.mongodb.net/gallery-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://dankip:@Sirdancun12@cluster0.ntf17ql.mongodb.net/gallery-test?retryWrites=true&w=majority',
}
module.exports = config;
