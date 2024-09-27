import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  firstName: requiredString.min(3, "Must be at least 3 characters"),
  lastName: requiredString.min(3, "Must be at least 3 characters"),
  email: requiredString.email("Invalid email address"),
  userName: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
});

export const updateUserProfileSchema = z.object({
  personalDetails: z.object({
    name: requiredString,
    email: requiredString,
  }),
  education: z
    .array(
      z.object({
        institution: requiredString,
        degree: requiredString,
        year: requiredString,
      }),
    )
    .nonempty(),
  workExperience: z.array(
    z.object({
      company: requiredString,
      position: requiredString,
      duration: requiredString,
    }),
  ),
  githubRepositories: z.array(
    z.object({
      name: requiredString,
      url: requiredString,
    }),
  ),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
});
