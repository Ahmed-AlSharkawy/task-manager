// Define your validation methods
const validators = {
    requiredValidator(fieldName, options) {
        if (!options.value || options.value.trim() === "") {
            return `The ${fieldName} field is required.`;
        }
        return null;
    },
    emailValidator(fieldName, options) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(options.value)) {
            return `The ${fieldName} field must be a valid email address.`;
        }
        return null;
    },
    maxValidator(fieldName, options) {
        if (options.type === "number" && options.value > options.max)
            return `The ${fieldName} field cannot exceed ${options.max}.`;

        if (options.value.length > options.max)
            return options.type === "array"
                ? `The ${fieldName} field should be at most ${options.max} items.`
                : `The ${fieldName} field should be at most ${options.max} characters.`;

        return null;
    },
    minValidator(fieldName, options) {
        if (options.type === "number" && options.value < options.min)
            return `The ${fieldName} field cannot be smaller than ${options.min}.`;

        if (options.value.length < options.min)
            return options.type === "array"
                ? `The ${fieldName} field should be at least ${options.min} items.`
                : `The ${fieldName} field should be at least ${options.min} characters.`;

        return null;
    },
    confirmedValidator(fieldName, options) {
        if (options.value !== options.confirmation)
            return `The ${fieldName} field confirmation does not match.`;

        return null;
    },

    dateValidator(fieldName, options) {
        // Check if the value is a valid date
        const errors = [];

        if (isNaN(Date.parse(options.value)))
            errors.push(`The ${fieldName} field should be a valid date.`);

        // Apply additional constraints if specified
        const fieldDate = new Date(options.value);
        const today = new Date().getDate();

        if (options.min) {
            if (fieldDate < new Date().setDate(today + options.min)) {
                errors.push(
                    `The ${fieldName} field should be greater than ${options.min} days from today`
                );
            }
        }

        if (options.max) {
            if (fieldDate > new Date().setDate(today + options.max)) {
                errors.push(
                    `The ${fieldName} field should be less than ${options.max} days from today`
                );
            }
        }

        // If no validation errors, return null
        return errors.length ? errors : null;
    },
};

// Export the validateFormInput function
export function validateFormInput(validator, fieldName, options) {
    const validatorFuncName = `${validator}Validator`;
    if (validators[validatorFuncName]) {
        return validators[validatorFuncName](fieldName, options);
    }
    return null;
}

export function validateForm(fields, errors, validators, fieldName = null) {
    errors = errors || {};
    let isValid = true;

    const fieldNames = fieldName ? [fieldName] : Object.keys(fields);

    for (const field of fieldNames) {
        errors[field] = [];
        if (!validators[field]) continue;

        const fieldValidators = Object.entries(validators[field]);
        for (const [validator, options] of fieldValidators) {
            if (validator == "confirmed")
                options.confirmation = fields[options.confirmationField];

            const fieldError = validateFormInput(validator, field, {
                value: fields[field],
                ...options,
            });

            if (!fieldError) continue;

            isValid = false;
            if (typeof fieldError === "string") {
                errors[field].push(fieldError);
            } else {
                errors[field].push(...fieldError);
            }
            // if (fieldName) return { errors, isValid };
        }
    }

    return { errors, isValid };
}
