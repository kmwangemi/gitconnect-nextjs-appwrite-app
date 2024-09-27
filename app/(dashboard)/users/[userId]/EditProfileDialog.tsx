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
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "./mutations";

interface EditProfileDialogProps {
  user: UserData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileDialog({
  user,
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      personalDetails: {
        name: user?.personalDetails?.name || "",
        email: user?.personalDetails?.email || "",
      },
      education: user?.education || [],
      workExperience: user?.workExperience || [],
      githubRepositories: user?.githubRepositories || [],
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
  const mutation = useUpdateProfileMutation();
  async function onSubmit(values: UpdateUserProfileValues) {
    mutation.mutate(
      {
        values,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[50rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Personal Details Section */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold">Personal Details</h2>
              <div className="space-y-2 rounded-md border p-4">
                <FormField
                  control={form.control}
                  name="personalDetails.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
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
              </div>
            </section>
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold">Education</h2>
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
                {educationFields.length > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeEducation(educationFields.length - 1)}
                    size="sm"
                  >
                    Remove Education
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={() =>
                    appendEducation({ institution: "", degree: "", year: "" })
                  }
                  size="sm"
                >
                  Add Education
                </Button>
              </div>
            </section>
            {/* Work Experience Section */}
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold">Work Experience</h2>
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
                      name={`workExperience.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="Duration" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                {workExperienceFields.length > 0 && (
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
                  onClick={() =>
                    appendWorkExperience({
                      company: "",
                      position: "",
                      duration: "",
                    })
                  }
                  size="sm"
                >
                  Add Work Experience
                </Button>
              </div>
            </section>
            {/* GitHub Repositories Section */}
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold">
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
                {githubRepositoriesFields.length > 0 && (
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
                  onClick={() => appendGithubRepository({ name: "", url: "" })}
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
