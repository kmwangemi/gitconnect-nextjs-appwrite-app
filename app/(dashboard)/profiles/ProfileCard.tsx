import { UserProfileData } from "@/lib/types";
import { Book, Briefcase, GitCommit, Mail, MapPin } from "lucide-react";

export default function ProfileCard({ profile }: { profile: UserProfileData }) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-start">
        <div>
          <h2 className="mb-1 text-2xl font-bold">{`${profile?.personalDetails?.firstName || "None"} ${profile?.personalDetails?.lastName || "None"}`}</h2>
          <div className="mb-1 flex items-center text-gray-500">
            <Mail size={16} className="mr-2" />
            <span>{profile?.personalDetails?.email || "None"}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin size={16} className="mr-2" />
            <span>{profile?.personalDetails?.location || "None"}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 flex items-center text-lg font-semibold">
          <Book size={18} className="mr-2 text-green-500" />
          Education
        </h3>
        {profile?.education.map((education, index) => (
          <div key={index}>
            <p className="font-medium">{education?.degree || "None"}</p>
            <p className="text-gray-600">
              {education?.institution || "None"}, {education?.year || "None"}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="mb-2 flex items-center text-lg font-semibold">
          <Briefcase size={18} className="mr-2 text-yellow-500" />
          Work Experience
        </h3>
        {profile?.workExperience?.map((experience, index) => (
          <div key={index}>
            <p className="font-medium">{experience?.position || "None"}</p>
            <p className="text-gray-600">
              {experience?.company || "None"}, {experience?.year || "None"}
            </p>
            <ul className="mt-2 list-inside list-disc">
              <li className="text-sm">
                {experience?.responsibilities || "None"}
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="mb-2 flex items-center text-lg font-semibold">
          <GitCommit size={18} className="mr-2 text-purple-500" />
          Github Repositories
        </h3>
        {profile?.githubRepositories.map((repo, index) => (
          <div key={index}>
            <p className="font-medium">{repo?.name || "None"}</p>
            <p className="text-gray-600">{repo?.url || "None"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
