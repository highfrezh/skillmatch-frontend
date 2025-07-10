import React from 'react';
import Navbar from '../components/Navbar';

export default function Documentation() {
  return (
    <>
      <Navbar/>
      <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">📘 SkillMatch Documentation</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🛠️ Project Overview</h2>
          <p className="mb-3">
            SkillMatch is a full-stack web application that connects African SMEs with talented freelancers for remote jobs.
            Built using <strong>Django REST Framework</strong> and <strong>React.js</strong>, it offers:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>📌 Employers can post remote jobs</li>
            <li>📌 Freelancers create profiles and submit proposals</li>
            <li>📌 AI-based scoring system ranks proposals based on resume match</li>
            <li>📌 Built-in chat system for shortlisted candidates</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">📃 Resume Description Format (Freelancer)</h2>
          <p className="mb-3">
            Freelancers should provide clear information for accurate proposal scoring. Here's the structure:
          </p>

          <table className="w-full table-auto border border-gray-300 text-sm mb-4">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">Field</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">skills</td>
                <td className="border px-4 py-2">string</td>
                <td className="border px-4 py-2">Comma-separated skills</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">experience</td>
                <td className="border px-4 py-2">string</td>
                <td className="border px-4 py-2">Relevant past work/projects</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">education</td>
                <td className="border px-4 py-2">string</td>
                <td className="border px-4 py-2">Degrees, certifications</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">resume_file</td>
                <td className="border px-4 py-2">file (optional)</td>
                <td className="border px-4 py-2">PDF/DOCX used for NLP scoring</td>
              </tr>
            </tbody>
          </table>

          <p className="mb-2 font-semibold">📌 Example:</p>
          <pre className="bg-gray-100 p-4 text-sm rounded-md overflow-x-auto">
  {`{
    "skills": "Django, React, Tailwind CSS, PostgreSQL, REST API",
    "experience": "Built freelance platforms using Django and React with user auth and API integrations.",
    "education": "BSc in Computer Science from University of Ibadan"
  }`}
          </pre>

          <p className="mt-2 text-blue-600">💡 Tip: The more aligned your resume is with the job, the higher your proposal score.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">💼 Job Post Format (Employer)</h2>
          <p className="mb-3">
            Employers post jobs by filling out the following fields:
          </p>

          <table className="w-full table-auto border border-gray-300 text-sm mb-4">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">Field</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">title</td>
                <td className="border px-4 py-2">string</td>
                <td className="border px-4 py-2">Job title or role</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">description</td>
                <td className="border px-4 py-2">text</td>
                <td className="border px-4 py-2">Detailed job overview</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">required_skills</td>
                <td className="border px-4 py-2">string</td>
                <td className="border px-4 py-2">Comma-separated list of skills</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">budget</td>
                <td className="border px-4 py-2">decimal</td>
                <td className="border px-4 py-2">Estimated payment in USD</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">status</td>
                <td className="border px-4 py-2">choice</td>
                <td className="border px-4 py-2">Default: Open</td>
              </tr>
            </tbody>
          </table>

          <p className="mb-2 font-semibold">📌 Example:</p>
          <pre className="bg-gray-100 p-4 text-sm rounded-md overflow-x-auto">
  {`{
    "title": "Full-Stack Web Developer Needed",
    "description": "Looking for a developer experienced in Django and React. Tailwind and PostgreSQL are a bonus.",
    "required_skills": "Django, React, Tailwind CSS, PostgreSQL, REST API",
    "budget": 1500.00
  }`}
          </pre>

          <p className="mt-2 text-red-500">🔒 Note: When a freelancer is shortlisted, the job is automatically marked as <strong>Closed</strong>.</p>
        </section>
      </div>
    </>
    
  );
}
