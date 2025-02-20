const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const captainSchema=mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'firstname must be atleast 3 characters long']
        },
        lastname:{
            type:String,
            minLength:[3,"lastname must be atleast 3 characters long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketID:{
        type:String
    }
    ,
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,"Color must be atleast 3 characters long"]
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,"Plate must be atleast 3 characters long"]
        },
        vehicleType:{
            type:String,
            enum:['Auto','Car','Motorcycle']
        },
        capacity:{
            type:Number,
            required:true,
            min:[2,"Capacity must be atleast more than 1"]
        }
          
    },
    location:{
        ltd: {
          type: Number
        },
        lng: {
          type: Number
        }
      }
});


captainSchema.methods.getAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}



module.exports=mongoose.model("Captain",captainSchema)