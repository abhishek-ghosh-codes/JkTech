import express from 'express';
import { CreateBucketService } from "./services/create-bucket-interface-service";
import { SelectBucketService } from './services/select-bucket-interface-service';
import { CreateObjectService } from './services/create-object-interface-service';
import { SelectObjectService } from './services/select-object-interface-service';
import { DeleteObjectService } from './services/delete-object-interface-service';
import { ReadObjectservice } from './services/read-object-interface-service';
import { LoginService } from './services/login-interface-service';
import { GetUserService } from './services/getUser-interface-service';
import { AddUserService } from './services/addUser-interface-service';
import { authHandler } from './services/auth-handler-service';
import multer from 'multer';
import cors from 'cors';
const loginService: LoginService = new LoginService();
const readObjectservice: ReadObjectservice = new ReadObjectservice();
const addUserService: AddUserService = new AddUserService();
const getUserService: GetUserService = new GetUserService();
const deleteObjectService: DeleteObjectService = new DeleteObjectService();
const createObjectService: CreateObjectService = new CreateObjectService();
const selectObjectService: SelectObjectService = new SelectObjectService();
const selectBucketService: SelectBucketService = new SelectBucketService();
const createBucketService: CreateBucketService = new CreateBucketService();
const swaggerUi = require('swagger-ui-express');
import { s3swagger } from './utils/s3-swagger';


export class App {
    public app;
    public upload: any;
    public storage: any;
    constructor() {
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
        this.app.post('/addUser', async (req, res) => {
            const headers = req.body 
            const result = await addUserService.insert(req, headers, {});
            res.send(result);
        })
        this.app.post('/Login', async (req, res) => {
            const headers = req.body 
            const result = await loginService.insert(req, headers, {});
            res.send(result);
        })

        this.app.use(async (req, _res, next) => {
            await authHandler(req.headers, (err, _data) => {
                if (err) {
                    next(err)
                } else {
                    next()
                }
            })

        })
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads'); 
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname); 
            }
        });
        this.upload = multer({ storage: this.storage });

    }

    public setupRoutes() {
        this.app.get('/getUser', async (req, res) => {
            const headers = req.query 
            const result = await getUserService.read(req, headers, {});
            res.json(result);
        })

        this.app.post('/createBucket', async (req, res) => {
            const headers = req.body 
            const result = await createBucketService.insert(req, headers, {});
            res.send(result);
        })
        this.app.get('/getBucket', async (req, res) => {
            const headers = req.query 
            const result = await selectBucketService.read(req, headers, {});
            res.send(result);
        })
        this.app.put('/addObject', this.upload.single('file'), async (req, res) => {
            const headers = req 
            const result = await createObjectService.insert(req, headers, {});
            res.send(result);
        })
        this.app.get('/getObject', async (req, res) => {
            const headers = req.query 
            const result = await selectObjectService.read(req, headers, {});
            res.send(result);
        })
        this.app.delete('/delObject', async (req, res) => {
            const headers = req.body 
            const result = await deleteObjectService.delete(req, headers, {});
            res.send(result);
        })
        this.app.post('/readObject', async (req, res) => {
            const headers = req.body 
            const result = await readObjectservice.read(req, headers, {});
            res.send(result);
        })
        this.app.listen(8000, () => {
            console.log("running app");
        })
    }

}

