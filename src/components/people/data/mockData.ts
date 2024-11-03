import { MOCK_USERS } from '../../../constants/images';

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  managers?: Employee[];
  employees?: Employee[];
}

export interface Team {
  id: string;
  name: string;
  manager: Employee;
}

export const MOCK_DATA = {
  organization: 'Gen0',
  founders: [
    {
      id: 'founder1',
      name: MOCK_USERS.user1.name,
      role: 'CEO & Founder',
      avatar: MOCK_USERS.user1.avatar,
    },
    {
      id: 'founder2',
      name: MOCK_USERS.user2.name,
      role: 'CTO & Co-Founder',
      avatar: MOCK_USERS.user2.avatar,
    }
  ],
  teams: [
    {
      id: 'design',
      name: 'Design Team',
      manager: {
        id: 'manager1',
        name: 'Emily Chen',
        role: 'Design Director',
        avatar: MOCK_USERS.admin1.avatar,
        employees: [
          {
            id: 'emp1',
            name: 'Sarah Parker',
            role: 'Senior UI Designer',
            avatar: MOCK_USERS.admin1.avatar,
          },
          {
            id: 'emp2',
            name: 'David Kim',
            role: 'UX Researcher',
            avatar: MOCK_USERS.admin1.avatar,
          }
        ]
      }
    },
    {
      id: 'development',
      name: 'Development Team',
      manager: {
        id: 'manager2',
        name: 'Alex Rodriguez',
        role: 'Engineering Manager',
        avatar: MOCK_USERS.admin1.avatar,
        employees: [
          {
            id: 'emp3',
            name: 'James Wilson',
            role: 'Senior Developer',
            avatar: MOCK_USERS.admin1.avatar,
          },
          {
            id: 'emp4',
            name: 'Lisa Zhang',
            role: 'Full Stack Developer',
            avatar: MOCK_USERS.admin1.avatar,
          }
        ]
      }
    },
    {
      id: 'content',
      name: 'Content Team',
      manager: {
        id: 'manager3',
        name: 'Maria Garcia',
        role: 'Content Director',
        avatar: MOCK_USERS.admin1.avatar,
        employees: [
          {
            id: 'emp5',
            name: 'Chris Taylor',
            role: 'Content Strategist',
            avatar: MOCK_USERS.admin1.avatar,
          },
          {
            id: 'emp6',
            name: 'Nina Patel',
            role: 'Technical Writer',
            avatar: MOCK_USERS.admin1.avatar,
          }
        ]
      }
    }
  ]
};