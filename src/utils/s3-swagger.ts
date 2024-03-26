export const s3swagger={
    "swagger": "2.0",
    "info": {
      "description": "This is S3 Operations API",
      "version": "1.0.6",
      "title": "S3 API",
      "termsOfService": "http://swagger.io/terms/",
      "contact": {
        "email": "abhi.ghosh@gmail.com"
      },
      "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      }
    },
    "host": "localhost:8000",
    "basePath": "/",
    "schemes": ["http"],
    "securityDefinitions": {
        "BearerAuth": {
          "type": "apiKey",
          "name": "Authorization",
          "in": "header"
        }
      },
      "security": [
        {
          "BearerAuth": []
        }
      ],
    "paths": {
        "/login": {
            "post": {
              "tags": ["Login"],
              "summary": "LOGIN API",
              "description": "",
              "operationId": "CREATE",
              "produces": ["application/json"],
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "Insert New Users",
                  "required": true,
                  "schema": {
                    "$ref": "#/definitions/login"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "success response Payload structure",
                  "schema": {
                    "$ref": "#/definitions/ApiResponse"
                  }
                },
                "204": {
                  "description": "No content response",
                  "schema": {
                    "$ref": "#/definitions/ApiResponse-204"
                  }
                },
                "400": {
                  "description": "bad request payload response",
                  "schema": {
                    "$ref": "#/definitions/ApiResponse-400"
                  }
                },
                "401": {
                  "description": "unauthorized request payload",
                  "schema": {
                    "$ref": "#/definitions/ApiResponse-401"
                  }
                },
                "500": {
                  "description": "internal error"
                }
              }
            }
          },
      "/createBucket": {
        "post": {
          "tags": ["create Bucket"],
          "summary": "CREATE S3 BUCKET API",
          "description": "",
          "operationId": "CREATE",
          "produces": ["application/json"],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Create new Bucket in AWS",
              "required": true,
              "schema": {
                "$ref": "#/definitions/add-Bucket"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success response Payload structure",
              "schema": {
                "$ref": "#/definitions/ApiResponse"
              }
            },
            "204": {
              "description": "No content response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-204"
              }
            },
            "400": {
              "description": "bad request payload response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-400"
              }
            },
            "401": {
              "description": "unauthorized request payload",
              "schema": {
                "$ref": "#/definitions/ApiResponse-401"
              }
            },
            "500": {
              "description": "internal error"
            }
          }
        }
      },
      "/addUser": {
        "post": {
          "tags": ["add User Api"],
          "summary": "ADD API",
          "description": "",
          "operationId": "add",
          "produces": ["application/json"],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Add new User",
              "required": true,
              "schema": {
                "$ref": "#/definitions/add-User"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success response Payload structure",
              "schema": {
                "$ref": "#/definitions/ApiResponse"
              }
            },
            "204": {
              "description": "No content response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-204"
              }
            },
            "400": {
              "description": "bad request payload response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-400"
              }
            },
            "401": {
              "description": "unauthorized request payload",
              "schema": {
                "$ref": "#/definitions/ApiResponse-401"
              }
            },
            "500": {
              "description": "internal error"
            }
          }
        }
      },
      "/addObject": {
        "put": {
          "tags": ["add Object Api"],
          "summary": "ADD API",
          "description": "",
          "operationId": "add",
          "produces": ["application/json"],
          "consumes": ["multipart/form-data"],
          "parameters": [
            {
              "in": "query",
              "name": "bucket_id",
              "type": "string",
              "example":"12"
            },
            {
                "in": "query",
                "name": "bucket_name",
                "type": "string",
                "example":"s3-us-west-2"
            },
          ],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "file": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "success response Payload structure",
              "schema": {
                "$ref": "#/definitions/ApiResponse"
              }
            },
            "204": {
              "description": "No content response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-204"
              }
            },
            "400": {
              "description": "bad request payload response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-400"
              }
            },
            "401": {
              "description": "unauthorized request payload",
              "schema": {
                "$ref": "#/definitions/ApiResponse-401"
              }
            },
            "500": {
              "description": "internal error"
            }
          }
        }
      },
      "/readObject": {
        "post": {
          "tags": ["Read Object Api"],
          "summary": "Read Object ",
          "description": "",
          "operationId": "add",
          "produces": ["application/json"],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Read Object from S3",
              "required": true,
              "schema": {
                "$ref": "#/definitions/read-Object"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success response Payload structure",
              "schema": {
                "$ref": "#/definitions/ApiResponse"
              }
            },
            "204": {
              "description": "No content response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-204"
              }
            },
            "400": {
              "description": "bad request payload response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-400"
              }
            },
            "401": {
              "description": "unauthorized request payload",
              "schema": {
                "$ref": "#/definitions/ApiResponse-401"
              }
            },
            "500": {
              "description": "internal error"
            }
          }
        }
      },
      "/delObject": {
        "delete": {
          "tags": ["delete Object Api"],
          "summary": "delete API",
          "description": "",
          "operationId": "add",
          "produces": ["application/json"],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Read object from S3 Bucket",
              "required": true,
              "schema": {
                "$ref": "#/definitions/delete-object"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success response Payload structure",
              "schema": {
                "$ref": "#/definitions/ApiResponse"
              }
            },
            "204": {
              "description": "No content response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-204"
              }
            },
            "400": {
              "description": "bad request payload response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-400"
              }
            },
            "401": {
              "description": "unauthorized request payload",
              "schema": {
                "$ref": "#/definitions/ApiResponse-401"
              }
            },
            "500": {
              "description": "internal error"
            }
          }
        }
      },
      "/getUser": {
        "get": {
          "tags": ["get Users Api"],
          "summary": "GET USERS API",
          "description": "",
          "operationId": "read",
          "produces": ["application/json"],
          "responses": {
            "200": {
              "description": "success response Payload structure",
              "schema": {
                "$ref": "#/definitions/ApiResponse"
              }
            },
            "204": {
              "description": "No content response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-204"
              }
            },
            "400": {
              "description": "bad request payload response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-400"
              }
            },
            "401": {
              "description": "unauthorized request payload",
              "schema": {
                "$ref": "#/definitions/ApiResponse-401"
              }
            },
            "500": {
              "description": "internal error"
            }
          }
        }
      },
      "/getBucket": {
        "get": {
          "tags": ["get Bucket List Api"],
          "summary": "READ API",
          "description": "",
          "operationId": "read",
          "produces": ["application/json"],
          "responses": {
            "200": {
              "description": "success response Payload structure",
              "schema": {
                "$ref": "#/definitions/ApiResponse"
              }
            },
            "204": {
              "description": "No content response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-204"
              }
            },
            "400": {
              "description": "bad request payload response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-400"
              }
            },
            "401": {
              "description": "unauthorized request payload",
              "schema": {
                "$ref": "#/definitions/ApiResponse-401"
              }
            },
            "500": {
              "description": "internal error"
            }
          }
        }
      },
      "/getObject": {
        "get": {
          "tags": ["get object API"],
          "summary": "get object API",
          "description": "",
          "operationId": "read",
          "produces": ["application/json"],
          "parameters": [
            {
              "in": "query",
              "name": "bucket_id",
              "type": "string",
              "example":"3"
            },
          ],
          "responses": {
            "200": {
              "description": "success response Payload structure",
              "schema": {
                "$ref": "#/definitions/ApiResponse"
              }
            },
            "204": {
              "description": "No content response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-204"
              }
            },
            "400": {
              "description": "bad request payload response",
              "schema": {
                "$ref": "#/definitions/ApiResponse-400"
              }
            },
            "401": {
              "description": "unauthorized request payload",
              "schema": {
                "$ref": "#/definitions/ApiResponse-401"
              }
            },
            "500": {
              "description": "internal error"
            }
          }
        }
      },
  
    },
    "definitions": {
      "ApiResponse": {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer",
            "format": "int32",
            "example": 200
          },
          "headers": {
            "type": "object"
          },
          "body": {
            "type": "array",
            "items": {
              "type": "object"
            }
          }
        }
      },
      "ApiResponse-400": {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer",
            "format": "int32",
            "example": 400
          },
          "headers": {
            "type": "object"
          },
          "body": {
            "type": "array",
            "items": {
              "type": "object"
            }
          }
        }
      },
      "ApiResponse-204": {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer",
            "format": "int32",
            "example": 204
          },
          "headers": {
            "type": "object"
          },
          "message": {
            "type": "string",
            "example": "No Content"
          }
        }
      },
      "ApiResponse-401": {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer",
            "format": "int32",
            "example": 204
          },
          "headers": {
            "type": "object"
          },
          "message": {
            "type": "string",
            "example": "Access Denied"
          }
        }
      },
      "login": {
        "type": "object",
        "required": [
          "username",
          "password",
        ],
        "properties": {
          "username": {
            "type": "string",
            "example":"Omega"
          },
          "password": {
            "type": "string",
            "example":"Omega123"
          },
        }
      },
      "add-User": {
        "type": "object",
        "required": [
          "username",
          "password",
          "role"
        ],
        "properties": {
          "username": {
            "type": "string",
            "example":"Omega"
          },
          "password": {
            "type": "string",
            "example":"Omega123"
          },
          "role": {
            "type": "string",
            "example":"admin"
          }
        }
      },
      "add-Bucket": {
        "type": "object",
        "required": [
          "name",
          "user_id"
        ],
        "properties": {
          "name": {
            "type": "string",
            "example":"s3-us-west-2"
          },
          "user_id": {
            "type": "string",
            "example":"2"
          },
        }
      },
      "add-Object": {
        "type": "object",
        "format":"file",
        "required": [
          "bucket_id",
          "bucket_name",
          "filename",
          "fileContent"

        ],
        "properties": {
          "bucket_id": {
            "type": "int",
            "example":"3"
          },
          "bucket_name": {
            "type": "string",
            "example":"s3-us-west-2"
          },
          "filename": {
            "type": "string",
            "example":"test"
          },
          "fileContent": {
            "type": "string",
            "example":"Testing file"
          },
        }
      },
      "delete-object": {
        "type": "object",
        "required": [
         "bucket_id",
         "filename"
        ],
        "properties": {
          "bucket_id": {
            "type": "string",
            "example": "12"
          },
          "filename": {
            "type": "string",
            "example": "test123"
          }
        }
      },
      "read-Object": {
        "type": "object",
        "required": [
          "bucket_id",
          "filename"
        ],
        "properties": {
          "bucket_id": {
            "type": "int",
            "example":"3"
          },
          "filename": {
            "type": "string",
            "example":"test"
          }
        }
      },
    }
  }
