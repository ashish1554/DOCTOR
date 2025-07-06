import multer from "multer";

const storage=multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})


const upload=multer({storage})

//multer middleware to upload files
export default upload