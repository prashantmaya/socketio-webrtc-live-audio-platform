const router = require("express").Router();
const authController = require("./controllers/auth-controller.js");
const activateController = require("./controllers/activate-controller.js");
const roomsController = require("./controllers/rooms-controller.js");
const authMiddleware = require("./middlewares/auth-middleware.js");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", authMiddleware, activateController.activate);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", authMiddleware, authController.logout);
router.post("/api/rooms", authMiddleware, roomsController.create);
router.get("/api/rooms", authMiddleware, roomsController.index);
router.get("/api/rooms/:roomId", authMiddleware, roomsController.show);

module.exports = router;
