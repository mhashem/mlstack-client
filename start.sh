#!/bin/sh
source /home/deployments/apps/client-vars

echo "********************************************************"
echo "Starting the Eureka Server"
echo "********************************************************"
sudo /usr/bin/java -Djava.security.egd=file:/dev/./urandom -jar /home/deployments/apps/client-0.0.1-SNAPSHOT.war
