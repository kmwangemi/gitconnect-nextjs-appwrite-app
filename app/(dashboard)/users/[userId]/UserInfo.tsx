"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
// import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, GitCommit } from "lucide-react";

interface UserPostsProps {
  userId: string;
}

export default function UserInfo({ userId }: UserPostsProps) {
  const personalDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
  };

  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Tech University",
      year: "2020-2022",
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "Code College",
      year: "2016-2020",
    },
  ];

  const workExperience = [
    {
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      period: "2022-Present",
      responsibilities: [
        "Lead development of cloud-based applications",
        "Mentor junior developers",
        "Implement CI/CD pipelines",
      ],
    },
    {
      title: "Software Developer",
      company: "StartUp Innovations",
      period: "2020-2022",
      responsibilities: [
        "Developed responsive web applications",
        "Collaborated with design team on UI/UX improvements",
        "Optimized database queries for better performance",
      ],
    },
  ];

  const githubRepos = [
    {
      name: "awesome-project",
      stars: 120,
      description: "A collection of awesome resources",
    },
    {
      name: "react-component-library",
      stars: 89,
      description: "Reusable React components",
    },
    {
      name: "algorithm-visualizer",
      stars: 56,
      description: "Visualize sorting algorithms",
    },
  ];

  return (
    <>
      <section className="rounded-2xl bg-card bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Personal Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Name:</span> {personalDetails.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {personalDetails.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {personalDetails.phone}
          </p>
          <p>
            <span className="font-semibold">Location:</span>{" "}
            {personalDetails.location}
          </p>
        </div>
      </section>
      <section className="rounded-2xl bg-card bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Education</h2>
        <ul className="space-y-4">
          {education.map((edu, index) => (
            <li key={index} className="border-b pb-2 last:border-b-0">
              <p className="font-semibold">{edu.degree}</p>
              <p>{edu.school}</p>
              <p className="text-gray-600">{edu.year}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl bg-card bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Work Experience</h2>
        <ul className="space-y-6">
          {workExperience.map((job, index) => (
            <li key={index} className="border-b pb-4 last:border-b-0">
              <p className="text-lg font-semibold">{job.title}</p>
              <p className="text-gray-600">
                {job.company} | {job.period}
              </p>
              <ul className="mt-2 list-inside list-disc">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-sm">
                    {resp}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl bg-card bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">GitHub Repositories</h2>
        <ul className="space-y-4">
          {githubRepos.map((repo, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 border-b pb-2 last:border-b-0"
            >
              <GitCommit className="text-gray-700" size={24} />
              <div>
                <p className="font-semibold">{repo.name}</p>
                <p className="text-sm text-gray-600">{repo.description}</p>
                <p className="text-sm text-yellow-600">⭐ {repo.stars} stars</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
