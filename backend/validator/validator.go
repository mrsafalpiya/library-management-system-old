package validator

import (
	"errors"
	"reflect"
	"strings"

	validatorgp "github.com/go-playground/validator/v10"
)

func SetupAndGetValidator() *validatorgp.Validate {
	v := validatorgp.New()
	v.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]

		if name == "-" {
			return ""
		}

		return name
	})

	return v
}

func ValidatorErrMsg(err error) any {
	var ve validatorgp.ValidationErrors
	if !errors.As(err, &ve) {
		return err.Error()
	}

	out := make(map[string]string)
	for _, fe := range ve {
		out[fe.Field()] = msgForTag(fe)
	}
	return out
}

func msgForTag(fe validatorgp.FieldError) string {
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
