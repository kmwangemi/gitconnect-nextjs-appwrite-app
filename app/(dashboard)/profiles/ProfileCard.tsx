import { Briefcase, Book, GitCommit, Mail, MapPin } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";

export default function ProfileCard({ user }: { user: any }) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-start">
        <UserAvatar
          avatarUrl={user?.avatarUrl}
          size={100}
          className="mr-10 size-full max-h-36 max-w-36 rounded-full"
        />
        <div>
          <h2 className="mb-1 text-2xl font-bold">{user.name}</h2>
          <p className="mb-2 text-gray-600">{user.title}</p>
          <div className="mb-1 flex items-center text-gray-500">
            <Mail size={16} className="mr-2" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin size={16} className="mr-2" />
            <span>{user.location}</span>
          </div>
        </div>
      </div>
      {/* education */}
      <div className="mt-4">
        <h3 className="mb-2 flex items-center text-lg font-semibold">
          <Book size={18} className="mr-2 text-green-500" />
          Education
        </h3>
        {user.education.slice(0, 1).map((edu, index) => (
          <div key={index}>
            <p className="font-medium">{edu.degree}</p>
            <p className="text-gray-600">
              {edu.school}, {edu.year}
            </p>
          </div>
        ))}
      </div>
      {/* work experience */}
      <div className="mt-4">
        <h3 className="mb-2 flex items-center text-lg font-semibold">
          <Briefcase size={18} className="mr-2 text-yellow-500" />
          Work Experience
        </h3>
        {user.experience.slice(0, 1).map((exp, index) => (
          <div key={index}>
            <p className="font-medium">{exp.title}</p>
            <p className="text-gray-600">
              {exp.company}, {exp.duration}
            </p>
          </div>
        ))}
      </div>
      {/* githubRepos */}
      <div className="mt-4">
        <h3 className="mb-2 flex items-center text-lg font-semibold">
          <GitCommit size={18} className="mr-2 text-purple-500" />
          Github Repositories
        </h3>
        {user.githubRepos.slice(0, 1).map((repo, index) => (
          <div key={index}>
            <p className="font-medium">{repo.name}</p>
            <p className="text-gray-600">{repo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
