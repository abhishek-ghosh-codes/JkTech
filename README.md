# S3 Operations Project
This project allows users to perform various S3 operations seamlessly. Below are the key functionalities provided:

-- User Management
     SignUp: Users can sign up and add themselves to the user list with different roles such as admin, root user, etc.
--Bucket Operations
     Create Bucket: Users can create a new S3 bucket.
     List Buckets: Users can retrieve the list of all buckets present in the server.
--Object Operations
     Create Object: Users can upload a new object to an S3 bucket. If an object with the same name already exists, the new object will replace the existing one, similar to the behavior on the AWS platform.
     Retrieve Object: Users can access and retrieve specific objects from S3 buckets.
     Update Object: Users can update existing objects stored in S3 buckets.
     Delete Object: Users have the ability to delete objects from S3 buckets.
     By providing these functionalities, this project offers a comprehensive solution for managing S3 resources effectively.

## Installation Instructions

 -- Clone this repo.
 -- first you have to create a database in postgress and create a schema named as 's3' and and create 3 tables users,buckets,files.
      query for creating these tables:
        users table: CREATE TABLE IF NOT EXISTS s3.users
                     (
                    id integer NOT NULL DEFAULT nextval('s3.users_id_seq'::regclass),
                    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
                    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
                    role character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT 'user'::character varying,
                    CONSTRAINT users_pkey PRIMARY KEY (id),
                    CONSTRAINT users_username_key UNIQUE (username)
                    )
        buckets table : CREATE TABLE IF NOT EXISTS s3.buckets
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
        files table  :CREATE TABLE IF NOT EXISTS s3.files
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
 -- npm i
 -- npm start



## Usage
--User has to use the addUser api to add himself/herself in users db.
--
