const express = require("express");
const {
    createResouces,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource,
} = require("../controllers/resourceController");


const { auth, isAdmin } = require("../middleware/auth");

const router = express.Router();


router.post('/create', auth, isAdmin, createResouces);
router.get("/all", auth, getAllResources);
router.get("/byId/:id", auth, getResourceById);
router.put("/update/:id", auth, isAdmin, updateResource);
router.delete("/delete/:id", auth, isAdmin, deleteResource);

module.exports = router;
