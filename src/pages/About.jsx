import React from 'react';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>  
        <Navbar/>
        <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">About SkillMatch</h1>

            <section className="mb-10">
                <p className="text-lg mb-4">
                <strong>SkillMatch</strong> is an AI-powered freelance marketplace designed to connect small businesses and startups across Africa with skilled remote freelancers.
                </p>
                <p className="text-lg">
                Whether you're a growing company looking to hire talent or a freelancer seeking meaningful projects, SkillMatch provides a smart, efficient, and transparent platform to collaborate.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">🎯 Our Mission</h2>
                <p>
                We aim to empower African SMEs by making it easy to discover, assess, and hire top freelancers — while helping professionals showcase their skills and earn remotely.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">🚀 Key Features</h2>
                <ul className="list-disc list-inside space-y-2">
                <li><strong>Smart Job Matching</strong> – Uses NLP and resume scoring to rank freelancer proposals</li>
                <li><strong>Resume Builder</strong> – Freelancers can showcase skills, education, and upload a resume file</li>
                <li><strong>Job Posting</strong> – Employers can post and manage freelance job opportunities</li>
                <li><strong>Proposal Submission</strong> – Freelancers can apply to jobs with cover letters</li>
                <li><strong>Shortlisting + Status Updates</strong> – Employers can shortlist or reject applicants</li>
                <li><strong>Built-in Messaging</strong> – Chat feature between employer and freelancer after shortlisting</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">🛠 Tech Stack</h2>
                <ul className="list-disc list-inside space-y-2">
                <li><strong>Frontend:</strong> React, Tailwind CSS, React Router, Axios</li>
                <li><strong>Backend:</strong> Django REST Framework, JWT Authentication, spaCy NLP</li>
                <li><strong>Database:</strong> PostgreSQL (or SQLite in development)</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">🌍 Who Is It For?</h2>
                <p>
                SkillMatch is ideal for:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                <li>📌 Startups or small businesses hiring remote freelancers</li>
                <li>📌 Freelancers looking to apply their skills in real-world projects</li>
                <li>📌 Developers building their portfolio with full-stack AI-driven applications</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">💡 Future Goals</h2>
                <p>
                We plan to expand SkillMatch with features like payment integration, freelancer reviews, job filtering by category, and AI-powered recommendations for both sides.
                </p>
            </section>
        </div>
    </>
    
  );
}
