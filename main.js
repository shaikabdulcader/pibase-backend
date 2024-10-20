import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import supportRouter from "./src/support/controller.js"
import aboutRouter from "./src/about/aboutController.js"
import contactRouter from "./src/contact/contactControllers.js"
import careerRouter from "./src/career/careerControllers.js"
import footerRouter from "./src/footer/footerController.js"
import automateRouter from "./src/automate/automateControllers.js"
import faqRouter from "./src/faq/faqControllers.js"
import signupRouter from "./src/signup/signupControllers.js"
import testimonialsRouter from "./src/testimonials/testimonialsControllers.js"
import carousalRouter from "./src/carousal/carousalControllers.js"
import brandRouter from "./src/brand/brandControllers.js"
import integrationRouter from "./src/integration/integrationControllers.js"
import posbytzRouter from "./src/posbytz/posbytzControllers.js"
import iframeRouter from "./src/iframe/iframeControllers.js"
import featureRouter from "./src/feature/featureControllers.js"
import homeRouter from "./src/homepage/homeControllers.js"
import navbarRouter from "./src/navbar/navbarControllers.js"
const app = express();
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("DB is Connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}).catch((error) => console.log(error));


// data for parse json

app.use(express.json())

// CRUD Functionalities

app.use("/support", supportRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);
app.use("/career", careerRouter);
app.use("/footer", footerRouter);
app.use("/automate", automateRouter);
app.use("/faq", faqRouter);
app.use("/signup", signupRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/carousal", carousalRouter);
app.use("/brand", brandRouter);
app.use("/integration", integrationRouter);
app.use("/posbytz", posbytzRouter);
app.use("/iframe", iframeRouter);
app.use("/feature", featureRouter);
app.use("/home", homeRouter);
app.use("/navbar", navbarRouter);


