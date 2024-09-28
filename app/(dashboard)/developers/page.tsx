import DeveloperCard from "./DeveloperCard";

const RegisteredUsersPreview = () => {
  const sampleUsers = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      joinedDate: "2023-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      email: "jane@example.com",
      joinedDate: "2023-02-20",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Bob Johnson",
      username: "bobjohnson",
      email: "bob@example.com",
      joinedDate: "2023-03-10",
      status: "Active",
    },
    {
      id: 4,
      name: "Alice Brown",
      username: "aliceb",
      email: "alice@example.com",
      joinedDate: "2023-04-05",
      status: "Active",
    },
  ];
  return (
    <div className="w-full rounded-lg bg-gray-100">
      <div className="grid grid-cols-1 gap-6">
        {sampleUsers.map((profile, index) => (
          <DeveloperCard key={index} user={profile} />
        ))}
      </div>
    </div>
  );
};

export default RegisteredUsersPreview;
