import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Award, Book, Briefcase, GraduationCap } from 'lucide-react';
import { MOCK_USERS } from '../../constants/images';

interface ProfileResumeProps {
  onClose: () => void;
}

export default function ProfileResume({ onClose }: ProfileResumeProps) {
  const user = {
    ...MOCK_USERS.user1,
    email: 'manu@gen0.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Software Engineer',
    bio: 'Passionate software engineer with expertise in full-stack development, blockchain technologies, and distributed systems.',
    links: {
      github: 'github.com/manu',
      linkedin: 'linkedin.com/in/manu'
    },
    experience: [
      {
        company: 'Gen0',
        position: 'Senior Software Engineer',
        period: '2022 - Present',
        description: 'Leading development of blockchain-based solutions and smart contract implementations.',
        achievements: [
          'Architected and implemented a scalable DeFi platform',
          'Reduced system latency by 40% through optimization',
          'Led a team of 5 engineers in delivering critical features'
        ]
      },
      {
        company: 'Tech Innovators Inc.',
        position: 'Software Engineer',
        period: '2019 - 2022',
        description: 'Full-stack development with focus on distributed systems.',
        achievements: [
          'Developed microservices architecture',
          'Implemented CI/CD pipeline',
          'Mentored junior developers'
        ]
      }
    ],
    education: [
      {
        school: 'Stanford University',
        degree: 'M.S. Computer Science',
        period: '2017 - 2019',
        focus: 'Distributed Systems & Blockchain'
      },
      {
        school: 'University of California, Berkeley',
        degree: 'B.S. Computer Science',
        period: '2013 - 2017',
        focus: 'Software Engineering'
      }
    ],
    skills: [
      'Blockchain Development',
      'Smart Contracts',
      'Solidity',
      'React',
      'Node.js',
      'TypeScript',
      'Python',
      'AWS',
      'Docker',
      'Kubernetes'
    ],
    certifications: [
      'AWS Certified Solutions Architect',
      'Certified Blockchain Developer',
      'Google Cloud Professional Engineer'
    ]
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="min-h-screen px-4 text-center"
        style={{ padding: '0 0 60px 0' }}
      >
        <div className="inline-block w-full max-w-4xl text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
             onClick={e => e.stopPropagation()}>
          <div className="relative">
            {/* Header/Bio Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-12 rounded-t-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                  <p className="text-xl text-blue-100 mb-4">{user.title}</p>
                  <p className="text-blue-100 max-w-2xl mb-6">{user.bio}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-blue-100">
                      <Mail className="w-4 h-4 mr-2" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-blue-100">
                      <Phone className="w-4 h-4 mr-2" />
                      {user.phone}
                    </div>
                    <div className="flex items-center text-blue-100">
                      <MapPin className="w-4 h-4 mr-2" />
                      {user.location}
                    </div>
                  </div>
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="px-8 py-8">
              <div className="grid grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="col-span-2 space-y-8">
                  {/* Experience Section */}
                  <section>
                    <div className="flex items-center mb-4">
                      <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                      <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                    </div>
                    <div className="space-y-6">
                      {user.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-blue-600 mb-1">{exp.company}</p>
                          <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                          <p className="text-gray-600 mb-2">{exp.description}</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Education Section */}
                  <section>
                    <div className="flex items-center mb-4">
                      <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                      <h2 className="text-xl font-bold text-gray-900">Education</h2>
                    </div>
                    <div className="space-y-4">
                      {user.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-blue-600">{edu.school}</p>
                          <p className="text-sm text-gray-500">{edu.period}</p>
                          <p className="text-sm text-gray-600">Focus: {edu.focus}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Links Section */}
                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Links</h2>
                    <div className="space-y-2">
                      <a href={`https://${user.links.github}`} className="flex items-center text-gray-600 hover:text-blue-600">
                        <Github className="w-4 h-4 mr-2" />
                        {user.links.github}
                      </a>
                      <a href={`https://${user.links.linkedin}`} className="flex items-center text-gray-600 hover:text-blue-600">
                        <Linkedin className="w-4 h-4 mr-2" />
                        {user.links.linkedin}
                      </a>
                    </div>
                  </section>

                  {/* Skills Section */}
                  <section>
                    <div className="flex items-center mb-4">
                      <Book className="w-5 h-5 text-blue-600 mr-2" />
                      <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Certifications Section */}
                  <section>
                    <div className="flex items-center mb-4">
                      <Award className="w-5 h-5 text-blue-600 mr-2" />
                      <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
                    </div>
                    <ul className="space-y-2">
                      {user.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}