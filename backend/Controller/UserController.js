import User from "../Model/User.js";
import StudentProfile from "../Model/Student.js";
import TeacherProfile from "../Model/TeacherProfile.js";

/* ============================
   REGISTER CONTROLLER
============================ */
export const userRegisterController = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      role,
      institution,
      course,
      organization,
      qualification,
      specializations,
    } = req.body;

    if (!name || !username || !email || !password || !role) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email or username already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password, // ⚠️ hash later with bcrypt
      role,
    });

    const profilePicture = req.file ? req.file.path : null;

    // Create role-based profile
    if (role === "student") {
      await StudentProfile.create({
        user: user._id,
        institution,
        course,
        profilePicture,
      });
    }

    if (role === "teacher") {
      await TeacherProfile.create({
        user: user._id,
        organization,
        qualification,
        specializations: Array.isArray(specializations)
          ? specializations
          : specializations
          ? JSON.parse(specializations)
          : [],
        profilePicture,
      });
    }

    return res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
      role: user.role,
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* ============================
   LOGIN CONTROLLER
============================ */
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Store session
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        sentRequests:user.sentRequests,
        friends: user.friends,
        friendRequests:user.friendRequests
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* ============================
   GET ME CONTROLLER
============================ */
export const getMeController = async (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({
      isLoggedIn: false,
      message: "Not authenticated",
    });
  }

  const user = await User.findById(req.session.user.id).select("-password")

  return res.status(200).json({
    isLoggedIn: true,
    user:user
  });
};

/* ============================
   LOGOUT CONTROLLER
============================ */
export const userLogoutController = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("session", {
      httpOnly: true,
      path: "/",
    });
    res.json({
      message: "Logged out",
      isLoggedIn: false,
      user: null,
    });
  });
};

/* ============================
   GET USER DETAILS (ROLE-BASED)
============================ */
export const getUserDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let profile = null;

    if (user.role === "student") {
      profile = await StudentProfile
        .findOne({ user: id })
        
    }

    if (user.role === "teacher") {
      profile = await TeacherProfile
        .findOne({ user: id })
        
    }

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      message: "User details",
      user,
      profile,
    });

  } catch (error) {
    console.error("User details error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const getAllUsersController = async (req,res) => {
  try {
    const userID = req.session.user.id
    const users = await User.find({
      _id: { $ne: userID }
    }).select("-password")
    res.status(200).json({
      success:true,
      value:users,
      message:"Found Users"

    })
    
  } catch (error) {
    console.error("Getting ALl user Controller error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
export const sendRequestController = async (req,res)=>{
  try {
    const SenderId = req.session.user.id
    const {userid} = req.body
    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required"
      })
    }
    if(SenderId == userid){
      return res.status(400).json({
        message:"Your cant Send Request to Yourself",
        success:false
      })
    }
    const Sender = await User.findById(SenderId)
    

    const Reciever = await User.findById(userid)

    // ✅ ALREADY FRIEND CHECK (OPTIONAL BUT GOOD)
    if (Sender.friends.includes(userid)) {
      return res.status(400).json({
        success: false,
        message: "You are already friends"
      })
    }
    
     // ✅ ALREADY SENT CHECK
     if (Sender.sentRequests.includes(userid)) {
      return res.status(400).json({
        success: true,
        message: "Friend request already sent"
      })
    }
    else{
      Sender.sentRequests.push(userid)
      await Sender.save()
      Reciever.friendRequests.push(SenderId)
      await Reciever.save()
    }

    
    res.status(200).json({
      success:true,
      message:"Sent Request"
    })

  } catch (error) {
    console.error("send Request error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
export const AcceptReqController = async (req, res) => {
  try {
    const { friendId } = req.body
    const userId = req.session.user.id

    if (!friendId) {
      return res.status(400).json({
        success: false,
        message: "Friend ID required"
      })
    }

    const user = await User.findById(userId)
    const friend = await User.findById(friendId)

    if (!user || !friend) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    // ✅ ensure request exists
    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({
        success: false,
        message: "No friend request to accept"
      })
    }

    // ✅ remove requests
    user.friendRequests.pull(friendId)
    friend.sentRequests.pull(userId)

    // ✅ prevent duplicates
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId)
    }

    if (!friend.friends.includes(userId)) {
      friend.friends.push(userId)
    }

    await user.save()
    await friend.save()

    res.status(200).json({
      success: true,
      message: "Accepted Friend Request"
    })

  } catch (error) {
    console.error("Accept Request error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      err: error.message
    })
  }
}

export const RejectRequestController = async (req, res) => {
  try {
    const { friendId } = req.body
    const userId = req.session.user.id

    if (!friendId) {
      return res.status(400).json({
        success: false,
        message: "Friend ID is required",
      })
    }

    const user = await User.findById(userId)
    const friend = await User.findById(friendId)

    if (!user || !friend) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // 🔹 Remove request
    user.friendRequests.pull(friendId)
    friend.sentRequests.pull(userId)

    await user.save()
    await friend.save()

    return res.status(200).json({
      success: true,
      message: "Friend request rejected",
    })

  } catch (error) {
    console.error("Reject Request error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: error.message,
    })
  }
}
export const GetFrndsController = async (req, res) => {
  try {
    const userId = req.session?.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId)
      .select("friends")
      .populate("friends", "_id name username email role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Friends retrieved successfully",
      friends: user.friends,
    });

  } catch (error) {
    console.error("getFriendsController error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
