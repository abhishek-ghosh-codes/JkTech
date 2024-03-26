export const addObjectRules = {
    'event.query.bucket_id': "required",
    'event.query.bucket_name': "required",
    'event.file': "required",
};
export const addUserRules = {
    'event.username': "required",
    'event.password': "required",
    'event.role': "required",
};
export const createBucketRules = {
    'event.name': "required",
    'event.user_id': "required"
};
export const deleteObjectRules = {
    'event.bucket_id': "required",
    'event.filename': "required"
};
export const getObjectRules = {
    'event.bucket_id': "required",
};
export const loginRules = {
    'event.username': "required",
    'event.password': "required"
};
export const readObjectRules = {
    'event.bucket_id': "required",
    'event.filename': "required",
};