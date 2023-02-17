include .envrc

CONTAINER_NAME = library-postgres
IMAGE_NAME     = postgres:12-alpine
DB_NAME        = library

# =========================================================================== #
# HELPERS
# =========================================================================== #

## help: print this help message
.PHONY: help
help:
	@echo "Usage:"
	@sed -n "s/^##//p" ${MAKEFILE_LIST} | column -t -s ":" | sed -e "s/^/ /"

.PHONY: confirm
confirm:
	@echo -n "Are you sure? [y/N] " && read ans && [ $${ans:-N} = y ]

# =========================================================================== #
# RUN AND BUILD
# =========================================================================== #

## run/api: run the cmd/api application
.PHONY: run/api
run/api:
	@go run .

## air/api: run the cmd/api application
.PHONY: air/api
air/api:
	@air

## build/api: build the cmd/api application
.PHONY: build/api
build/api:
	@echo "Building cmd/api..."
	go build -ldflags="-s" -o=./bin/api
	GOOS=linux GOARCH=amd64 go build -ldflags="-s" -o=./bin/linux_amd64/api

# =========================================================================== #
# DEVELOPMENT
# =========================================================================== #

# Docker
# ------

## docker/postgres: create a new docker container
.PHONY: docker/postgres
docker/postgres:
	docker run --name ${CONTAINER_NAME} -p 5432:5432 -e POSTGRES_USER=${POSTGRES_USER} -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} -d ${IMAGE_NAME}

## docker/createdb: create the database on the container
.PHONY: docker/createdb
docker/createdb:
	docker exec -it ${CONTAINER_NAME} createdb --username=${POSTGRES_USER} --owner=${POSTGRES_USER} ${DB_NAME}

## docker/dropdb: drop the database on the container
.PHONY: docker/dropdb
docker/dropdb:
	docker exec -it ${CONTAINER_NAME} dropdb ${DB_NAME}

# Database
# --------

## db/psql: connect to the database using psql
.PHONY: db/psql
db/psql:
	docker exec -it ${CONTAINER_NAME} psql -U ${POSTGRES_USER}

## db/migrations/new name=$1: create a new database migration
.PHONY: db/migrations/new
db/migrations/new:
	@echo "Creating migration files for ${name}..."
	migrate create -seq -ext=.sql -dir=./db/migration ${name}

## db/migrations/up: apply all up database migrations
.PHONY: db/migrations/up
db/migrations/up: confirm
	@echo "Running up migrations..."
	@migrate -path db/migration -database "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${DB_NAME}?sslmode=disable" -verbose up

## db/migrations/down: apply all down database migrations
.PHONY: db/migrations/down
db/migrations/down:
	@migrate -path db/migration -database "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${DB_NAME}?sslmode=disable" -verbose down

## db/migrations/up1: apply all up database migrations
.PHONY: db/migrations/up1
db/migrations/up1: confirm
	@echo "Running up migration..."
	@migrate -path db/migration -database "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${DB_NAME}?sslmode=disable" -verbose up 1

## db/migrations/down: apply all down database migrations
.PHONY: db/migrations/down1
db/migrations/down1:
	@migrate -path db/migration -database "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${DB_NAME}?sslmode=disable" -verbose down 1

## db/sqlc: run `sqlc generate`
.PHONY: db/sqlc
db/sqlc:
	sqlc generate

# =========================================================================== #
# QUALITY CONTROL
# =========================================================================== #

## test: run golang tests
.PHONY: test
test:
	go test -v -cover ./...
