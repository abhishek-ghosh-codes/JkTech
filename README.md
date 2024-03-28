# S3 Operations Project
This project allows users to perform various S3 operations seamlessly. Below are the key functionalities provided:

## Management ##

*SignUp*

Users can sign up and add themselves to the user list with different roles such as admin, root user, etc using addUser API.

*Bucket Operations*

1. Create Bucket: Users can create a new S3 bucket.
2. List Buckets: Users can retrieve the list of all buckets present in the server.

*Object Operations*

- Create Object: Users can upload a new object to an S3 bucket. If an object with the same name already exists, the new object will replace the existing one, similar to the behavior on the AWS platform.
- Retrieve Object: Users can access and retrieve specific objects from S3 buckets.
- Update Object: Users can update existing objects stored in S3 buckets.
- Delete Object: Users can delete objects from S3 buckets.
- By providing these functionalities, this project offers a comprehensive solution for managing S3 resources effectively.


## Installation Instructions

 *Clone this repo*
 
First, you have to create a database in Postgress and create a schema named 's3' and create 3 tables users, buckets, files.
query for creating these tables:
*1. users table*:

 
CREATE TABLE IF NOT EXISTS s3.users
(
   id integer NOT NULL DEFAULT nextval('s3.users_id_seq'::regclass),
   username character varying(255) COLLATE pg_catalog."default" NOT NULL,
   password character varying(255) COLLATE pg_catalog."default" NOT NULL,
   role character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT 'user'::character varying,
   CONSTRAINT users_pkey PRIMARY KEY (id),
   CONSTRAINT users_username_key UNIQUE (username)
)


 *2. buckets table* :
sh
CREATE TABLE IF NOT EXISTS s3.buckets
(
   id integer NOT NULL DEFAULT nextval('s3.buckets_id_seq'::regclass),
   name character varying(255) COLLATE pg_catalog."default" NOT NULL,
   user_id integer,
   CONSTRAINT buckets_pkey PRIMARY KEY (id),
   CONSTRAINT unique_name_constraint UNIQUE (name),
   CONSTRAINT buckets_user_id_fkey FOREIGN KEY (user_id)
   REFERENCES s3.users (id) MATCH SIMPLE
   ON UPDATE NO ACTION
   ON DELETE CASCADE
)

*3. files table*:
   

CREATE TABLE IF NOT EXISTS s3.files
(
   id integer NOT NULL DEFAULT nextval('s3.files_id_seq'::regclass),
   bucket_id integer,
   filename character varying(255) COLLATE pg_catalog."default" NOT NULL,
   url character varying(255) COLLATE pg_catalog."default" NOT NULL,
   CONSTRAINT files_pkey PRIMARY KEY (id),
   CONSTRAINT files_bucket_id_fkey FOREIGN KEY (bucket_id)
   REFERENCES s3.buckets (id) MATCH SIMPLE
   ON UPDATE NO ACTION
   ON DELETE CASCADE
)


 - npm i
 - npm start



## Usage ##

- Register the user using the addUser API to add them to the database and generate an authentication token..
- Use the generated token for authentication in all subsequent API requests, except for login and addUser.
- Create a new S3 bucket using the createBucket API.
     - Include required fields as specified in the Swagger and Postman collections.
     - Provide bucket_id and user_id obtained from the getUsers API..
-  Retrieve a list of buckets associated with the user via the getBucket API.
     - Information includes bucket_id, bucket_name, and user_id.
- Upload objects to a specific bucket using the addObject API.
     - Pass bucket_id and bucket_name as parameters.
     - Upload the desired object using the file form data.
     - Existing objects with the same name will be replaced.
- Retrieve objects within buckets using the getObject API.
    - Provide the bucket_id to retrieve associated objects.
- Read the contents of a specific object with the readObject API.
    - Specify the bucket_id and filename.
- Delete objects from a bucket using the delObject API.
    - Provide bucket_id and filename to delete the specified object.
- *Additional Notes:*
   - Utilize the provided Postman collection for testing functionalities, particularly for uploading files.
   - Users must log in using the /login API to access bucket and object operations if they have previously registered.
   - Authentication tokens are mandatory for all APIs except for login and addUser.

## SWAGGER URL
sh
     http://localhost:8000/swagger/api-docs/
     

*(Also I have mentioned all the steps in postman collections)*
