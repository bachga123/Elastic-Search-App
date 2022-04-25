const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        nameIndex: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { collection: 'Index' },
    { timestamps: true }
)

/* userSchema.virtual('password')
    .set(function(password){
        this.hashPassword=bcrypt.hashSync(password,10)
    }) */
module.exports = mongoose.model('Index', userSchema)