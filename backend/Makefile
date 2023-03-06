include .envrc

CONTAINER_NAME = library-postgres
IMAGE_NAME     = postgres:12-alpine

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

## run/api: run the cmd/api application in dev mode
.PHONY: run/api
run/api:
	yarn dev

## build/api: build the cmd/api application
.PHONY: build/api
build/api:
	@echo "Building cmd/api..."
	yarn build

# =========================================================================== #
# DEVELOPMENT
# =========================================================================== #

# Docker
# ------

## docker/postgres: create a new docker container
.PHONY: docker/postgres
docker/postgres:
	docker run --name ${CONTAINER_NAME} -p 5432:5432 -e POSTGRES_USER=${PGUSER} -e POSTGRES_PASSWORD=${PGPASSWORD} -d ${IMAGE_NAME}

## docker/createdb: create the database on the container
.PHONY: docker/createdb
docker/createdb:
	docker exec -it ${CONTAINER_NAME} createdb --username=${PGUSER} --owner=${PGUSER} ${PGDATABASE}

## docker/dropdb: drop the database on the container
.PHONY: docker/dropdb
docker/dropdb:
	docker exec -it ${CONTAINER_NAME} dropdb ${PGDATABASE}

# Database
# --------

## db/psql: connect to the database using psql
.PHONY: db/psql
db/psql:
	docker exec -it ${CONTAINER_NAME} psql -U ${PGUSER}

## db/migrations/new name=$1: create a new database migration
.PHONY: db/migrations/new
db/migrations/new:
	@echo "Creating migration files for ${name}..."
	migrate create -seq -ext=.sql -dir=./migrations ${name}

## db/migrations/up: apply all up database migrations
.PHONY: db/migrations/up
db/migrations/up: confirm
	@echo "Running up migrations..."
	@migrate -path migrations -database "postgresql://${PGUSER}:${PGPASSWORD}@localhost:5432/${PGDATABASE}?sslmode=disable" -verbose up

## db/migrations/down: apply all down database migrations
.PHONY: db/migrations/down
db/migrations/down:
	@migrate -path migrations -database "postgresql://${PGUSER}:${PGPASSWORD}@localhost:5432/${PGDATABASE}?sslmode=disable" -verbose down

## db/migrations/up1: apply all up database migrations
.PHONY: db/migrations/up1
db/migrations/up1: confirm
	@echo "Running up migration..."
	@migrate -path migrations -database "postgresql://${PGUSER}:${PGPASSWORD}@localhost:5432/${PGDATABASE}?sslmode=disable" -verbose up 1

## db/migrations/down: apply all down database migrations
.PHONY: db/migrations/down1
db/migrations/down1:
	@migrate -path migrations -database "postgresql://${PGUSER}:${PGPASSWORD}@localhost:5432/${PGDATABASE}?sslmode=disable" -verbose down 1

## db/pgtyped: run `yarn pgtyped`
.PHONY: db/pgtyped
db/pgtyped:
	@PGHOST=${PGHOST} PGUSER=${PGUSER} PGPASSWORD=${PGPASSWORD} PGDATABASE=${PGDATABASE} yarn pgtyped -c pgtyped.json

# =========================================================================== #
# QUALITY CONTROL
# =========================================================================== #

## format: run prettier
.PHONY: format
format:
	yarn format
