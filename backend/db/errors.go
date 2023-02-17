package db

import (
	"database/sql"
	"errors"
	"fmt"
	"regexp"

	"github.com/lib/pq"
)

var (
	ErrUniqueViolation = errors.New("Already exists")
)

func DBError(err error) (error, *pq.Error) {
	if err == nil {
		return nil, nil
	}

	pqErr, ok := err.(*pq.Error)
	if !ok {
		return err, nil
	}

	switch pqErr.Code.Name() {
	case "unique_violation":
		return ErrUniqueViolation, pqErr
	default:
		return err, pqErr
	}
}

func DBErrorString(err error) any {
	dbErr, pqErr := DBError(err)
	if dbErr == nil {
		return ""
	}
	if pqErr == nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return "doesn't exist"
		default:
			return err.Error()
		}
	}

	switch {
	case errors.Is(dbErr, ErrUniqueViolation):
		detail := pqErr.Detail
		r, _ := regexp.Compile(`Key \((.*)\)=\((.*)\) (.*)`)
		submatches := r.FindStringSubmatch(detail)

		if len(submatches) == 4 {
			return map[string]string{submatches[1]: fmt.Sprintf("\"%s\" %s", submatches[2], submatches[3])}
		}
		return pqErr.Detail
	default:
		return pqErr.Detail
	}
}
