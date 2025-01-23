
const Resource = require("../models/Resources");

// Get all resources
exports.getAllResources = async (req, res) => {
    try {
      const resources = await Resource.find();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Error fetching resources", details: error.message });
    }
  };
  
  // Get a resource by ID
exports.getResourceById = async (req, res) => {
    try {
      const resource = await Resource.findById(req.params.id);
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: "Error fetching resource", details: error.message });
    }
  };
  
  // Update a resource by ID
// exports.updateResource = async (req, res) => {
//     try {
  
//       const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//        // runValidators: true, // Ensures validation rules are applied
//       });
  
//       if (!updatedResource) {
//         return res.status(404).json({ error: "Resource not found" });
//       }
  
//       res.json({ message: "Resource updated successfully", resource: updatedResource });
//     } catch (error) {
//       res.status(500).json({ error: "Error updating resource", details: error.message });
//     }
//   };
  
exports.updateResource = async (req, res) => {
  try {
   const {firstName,lastName,email,password,accountType}=req.body;
   const userId=req.params.Id;
  console.log(userId);
  console.log("req.body",req.body);
    const updatedResource = await Resource.findByIdAndUpdate(userId,{
      firstName:firstName,
      lastName:lastName,
      password:password,
      email:email,
      accountType:accountType,
    }, { new: true});

    if (!updatedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }
   console.log("resource updated successfully");
    res.json({ message: "Resource updated successfully", resource: updatedResource });
  } catch (error) {
    res.status(500).json({ error: "Error updating resource", details: error.message });
  }
};


  


  // Delete a resource by ID
exports.deleteResource = async (req, res) => {
    try {
      const deletedResource = await Resource.findByIdAndDelete(req.params.id);
  
      if (!deletedResource) {
        return res.status(404).json({ error: "Resource not found" });
      }
     console.log("resource deleted successfully");
      res.json({ message: "Resource deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting resource", details: error.message });
    }
  };
  



//   const createResource = async (req, res) => {
//     try {
//         const newResource = new Resource(req.body);
//         await newResource.save();
//         res.status(201).json(newResource);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };








exports.createResouces = async (req, res) => {

    try {
        // data fetch from req body
        const {
            firstName,
            lastName,
            email, password,
            accountType,
        } = req.body;
        // validate data

        if (!firstName || !lastName || !email || !password || !accountType) {
            return res.status(403).json({
                success: false,
                message: "All field requird",
            })
        }

// check user already exist or not
        const existingUser = await Resource.findOne({ email });
        if(existingUser)
        {
            return res.status(400).json({
                success: false,
                message: "user already exist "
            })
        }

    
        // hash password 
        //const hashedPassword = await bcrypt.hash(password, 10);



        // entry create in db
        const resource = await Resource.create({
            firstName,
            lastName,
            email,
            password,
            accountType,
        })


        // return res
        return res.status(200).json({
            success: true,
            message: "Resource created successfully",
            resource,
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Resources creation failed",  
        })
    }
}