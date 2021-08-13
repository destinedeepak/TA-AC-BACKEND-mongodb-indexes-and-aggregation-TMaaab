
var userSchema = new Schema({
    name: {type: String},
    username:{type:String},
    email: {type: String},
    address: {
        country:{type: String},
        state:{type: String, unique: true},
        city:{type: String},
        pin:{type: Number},
    }
})
userSchema.index({email:1, username:1}, {unique: true})
userSchema.index({country: 1, state:1, city:1})

var articleSchema = new Schema({
    title: String,
    description: String,
    tags: [String]
})

articleSchema.index({tags:1});
articleSchema.index({ title: "text", description: "text" })

$group:{
    _id: "gender",
    avgAge:{$avg : "$age"}
}



