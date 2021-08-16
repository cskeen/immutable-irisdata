# Immutable Iris Data Service

This project is a microservice that provides access to a continually growing data set about Irises, in the style of the classic Iris data set.

### Deployment Requirements

 * Redis
 * Docker or Kubernetes

### Local Build/Test Requirements

  * OpenJDK 11
  * Gradle
  * Docker
  * Postman if you want to perform an API test

### Build Instructions

1. Clone the Repository

2. Deploy redis either locally or in a network-accessible location.
    1. `./start-local-redis.sh` will start it locally
    2. Default Values:
       1. REDIS_HOST: "localhost"
       2. REDIS_PORT: "6379"
       3. REDIS_PASS: ""

3. Use gradle to bootRun the application
   1. `./gradlew bootRun`
   2. Configurable Env Variables:
      1. `REDIS_HOST` changes the hostname of the redis server
      2. `REDIS_PORT` changes the port number of the redis server
      3. `REDIS_PASS` changes the password of the redis server
   
4. Open Postman and load the `Testing Iris Data.postman_collection.json` collection included in this repository.

5. Send a PUT request to `http://[host]:8080/api/v1/irisdata/seed` to seed redis with the classic Iris database.

6. Enjoy

### Usage

* GET `/api/v1/irisdata/single?=[id]` returns a single Iris record by UUID
* GET `/api/v1/irisdata/all` returns all Iris records
* GET `/api/v1/irisdata/training` returns Iris records from the training partition of the data set
* GET `/api/v1/irisdata/validation` returns Iris records from the validation partition of the data set
* GET `/api/v1/irisdata/heartbeat` returns the current application status
* PUT `/api/v1/irisdata/single` creates a single new Iris record
* PUT `/api/v1/irisdata/multiple` creates multiple new Iris records at one time
* PUT `/api/v1/irisdata/seed` seeds the database with the classic Iris data set

The application will maintain an appropriate partitioning between training and validation data as new records are added.

### Schema & Data Example

    {
       "id": "7f53e509-fc2b-4a9b-befd-a2bb7f06ce1e",
       "sepalLength": "1.1",
       "sepalWidth": "1.2",
       "petalLength": "2.1",
       "petalWidth": "2.2",
       "irisClass": "Iris_Setosa"
       "trainingData": false
    }

`id` and `trainingData` are managed by the application automatically and do not need to be provided.