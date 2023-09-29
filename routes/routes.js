const express = require("express");
require("dotenv").config();

const router = express.Router();

router.post("/otp-request", async (req, res) => {
	const APP_ID = process.env.MSPACE_APP_ID;
	const PHONE_NO = process.env.MSPACE_PASSWORD;
	const PASSWORD = process.env.MSPACE_PHONE_NO;

	try {
		const url = "https://api.mspace.lk/otp/request";
		const payload = {
			applicationId: APP_ID,
			password: PASSWORD,
			subscriberId: "tel:" + PHONE_NO,
			action: req.body.action,
		};
		const response = await axios.post(url, payload);

		res.send(response.data);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
