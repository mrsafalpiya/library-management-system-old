package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
)

type Envelope map[string]any

func RequestJSON(r *http.Request, dst any) error {
	err := json.NewDecoder(r.Body).Decode(&dst)
	if err != nil {
		var syntaxError *json.SyntaxError
		var unmarshalTypeError *json.UnmarshalTypeError
		var invalidUnmarshalError *json.InvalidUnmarshalError
		var maxBytesError *http.MaxBytesError

		switch {
		case errors.As(err, &syntaxError):
			return fmt.Errorf("body contains badly-formed JSON (at character %d)", syntaxError.Offset)
		case errors.Is(err, io.ErrUnexpectedEOF):
			return errors.New("body contains badly-formed JSON")
		case errors.As(err, &unmarshalTypeError):
			if unmarshalTypeError.Field != "" {
				return fmt.Errorf("body contains incorrect JSON type for field %q", unmarshalTypeError.Field)
			}
			return fmt.Errorf("body contains incorrect JSON type (at character %d)", unmarshalTypeError.Offset)
		case errors.Is(err, io.EOF):
			return errors.New("body must not be empty")
		case strings.HasPrefix(err.Error(), "json: unknown field "):
			fieldName := strings.TrimPrefix(err.Error(), "json: unknown field ")
			return fmt.Errorf("body contains unknown key %s", fieldName)
		case errors.As(err, &maxBytesError):
			return fmt.Errorf("body must not be larger than %d bytes", maxBytesError.Limit)
		case errors.As(err, &invalidUnmarshalError):
			panic(err)
		default:
			return err
		}
	}

	return nil
}

func ResponseJSON(w http.ResponseWriter, status int, data any) error {
	js, err := json.MarshalIndent(data, "", "\t")
	if err != nil {
		return err
	}

	js = append(js, '\n')

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(js)

	return nil
}

func ResponseOKData(w http.ResponseWriter, data any) error {
	return ResponseJSON(w, http.StatusOK, data)
}

func ResponseBadRequestErr(w http.ResponseWriter, err any) error {
	return ResponseJSON(w, http.StatusBadRequest, Envelope{
		"error": err,
	})
}

func ResponseForbiddenErr(w http.ResponseWriter, err any) error {
	return ResponseJSON(w, http.StatusForbidden, Envelope{
		"error": err,
	})
}

func ResponseUnauthorizedErr(w http.ResponseWriter, err any) error {
	return ResponseJSON(w, http.StatusUnauthorized, Envelope{
		"error": err,
	})
}

// "Logged" represent that the err given will actually be logged but the
// response body will be different.
func ResponseServerErrorLog(w http.ResponseWriter, err any) error {
	log.Println("[ERROR]", err)

	message := "the server encountered a problem and could not process your request"
	return ResponseJSON(w, http.StatusInternalServerError, Envelope{
		"error": message,
	})
}
