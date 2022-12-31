const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ConnectionSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hasRequested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    isConnection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

// I have two schemas here, one for the user and one for the connection
// I have a User schema that has an email, name, and password
// I have a connection schema that has a user id which is equal to the _id of a User
// I have a hasRequested array that has the _id of a User(s) that have requested to connect
// I have an isConnection array that has the _id of a User(s) that are connected