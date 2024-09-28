import { Calendar, Mail, User } from "lucide-react";

export default function DeveloperCard({ user }: { user: any }) {
  return (
    <div
      key={user.id}
      className="relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <User className="h-12 w-12 rounded-full bg-gray-100 p-2 text-gray-400" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">@{user.username}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <Mail className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-sm">Joined: {user.joinedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
