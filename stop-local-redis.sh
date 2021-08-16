CONTAINER_NAME=redis

function stop_and_remove_local_container {
  docker container stop $1
  docker container rm $1
}

stop_and_remove_local_container $CONTAINER_NAME