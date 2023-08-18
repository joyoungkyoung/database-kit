import fs from "fs";
import {S3Client} from '@aws-sdk/client-s3'
import multer from "multer";
import multerS3 from "multer-s3";
import { configInfo } from "@config";
import path from "path";

const s3 = new S3Client({
    credentials: {
        accessKeyId:configInfo.S3_ACCESS_KEY_ID,
        secretAccessKey: configInfo.S3_SECRET_ACCESS_KEY 
    },
    region: "ap-northeast-2"
})

export const upload = multer({
    storage: multerS3({
        s3,
        bucket: configInfo.S3_BUCKER_NAME,
        acl: "public-read-write",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key(req, file, cb) {
            
            cb(null, `folder/${Date.now()}_${path.basename(file.originalname)}`); 
        },
        
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
