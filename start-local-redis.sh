CONTAINER_NAME=redis
CONTAINER_IMAGE=bitnami/redis:latest
CONTAINER_PORT=6379

function start_local_redis_no_pass {
  docker run \
    -d \
    -p $CONTAINER_PORT:$CONTAINER_PORT \
    --name $CONTAINER_NAME \
    -e ALLOW_EMPTY_PASSWORD=yes \
    $CONTAINER_IMAGE
}

start_local_redis_no_pass