package utils

import (
	"errors"

	"github.com/go-playground/validator/v10"
)

func msgForTag(fe validator.FieldError) string {
	switch fe.Tag() {
	case "required":
		return "this field is required"
	case "number":
		return "this field only accepts number"
	case "email":
		return "this field requires valid email"
	case "idtype":
		return "this field requires a valid id type id (positive)"
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
