package utils

import (
	"errors"
	"strings"
)

var ErrInvalidSortQuery = errors.New("invalid sort query")

// GetSortQuery validates a input given in query by comparing it with the valid
// inputs.
// The returned value is to be used in SQL query as ORDER BY string1 string2
// where string1 and string2 are the returned strings.
func GetSortQuery(input string, validInputs ...string) (string, string, error) {
	splits := strings.Split(input, "-")
	if len(splits) != 2 {
		return "", "", ErrInvalidSortQuery
	}

	for _, validInput := range validInputs {
		if splits[0] == validInput {
			if splits[1] != "asc" && splits[1] != "desc" {
				return "", "", ErrInvalidSortQuery
			}
			return splits[0], splits[1], nil
		}
	}

	return "", "", ErrInvalidSortQuery
}
