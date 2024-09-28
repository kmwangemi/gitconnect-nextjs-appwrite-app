import { TrimmedUserProfileData } from "@/lib/types";
import { GitCommit } from "lucide-react";

interface UserProfileProps {
  profile: TrimmedUserProfileData;
}

export default function UserInfo({ profile }: UserProfileProps) {
  return (
    <>
      <section className="rounded-2xl bg-card bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Personal Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {`${profile?.personalDetails?.firstName || "None"} ${profile?.personalDetails?.lastName || "None"}`}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {profile?.personalDetails?.email || "None"}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {profile?.personalDetails?.phoneNumber || "None"}
          </p>
          <p>
            <span className="font-semibold">Location:</span>{" "}
            {profile?.personalDetails?.location || "None"}
          </p>
        </div>
      </section>
      <section className="rounded-2xl bg-card bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Education</h2>
        <ul className="space-y-4">
          {profile?.education.map((education, index) => (
            <li key={index} className="border-b pb-2 last:border-b-0">
              <p className="font-semibold">{education?.degree || "None"}</p>
              <p>{education?.institution || "None"}</p>
              <p className="text-gray-600">{education?.year || "None"}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl bg-card bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Work Experience</h2>
        <ul className="space-y-6">
          {profile?.workExperience.map((job, index) => (
            <li key={index} className="border-b pb-4 last:border-b-0">
              <p className="text-lg font-semibold">{job?.position || "None"}</p>
              <p className="text-gray-600">
                {job?.company || "None"} | {job?.year || "None"}
              </p>
              <ul className="mt-2 list-inside list-disc">
                <li className="text-sm">{job.responsibilities || "None"}</li>
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl bg-card bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">GitHub Repositories</h2>
        <ul className="space-y-4">
          {profile?.githubRepositories.map((repo, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 border-b pb-2 last:border-b-0"
            >
              <GitCommit className="text-gray-700" size={24} />
              <div>
                <p className="font-semibold">{repo?.name || "None"}</p>
                <p className="text-sm text-gray-600">{repo?.url || "None"}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
