// import dependancies in the  router files
const express=require("express");
const router=express();
const bodyParser = require("body-parser");
const userControllers=require("../controllers/user_controllers");
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");



router.use('/uploads', express.static('./uploads'));
const filePath = path.join(__dirname, '/uploads');
router.set(path.join(__dirname, '/uploads'));
router.set("view engine","ejs");
router.set("views", path.join(__dirname, "views"));

//create middlewere
router.use(express.json());
//body parser using
router.use(bodyParser.urlencoded({ extended:false }));
router.use(bodyParser.json());

// create storage
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },

});

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ){
        callback(null,true)
    }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
    }

   },
   limits:{

    filesize:1000000 //1000000 bytes=1MB
   }
});



//import user controllers files here
router.post("/user/signup",userControllers.User_Signup);
router.post("/user/login",userControllers.User_Login);
router.post("/otp/verify",userControllers.verifyOtp );
router.post("/user/details",userControllers.adduserDetails);
/*router.post("/user/address",userControllers.UserLocationInsert_Method);
router.post("/user/address/update",userControllers.AddressUpdate );
router.get("/user/details/:_id",userControllers.GetUser_Details);
router.post("/user/notification",userControllers.UserNotificationApi );
router.get("/user/notification/list",userControllers.NotificationListApi);
router.post("/create/cart",userControllers.CreateCartApi );
router.post("/create/social/media/user_profile",upload.single('image'),userControllers.socialMedia_userProfile);
router.post("/social/media/follow/:id",userControllers.followerUser);
router.put("/social/media/unfollow/:id",userControllers.UnfollowerUser);
router.post("/user/post",upload.single('image'),userControllers.userPostMethod);
router.post("/like/:id",userControllers.likePost);
router.post("/unlike/:id",userControllers.unlikePost);
router.get("/like/count/:id",userControllers.userlikeCount);
router.put("/add/comments/:id",userControllers.AddComments);
router.delete("/delete/comments/:id",userControllers.deleteComments);
router.put("/likeandunlike/:id",userControllers.LikeAndunlikePost);
router.post("/otp",userControllers.Otp_generate);
*/


//import product controllers file here 
/*router.post("/product",upload.single('image'),productControllers.ProductMethod );
router.get("/product/list",productControllers.ProductList );
router.post("/product/order",productControllers.OrderProductMethod );
router.get("/festive/list",productControllers.FestiveNeedsList);
router.get("/fruits/list",productControllers.FruitsList);
router.get("/healthy/bites/list",productControllers.HealthyBitesList);
router.get("/microgreens/product/list",productControllers.MicrogreensProductList);
router.get("/millets_flour/product/list",productControllers.MilletsFlourProductList);
router.get("/sprouts/list",productControllers.SproutsList);
router.get("/travel_box/list",productControllers.TravelBoxList);
router.get("/vegetables/product/list",productControllers.VegetablesProductList);
router.get("/product/search/:key",productControllers.ProductSearchApi);
router.get("/order/product/history/:key",productControllers.OrderProductHistory);


*/
module.exports=router;