export class Constant{
    static secretKey = `53a849027e3c993f37a41cabe6e46e89f13ba46e85814eaaca13bef772ead756`;
    static addUserQuery =`Insert into s3.users(username,password,role) values ($1,$2,$3)`;
    static getuserQuery =`select * from s3.users`;
    static addBucketQuery =`Insert into s3.buckets(name,user_id) values ($1,$2)`;
    static getBucketQuery = `select * from s3.buckets where user_id=$1`;
    static addObjectQuery =`Insert into s3.files(bucket_id,filename,url) values ($1,$2,$3)`;
    static getObjectQuery =`select * from s3.files where bucket_id=$1`;
    static deleteObjectQuery = `delete from s3.files where bucket_id=$1 and filename =$2`;
    static checkBucketQuery = `select * from s3.buckets where name = $1`;
    static checkUserQuery = `select * from s3.users where username = $1`;
    static checkObjectQuery = `select * from s3.files where filename = $1`;
    static readObjectQuery = `select url from s3.files where filename = $2 and bucket_id =$1`;
    static checkUserCredentialQuery = `select * from s3.users where username = $1 and password = $2`;
}