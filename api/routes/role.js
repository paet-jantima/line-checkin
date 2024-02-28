const express = require("express");
const roleController = require("../controllers/role.controller.js");
const verifyToken = require("../utils/verifyToken.js");

const router = express.Router();

// Destructure controller functions
const { createRole, deleteRole, getAllRoles, updateRole } = roleController;
const { verifyAdmin } = verifyToken;

router.post('/create', /*verifyAdmin,*/ createRole);
router.put('/update/:id', /*verifyAdmin,*/ updateRole);
router.get('/getAll', getAllRoles);
router.delete('/deleteRole/:id', /*verifyAdmin,*/ deleteRole);

module.exports = router;
