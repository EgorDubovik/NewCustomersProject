#!/bin/bash
container_name="laravel"
health_status=$(docker inspect --format='{{json .State.Health.Status}}' $container_name)

if [ "$health_status" == "\"unhealthy\"" ]; then
  echo "Container $container_name is unhealthy. Restarting..."
  docker restart $container_name
fi