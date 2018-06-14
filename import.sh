#! /bin/bash
#import.sh

DBUSER="test"
DBPASS="test"
DBNAME="Hogwarts"
# Importing database
echo "mysql -u user_name -p password database < database.sql"
### mysql -u $dbuser -p$dbpass
echo "Pass: $DBPASS, User:$DBUSER, $DBNAME"

sleep 2

echo "Creating Hogwarts database"
SQL="CREATE DATABASE Hogwarts"

sleep 1
MYSQL="mysql"
echo "testing 1. 2. 3."
sleep 1
$MYSQL -u$DBUSER -p$DBPASS -e "$SQL"

if [ "$?" -eq 0 ];
then
	echo "Done."
else
	echo "----------------------------------------------"
	echo "You already have a database called 'Hogwarts'!"
fi

echo "importing Hogwarts.sql"
sleep 1
# Trying to import to Hogwarts database

echo "logging in"
sleep 1

echo "mysql -uDBUSER -pDBPASS"

$MYSQL -u$DBUSER -p$DBPASS Hogwarts < ./Hogwarts.sql


sleep 1

#mysql>USE Hogwarts;

#sleep 1


#mysql> SET autocommit=0; source ./Hogwarts.sql; COMMIT;

#sleep 1


#exit;

sleep 1

echo "Script finshed"

