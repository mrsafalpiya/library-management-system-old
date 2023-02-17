package utils

import (
	"errors"

	"github.com/go-playground/validator/v10"
)

func msgForTag(fe validator.FieldError) string {
	switch fe.Tag() {
	case "required":
		return "This field is required"
	case "number":
		return "This field only accepts number"
	case "email":
		return "This field requires valid email"
	case "idtype":
		return "This field requires a valid id type id (positive)"
	}
	return fe.Error()
}

func ValidatorErrMsg(err error) any {
	var ve validator.ValidationErrors
	if !errors.As(err, &ve) {
		return err.Error()
	}

	out := make(map[string]string)
	for _, fe := range ve {
		out[fe.Field()] = msgForTag(fe)
	}
	return out
}
