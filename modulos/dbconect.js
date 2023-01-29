const {mongoose} = require('mongoose')

mongoose.connect("mongodb://root:root@localhost:6400/BDDTextil?authSource=admin",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))