import express from "express";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    console.log("here");
    res.json({ status: 200, message: "Get data has succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

export default router;
