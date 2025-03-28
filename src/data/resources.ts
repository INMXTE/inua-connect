
import { ResourceProps } from "@/types/resources";

export const resourcesData: ResourceProps[] = [
  {
    id: "1",
    title: "CV Writing Workshop",
    type: "Workshop",
    date: "June 15, 2023",
    location: "Nairobi Innovation Hub",
    capacity: 30,
    description: "Learn how to create a standout CV that will catch employers' attention and showcase your skills effectively.",
    tags: ["CV Writing", "Career Development"],
    imageUrl: "/images/cv-workshop.jpg",
    learningOutcomes: [
      "Understand the key components of an effective CV",
      "Learn how to tailor your CV for specific job applications",
      "Develop techniques to highlight your achievements",
      "Create a professional-looking CV layout"
    ]
  },
  {
    id: "2",
    title: "Introduction to Web Development",
    type: "Course",
    description: "A comprehensive introduction to HTML, CSS, and JavaScript for beginners looking to start a career in web development.",
    tags: ["Technical Skills", "Web Development"],
    imageUrl: "/images/web-dev.jpg"
  },
  {
    id: "3",
    title: "Effective Communication in the Workplace",
    type: "Article",
    description: "Discover strategies for clear, confident communication that will help you succeed in professional environments.",
    tags: ["Soft Skills", "Career Development"],
    imageUrl: "/images/communication.jpg"
  },
  {
    id: "4",
    title: "Interview Preparation Webinar",
    type: "Webinar",
    date: "July 2, 2023",
    description: "Prepare for job interviews with expert tips on answering common questions and making a great impression.",
    tags: ["Interview Prep", "Career Development"],
    imageUrl: "/images/interview-prep.jpg",
    learningOutcomes: [
      "Prepare answers for common interview questions",
      "Learn techniques to manage interview anxiety",
      "Understand how to research companies before interviews",
      "Master the STAR method for behavioral questions"
    ]
  },
  {
    id: "5",
    title: "Networking for Young Professionals",
    type: "Workshop",
    date: "July 12, 2023",
    location: "Strathmore University",
    capacity: 25,
    description: "Build your professional network with strategies for meaningful connections that can advance your career.",
    tags: ["Networking", "Career Development"],
    imageUrl: "/images/networking.jpg",
    learningOutcomes: [
      "Develop an effective elevator pitch",
      "Learn strategies for networking at professional events",
      "Understand how to maintain professional relationships",
      "Use LinkedIn and other social platforms effectively"
    ]
  },
  {
    id: "6",
    title: "Introduction to Data Analysis with Excel",
    type: "Video",
    description: "Learn the fundamentals of data analysis using Microsoft Excel, including formulas, pivot tables, and visualization.",
    tags: ["Technical Skills", "Data Analysis"],
    imageUrl: "/images/excel.jpg"
  }
];
