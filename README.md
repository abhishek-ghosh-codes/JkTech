S3 Operations Project
This project facilitates various S3 operations seamlessly. Below are the key functionalities provided:

User Management
Sign Up: Users can sign up and add themselves to the user list with different roles such as admin, root user, etc.
Bucket Operations
Create Bucket: Users can create a new S3 bucket.
List Buckets: Users can retrieve the list of all buckets present on the server.
Object Operations
Create Object: Users can upload a new object to an S3 bucket. If an object with the same name already exists, the new object will replace the existing one, similar to the behavior on the AWS platform.
Retrieve Object: Users can access and retrieve specific objects from S3 buckets.
Update Object: Users can update existing objects stored in S3 buckets.
Delete Object: Users have the ability to delete objects from S3 buckets.
By providing these functionalities, this project offers a comprehensive solution for managing S3 resources effectively.

Installation Instructions
Clone this repository.
Create a database in PostgreSQL and create a schema named 's3'. Within this schema, create 3 tables: users, buckets, and files. Use the following queries to create these tables:
sql
Copy code
CREATE TABLE IF NOT EXISTS s3.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS s3.buckets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER,
    CONSTRAINT unique_name_constraint UNIQUE (name),
    FOREIGN KEY (user_id) REFERENCES s3.users (id) ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS s3.files (
    id SERIAL PRIMARY KEY,
    bucket_id INTEGER,
    filename VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (bucket_id) REFERENCES s3.buckets (id) ON UPDATE NO ACTION ON DELETE CASCADE
);
Save to grepper
Run npm i to install dependencies.
Start the application with npm start.
Usage
Use the addUser API to add yourself to the users' database. After that, obtain an auth token.
Use the token for authentication for all other APIs except login and addUser APIs.
Create an S3 bucket using the createBucket API and provide the required fields. Retrieve the user_id using the getUsers API.
Check the bucket list using the getBucket API to get the bucket_id, bucket_name, and user_id.
Upload objects to the bucket using the addObject API. Use Postman collection to test file upload functionality.
If an object with the same name exists in the bucket, the new file will replace the older one.
Replace objects by uploading a file with the same name already present in the bucket.
Retrieve objects for each bucket using the getObject API and passing the bucket_id.
Access uploaded objects using the readObject API by passing the bucket_id and filename.
Delete objects from the bucket using the delObject API by passing the bucket_id and filename.
If you've already added yourself to the database and want to perform operations again, log in using the /login API with your username and password to generate a token. Use this token to access all other APIs for performing operations.
Swagger URL
Access the API documentation via Swagger URL. Postman collections also include all the steps.