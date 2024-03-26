import express from 'express';
import { CreateBucketService } from "./services/create-bucket-interface-service";
import { SelectBucketService } from './services/select-bucket-interface-service';
import { CreateObjectService } from './services/create-object-interface-service';
import { SelectObjectService } from './services/select-object-interface-service';
import { DeleteObjectService } from './services/delete-object-interface-service';
import { ReadObjectservice} from './services/read-object-interface-service';
import { LoginService } from './services/login-interface-service';
import {GetUserService} from './services/getUser-interface-service';
import { AddUserService } from './services/addUser-interface-service';
import { authHandler } from './services/auth-handler-service';
import multer from 'multer';
import * as path from 'path';
import cors from 'cors';
const loginService:LoginService = new LoginService();
const readObjectservice:ReadObjectservice = new ReadObjectservice();
const addUserService:AddUserService = new AddUserService();
const getUserService:GetUserService = new GetUserService();
const deleteObjectService:DeleteObjectService = new DeleteObjectService();
const createObjectService:CreateObjectService = new CreateObjectService();
const selectObjectService:SelectObjectService = new SelectObjectService();
const selectBucketService:SelectBucketService = new SelectBucketService();
const createBucketService:CreateBucketService = new CreateBucketService();
const swaggerUi = require('swagger-ui-express');
import { s3swagger } from './utils/s3-swagger';

const allowOriginValue = "*";
export class App{
    public app;
    public upload:any;
    public storage:any;
    constructor(){
        this.app = express();
        this.config();
        this.setupRoutes();
    }
    private config() {
        this.app.use(express.json({ limit: '200mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/swagger/api-docs', swaggerUi.serve, (_req, res) => {
            const html = swaggerUi.generateHTML(s3swagger);
            res.send(html);
        });
        this.app.use(cors());
        this.app.post('/addUser',async (req,res)=>{
            const headers = req.body //For get Method, we need to fetch parameters from Query not params
            console.info(headers);

            const result = await addUserService.insert(req, headers, {});
            console.log('result',result);
            res.send(result);
        })
        this.app.post('/Login',async (req,res)=>{
            const headers = req.body //For get Method, we need to fetch parameters from Query not params
            console.info(headers);

            const result = await loginService.insert(req, headers, {});
            console.log('result',result);
            res.send(result);
        })

        this.app.use(async (req, _res, next) => {
            await authHandler(req.headers, (err, _data) => {
                if (err) {
                    //    res.json({message:err.message})
                    next(err)
                } else {
                    next()
                }
            })
      
        })
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './uploads'); // Save files to the 'uploads' directory
            },
            filename: function (req, file, cb) {
               console.log('inside file ', file.originalname);
              cb(null,file.originalname); // Set the original extension
            }
          });
           this.upload = multer({ storage: this.storage });
        
      }
    
    public setupRoutes(){
        this.app.get('/getUser',async (req,res)=>{
            const headers = req.query //For get Method, we need to fetch parameters from Query not params
            
            console.info('123',req.query);

            const result = await getUserService.read(req, headers, {});
            console.log('result123',result);
            res.json(result);
        })
      
        this.app.post('/createBucket',async (req,res)=>{
            const headers = req.body //For get Method, we need to fetch parameters from Query not params
            console.info(headers);

            const result = await createBucketService.insert(req, headers, {});
            console.log('result',result);
            res.send(result);
        })
        this.app.get('/getBucket',async (req,res)=>{
            const headers = req.query //For get Method, we need to fetch parameters from Query not params
            console.info(headers);

            const result = await selectBucketService.read(req, headers, {});
            console.log('result',result);
            res.send(result);
        })
        this.app.put('/addObject',this.upload.single('file'),async (req,res)=>{
            const headers = req //For get Method, we need to fetch parameters from Query not params
            console.log(req.query)
            console.log(req.file);
            const result = await createObjectService.insert(req, headers, {});
            console.log('result',result);
            res.send(result);
        })
        this.app.get('/getObject',async (req,res)=>{
            const headers = req.query //For get Method, we need to fetch parameters from Query not params
            console.info(headers);

            const result = await selectObjectService.read(req, headers, {});
            console.log('result',result);
            res.send(result);
        })
        this.app.delete('/delObject',async (req,res)=>{
            const headers = req.body //For get Method, we need to fetch parameters from Query not params
            console.info(headers);

            const result = await deleteObjectService.delete(req, headers, {});
            console.log('result',result);
            res.send(result);
        })
        this.app.post('/readObject',async (req,res)=>{
            const headers = req.body //For get Method, we need to fetch parameters from Query not params
            console.info(headers);

            const result = await readObjectservice.read(req, headers, {});
            console.log('result',result);
            res.send(result);
        })
        


        this.app.listen(8000,()=>{
            console.log("running app");
        })
    }
    
}

