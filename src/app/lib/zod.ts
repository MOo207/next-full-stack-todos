import { object, string, setErrorMap } from "zod";

// Define the custom error map for zod
export const createZodErrorMap = (t: (key: string) => string) => {
  return (issue: { code: any; }, ctx: { defaultError: any; }) => {
    const translationKey = `${issue.code}`; // e.g., "invalid_string"
    const defaultMessage = t(translationKey) || ctx.defaultError;

    // Return the translated message
    return { message: defaultMessage };
  };
};

// Schema for Sign In
export const signInSchema = object({
  email: string({ required_error: "required" }) // "required" key will be localized dynamically
    .min(1, "required")
    .email("invalidEmail"),
  password: string({ required_error: "required" })
    .min(3, "passwordTooShort")
    .max(10, "passwordTooLong"),
});

// Schema for Todos
export const todoSchema = object({
  title: string({ required_error: "required" })
    .min(1, "required")
    .max(32, "titleTooLong"),
});
