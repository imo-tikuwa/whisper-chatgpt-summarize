init:
	docker-compose up -d --build
	docker-compose exec app npm install

start:
	docker-compose start
stop:
	docker-compose stop
restart:
	docker-compose restart

app:
	docker-compose exec app bash

down:
	docker-compose down
down-all:
	docker-compose down --rmi all --volumes --remove-orphans
