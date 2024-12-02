import React from 'react';
import { Users, Award, Sword, Trophy, Target, ArrowLeft, Coins } from 'lucide-react';
import { useNavigate } from '../../hooks/useNavigate';
import { MOCK_DATA } from '../people/data/mockData';

export default function GuildPage() {
  const { goBack } = useNavigate();

  const guildStats = {
    totalMembers: MOCK_DATA.teams.reduce(
      (acc, team) => acc + (team.manager.employees?.length || 0) + 1,
      MOCK_DATA.founders.length
    ),
    completedQuests: 156,
    activeQuests: 23,
    totalRewards: '$125,000',
    guildRank: 'Legendary',
    guildLevel: 42,
    establishedDate: '2022',
    headquarters: 'San Francisco, CA',
    specializations: [
      'Blockchain Development',
      'Smart Contract Security',
      'DeFi Protocol Design',
      'Zero-Knowledge Proofs',
      'Cross-chain Solutions'
    ],
    achievements: [
      'First Web3 Guild to reach $1M in quest rewards',
      'Pioneered cross-chain bridge security standards',
      'Developed revolutionary ZK-proof implementation',
      'Published 15 groundbreaking research papers',
      'Successfully completed 1000+ high-stakes quests'
    ],
    alliances: [
      'Ethereum Foundation',
      'Polygon Network',
      'Chainlink Labs',
      'OpenZeppelin',
      'Arbitrum'
    ],
    vision: 'To forge the future of decentralized technology through innovation, collaboration, and excellence.',
    mission: 'Empowering builders to create secure, scalable, and revolutionary blockchain solutions while fostering a community of continuous learning and growth.'
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <button
        onClick={goBack}
        className="flex items-center text-gray-600 hover:text-gray-900 p-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-4 sm:p-8 text-white mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-0 sm:justify-between">
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Gen0 Guild</h1>
              <p className="text-lg sm:text-xl text-purple-100 mb-4">Level {guildStats.guildLevel} • {guildStats.guildRank} Rank</p>
              <p className="text-purple-100 max-w-2xl">{guildStats.vision}</p>
            </div>
            <div className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-white bg-opacity-10 rounded-lg">
              <Users className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{guildStats.totalMembers}</p>
              </div>
              <Users className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed Quests</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{guildStats.completedQuests}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Quests</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{guildStats.activeQuests}</p>
              </div>
              <Sword className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Rewards</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{guildStats.totalRewards}</p>
              </div>
              <Coins className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mission & Vision */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Mission</h2>
              </div>
              <p className="text-gray-600 mb-6">{guildStats.mission}</p>
            </section>

            {/* Achievements */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <Trophy className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Guild Achievements</h2>
              </div>
              <div className="grid gap-4">
                {guildStats.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-purple-600"></div>
                    <p className="ml-3 text-gray-600">{achievement}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Specializations */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <Sword className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Specializations</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {guildStats.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Guild Info */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Guild Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Established</p>
                  <p className="text-gray-900">{guildStats.establishedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Headquarters</p>
                  <p className="text-gray-900">{guildStats.headquarters}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guild Level</p>
                  <p className="text-gray-900">{guildStats.guildLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rank</p>
                  <p className="text-gray-900">{guildStats.guildRank}</p>
                </div>
              </div>
            </section>

            {/* Alliances */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Strategic Alliances</h2>
              </div>
              <ul className="space-y-2">
                {guildStats.alliances.map((alliance, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
                    {alliance}
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