import { Employee } from '../components/people/data/mockData';

export const getProfileData = (employee: Employee) => {
  const profiles: { [key: string]: any } = {
    // Founder 1 - Manu
    'founder1': {
      ...employee,
      email: 'manu@gen0.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      startup: {
        name: 'Gen0',
        founded: '2022',
        mission: 'Revolutionizing blockchain technology through innovative DeFi solutions and smart contract implementations.',
        stage: 'Series A',
        valuation: '$25M',
        employees: '25+',
        investors: ['Blockchain Ventures', 'DeFi Capital', 'Web3 Fund']
      },
      bio: 'Visionary entrepreneur and blockchain expert with a passion for decentralized technologies. Founded Gen0 to bridge the gap between traditional finance and DeFi.',
      links: {
        github: 'github.com/manu',
        linkedin: 'linkedin.com/in/manu'
      },
      achievements: [
        'Successfully raised $10M in seed funding',
        'Built a community of 100K+ active users',
        'Launched revolutionary DeFi protocol',
        'Featured in Forbes 30 Under 30'
      ],
      experience: [
        {
          company: 'Gen0',
          position: 'Founder & CEO',
          period: '2022 - Present',
          description: 'Leading the vision and strategy for next-generation blockchain solutions.',
          highlights: [
            'Grew team from 3 to 25+ employees',
            'Achieved $25M valuation',
            'Launched flagship DeFi product'
          ]
        },
        {
          company: 'Blockchain Solutions Inc.',
          position: 'Lead Blockchain Architect',
          period: '2019 - 2022',
          description: 'Led technical architecture for enterprise blockchain solutions.',
          highlights: [
            'Architected solutions for Fortune 500 clients',
            'Filed 3 blockchain patents',
            'Built scalable DeFi protocols'
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
        'Blockchain Architecture',
        'Smart Contracts',
        'DeFi Protocols',
        'Team Leadership',
        'Strategic Planning',
        'Product Vision',
        'Fundraising',
        'Community Building',
        'Technical Architecture',
        'Solidity'
      ],
      certifications: [
        'Certified Blockchain Expert',
        'DeFi Protocol Architecture',
        'Smart Contract Security'
      ]
    },
    // Founder 2 - Kalidasa
    'founder2': {
      ...employee,
      email: 'aum.kalidasa@gen0.com',
      phone: '+1 (555) 987-6543',
      location: 'Cambridge, MA',
      startup: {
        name: 'Gen0',
        founded: '2022',
        mission: 'Pioneering the future of decentralized systems through advanced cryptographic solutions and secure blockchain protocols.',
        stage: 'Series A',
        valuation: '$25M',
        employees: '25+',
        investors: ['Blockchain Ventures', 'DeFi Capital', 'Web3 Fund']
      },
      bio: 'Distinguished researcher and technical innovator specializing in cryptographic systems and blockchain security. Leading Gen0\'s technical vision with a focus on zero-knowledge proofs and scalable consensus mechanisms.',
      links: {
        github: 'github.com/aumkalidasa',
        linkedin: 'linkedin.com/in/aumkalidasa'
      },
      achievements: [
        'Pioneered novel zero-knowledge proof system for blockchain scalability',
        'Published groundbreaking research in post-quantum cryptography',
        'Developed Gen0\'s proprietary consensus mechanism',
        'Led the design of secure cross-chain bridge architecture',
        'Awarded "Most Innovative Blockchain Protocol" at ETH Global'
      ],
      experience: [
        {
          company: 'Gen0',
          position: 'CTO & Co-Founder',
          period: '2022 - Present',
          description: 'Spearheading technical innovation and cryptographic research.',
          highlights: [
            'Architected zero-knowledge proof infrastructure',
            'Designed quantum-resistant cryptographic protocols',
            'Built advanced security frameworks for DeFi protocols',
            'Led research team in consensus mechanism development'
          ]
        },
        {
          company: 'MIT Cryptography Lab',
          position: 'Lead Research Scientist',
          period: '2019 - 2022',
          description: 'Conducted cutting-edge research in cryptographic systems and blockchain security.',
          highlights: [
            'Published 8 papers in top cryptography conferences',
            'Developed novel post-quantum cryptographic schemes',
            'Collaborated with industry leaders on blockchain standards',
            'Mentored PhD candidates in cryptography research'
          ]
        },
        {
          company: 'Ethereum Foundation',
          position: 'Research Fellow',
          period: '2018 - 2019',
          description: 'Contributed to core protocol research and development.',
          highlights: [
            'Contributed to ETH 2.0 consensus mechanism design',
            'Researched scalability solutions',
            'Developed privacy-preserving protocols'
          ]
        }
      ],
      education: [
        {
          school: 'MIT',
          degree: 'Ph.D. Computer Science',
          period: '2016 - 2019',
          focus: 'Cryptography & Zero-Knowledge Proofs'
        },
        {
          school: 'Indian Institute of Technology, Madras',
          degree: 'M.Tech Computer Science',
          period: '2014 - 2016',
          focus: 'Advanced Cryptography & Network Security'
        },
        {
          school: 'Indian Institute of Technology, Bombay',
          degree: 'B.Tech Computer Science',
          period: '2010 - 2014',
          focus: 'Mathematics & Theoretical Computer Science'
        }
      ],
      skills: [
        'Zero-Knowledge Proofs',
        'Post-Quantum Cryptography',
        'Consensus Mechanisms',
        'Protocol Design',
        'Cryptographic Theory',
        'Secure Systems Architecture',
        'Research Leadership',
        'Mathematical Modeling',
        'Distributed Systems',
        'Privacy-Preserving Computation',
        'Smart Contract Security',
        'Formal Verification'
      ],
      certifications: [
        'Fellow, International Association for Cryptologic Research',
        'Distinguished Researcher, Ethereum Foundation',
        'CISSP (Certified Information Systems Security Professional)',
        'Certified Blockchain Security Professional (CBSP)',
        'Advanced Cryptography Researcher Certification'
      ]
    }
  };

  // Get profile by ID or return default profile
  const profile = profiles[employee.id] || {
    ...employee,
    email: `${employee.name.toLowerCase().replace(' ', '.')}@gen0.com`,
    phone: '+1 (555) 000-0000',
    location: 'Remote',
    startup: {
      name: 'Gen0',
      founded: '2022',
      mission: 'Revolutionizing blockchain technology through innovative DeFi solutions and smart contract implementations.',
      stage: 'Series A',
      valuation: '$25M',
      employees: '25+',
      investors: ['Blockchain Ventures', 'DeFi Capital', 'Web3 Fund']
    },
    bio: `${employee.role} at Gen0, contributing to the future of decentralized finance.`,
    links: {
      github: `github.com/${employee.name.toLowerCase().replace(' ', '')}`,
      linkedin: `linkedin.com/in/${employee.name.toLowerCase().replace(' ', '')}`
    },
    achievements: [
      'Contributing to Gen0\'s core development',
      'Implementing innovative blockchain solutions',
      'Collaborating on cutting-edge DeFi projects'
    ],
    experience: [
      {
        company: 'Gen0',
        position: employee.role,
        period: '2022 - Present',
        description: 'Contributing to blockchain and DeFi solutions.',
        highlights: [
          'Developing core platform features',
          'Collaborating with cross-functional teams',
          'Implementing blockchain solutions'
        ]
      }
    ],
    education: [
      {
        school: 'Various Universities',
        degree: 'Computer Science Related',
        period: '2014 - 2018',
        focus: 'Software Development'
      }
    ],
    skills: [
      'Blockchain Development',
      'Smart Contracts',
      'DeFi Protocols',
      'Software Engineering',
      'Team Collaboration'
    ],
    certifications: [
      'Blockchain Development Certification',
      'DeFi Protocol Certification'
    ]
  };

  return profile;
};