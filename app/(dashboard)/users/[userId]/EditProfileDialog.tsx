import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TrimmedUserProfileData } from "@/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "./mutations";

interface EditProfileDialogProps {
  profile: TrimmedUserProfileData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileDialog({
  profile,
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    mode: "onChange", // Validate fields on change
    defaultValues: {
      personalDetails: {
        firstName: profile?.personalDetails?.firstName || "",
        lastName: profile?.personalDetails?.lastName || "",
        email: profile?.personalDetails?.email || "",
        phoneNumber: profile?.personalDetails?.phoneNumber || "",
        location: profile?.personalDetails?.location || "",
      },
      education: profile?.education || [
        { institution: "", degree: "", year: "" },
      ],
      workExperience: profile?.workExperience || [
        {
          company: "",
          position: "",
          year: "",
          responsibilities: "",
        },
      ],
      githubRepositories: profile?.githubRepositories || [
        { name: "", url: "" },
      ],
    },
  });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });
  const {
    fields: githubRepositoriesFields,
    append: appendGithubRepository,
    remove: removeGithubRepository,
  } = useFieldArray({
    control: form.control,
    name: "githubRepositories",
  });
  const handleAddEducation = async () => {
    const educationFields = form.getValues("education");
    const index = educationFields.length; // Next index to add
    const isValid = await form.trigger([
      `education.${index - 1}.institution`,
      `education.${index - 1}.degree`,
      `education.${index - 1}.year`,
    ]);
    if (isValid) {
      appendEducation({
        institution: "",
        degree: "",
        year: "",
      });
    }
  };
  const handleAddWorkExperience = async () => {
    const workExperienceFields = form.getValues("workExperience");
    const index = workExperienceFields.length; // Next index to add
    const isValid = await form.trigger([
      `workExperience.${index - 1}.company`,
      `workExperience.${index - 1}.position`,
      `workExperience.${index - 1}.year`,
      `workExperience.${index - 1}.responsibilities`,
    ]);
    if (isValid) {
      appendWorkExperience({
        company: "",
        position: "",
        year: "",
        responsibilities: "",
      });
    }
  };
  const handleAddGithubRepositories = async () => {
    const githubRepositoriesFields = form.getValues("githubRepositories");
    const index = githubRepositoriesFields.length; // Next index to add
    const isValid = await form.trigger([
      `githubRepositories.${index - 1}.name`,
      `githubRepositories.${index - 1}.url`,
    ]);
    if (isValid) {
      appendGithubRepository({
        name: "",
        url: "",
      });
    }
  };
  const mutation = useUpdateProfileMutation();
  async function onSubmit(values: UpdateUserProfileValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[50rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <section className="mb-8">
              <h2 className="mb-2 text-lg font-semibold">Personal Details</h2>
              <div className="space-y-2 rounded-md border p-4">
                <FormField
                  control={form.control}
                  name="personalDetails.firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalDetails.lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalDetails.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalDetails.phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalDetails.location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Your location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>
            <section className="mb-8">
              <h2 className="mb-2 text-lg font-semibold">Education</h2>
              <div className="space-y-4">
                {educationFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-2 rounded-md border p-4"
                  >
                    <FormField
                      control={form.control}
                      name={`education.${index}.institution`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="Institution name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input placeholder="Degree" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.year`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input placeholder="Year" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                {educationFields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeEducation(educationFields.length - 1)}
                    size="sm"
                  >
                    Remove Education
                  </Button>
                )}
                <Button type="button" onClick={handleAddEducation} size="sm">
                  Add Education
                </Button>
              </div>
            </section>
            <section className="mb-8">
              <h2 className="mb-2 text-lg font-semibold">Work Experience</h2>
              <div className="space-y-4">
                {workExperienceFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-2 rounded-md border p-4"
                  >
                    <FormField
                      control={form.control}
                      name={`workExperience.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`workExperience.${index}.position`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Position" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`workExperience.${index}.year`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input placeholder="year" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`workExperience.${index}.responsibilities`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Responsibilities</FormLabel>
                          <FormControl>
                            <Input placeholder="responsibilities" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                {workExperienceFields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() =>
                      removeWorkExperience(workExperienceFields.length - 1)
                    }
                    size="sm"
                  >
                    Remove Work Experience
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={handleAddWorkExperience}
                  size="sm"
                >
                  Add Work Experience
                </Button>
              </div>
            </section>
            <section className="mb-8">
              <h2 className="mb-2 text-lg font-semibold">
                GitHub Repositories
              </h2>
              <div className="space-y-4">
                {githubRepositoriesFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-2 rounded-md border p-4"
                  >
                    <FormField
                      control={form.control}
                      name={`githubRepositories.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repo Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Repository name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`githubRepositories.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repo URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Repository URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                {githubRepositoriesFields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() =>
                      removeGithubRepository(
                        githubRepositoriesFields.length - 1,
                      )
                    }
                    size="sm"
                  >
                    Remove Repository
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={handleAddGithubRepositories}
                  size="sm"
                >
                  Add GitHub Repository
                </Button>
              </div>
            </section>
            <DialogFooter>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
