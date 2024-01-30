#!/bin/bash
cd /tmp
wget https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.2.zip
unzip apache-jmeter-5.6.2.zip -d /opt
wget https://cioe.s3.amazonaws.com/marketing/LambdaConcurrencyLimits.jmx
sudo dnf install java -y
java -version
sudo dnf install httpd -y
systemctl start httpd
echo "<h1>Greetings AWS builders</h1>" > /var/www/html/index.html
sudo mkdir /var/www/html/stats
sudo chmod 777 -R /var/www/html/stats

# TODO Demás cosas que requieran instalar