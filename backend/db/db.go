package db

import (
	"database/sql"

	_ "github.com/lib/pq"
)

func SetupAndGetDBConn(driverName, dataSourceName string) (*sql.DB, error) {
	dbConn, err := sql.Open(driverName, dataSourceName)
	if err != nil {
		return nil, err
	}

	err = dbConn.Ping()
	if err != nil {
		return nil, err
	}

	return dbConn, nil
}
