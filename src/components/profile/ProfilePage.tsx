import React from 'react';
import { Github, Linkedin, Award, Book, Briefcase, GraduationCap, ArrowLeft, Building } from 'lucide-react';
import { MOCK_DATA } from '../people/data/mockData';
import { useNavigate } from '../../hooks/useNavigate';
import { getProfileData } from '../../utils/profileData';

interface ProfilePageProps {
  profileId: string | null;
}

export default function ProfilePage({ profileId }: ProfilePageProps) {
  const { goBack } = useNavigate();

  // Find the employee data based on profileId
  const getEmployeeData = () => {
    // Check founders first
    const founder = MOCK_DATA.founders.find(f => f.id === profileId);
    if (founder) return founder;

    // Check team managers and employees
    for (const team of MOCK_DATA.teams) {
      if (team.manager.id === profileId) return team.manager;
      const employee = team.manager.employees?.find(e => e.id === profileId);
      if (employee) return employee;
    }

    // Default to first founder if no match found
    return MOCK_DATA.founders[0];
  };

  const employee = getEmployeeData();
  const profile = getProfileData(employee);

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="flex items-center text-gray-600 hover:text-gray-900 p-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-xl p-4 sm:p-8 text-white mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-0 sm:justify-between">
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{profile.name}</h1>
              <p className="text-lg sm:text-xl text-purple-100 mb-4">{profile.role}</p>
              <p className="text-purple-100 max-w-2xl">{profile.bio}</p>
            </div>
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Startup Info */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
          <div className="flex items-center mb-4">
            <Building className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">{profile.startup.name}</h2>
          </div>
          <p className="text-gray-600 mb-6">{profile.startup.mission}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Founded</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{profile.startup.founded}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Stage</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{profile.startup.stage}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Valuation</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{profile.startup.valuation}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Team Size</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{profile.startup.employees}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Achievements */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-purple-600"></div>
                    <p className="ml-3 text-gray-600">{achievement}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Experience</h2>
              </div>
              <div className="space-y-6">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-purple-200 pl-4">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-purple-600 mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                    <p className="text-gray-600 mb-2">{exp.description}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Education</h2>
              </div>
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-purple-200 pl-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-purple-600">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.period}</p>
                    <p className="text-sm text-gray-600">Focus: {edu.focus}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Links */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Links</h2>
              <div className="space-y-2">
                <a href={`https://${profile.links.github}`} className="flex items-center text-gray-600 hover:text-purple-600">
                  <Github className="w-4 h-4 mr-2" />
                  {profile.links.github}
                </a>
                <a href={`https://${profile.links.linkedin}`} className="flex items-center text-gray-600 hover:text-purple-600">
                  <Linkedin className="w-4 h-4 mr-2" />
                  {profile.links.linkedin}
                </a>
              </div>
            </section>

            {/* Skills */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <Book className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
              </div>
              <ul className="space-y-2">
                {profile.certifications.map((cert, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}