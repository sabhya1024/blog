import mongoose, { Schema } from "mongoose";
let profile_imgs_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
];

let profile_imgs_collections_list = [
  "notionists-neutral",
  "adventurer-neutral",
  "fun-emoji",
];

// let profile_image_name_list = []

const userSchema = mongoose.Schema({
    personal_info: {
        fullname: {
            type: String,
            lowercase: true,
            required: true,
            minlength: [3, 'Fullname must be atleast 3 letters long'],
        },
        
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        }, 
        password: String,

        username: {
            type: String,
            minlength: [3, "Username must be atleast 3 characters long. "],
            unique:true,
        },

        bio: {
            type: String,
            default: "",
            maxlength:[200, "Bio should not exceed 200 characters. "]
        },

        profile_img: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ,
        }
    },

    
    social_links: {
        youtube: {
            type: String,
            default: "",
        },

        instagram: {
            type: String,
            default:"",
        },

        x: {
            type: String,
            default:"",
        },

        github: {
            type: String,
            default:""
        },

        website: {
            type: String, 
            default:""
        },
    },

    account_info: {
        total_posts: {
            type: Number,
            default:0,
        },

        total_reads: {
            type: Number,
            default:0,
        },

        followers: {
            type: Number,
            default:0,
        }
    },

    googleAuth: {
        type: Boolean,
        default:false,
    },

    blogs: {
        type: [Schema.Types.ObjectId],
        ref: "blogs",
        default:[],
    }

},
    {
        timestamps: {
            createdAt: 'joinedAt'
        }
    }
)

export default mongoose.model("users", userSchema);