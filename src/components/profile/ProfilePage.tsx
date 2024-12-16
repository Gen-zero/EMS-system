import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Award, Book, Briefcase, GraduationCap, ArrowLeft, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate as useAppNavigate } from '../../hooks/useNavigate';
import api from '../../services/api';
import LoadingSpinner from '../layout/LoadingSpinner';

interface ProfileData {
  id: number;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  education: {
    school: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
  }[];
  experience: {
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
  interests: string[];
  certifications: string[];
  links: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
}

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = React.useState<ProfileData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/users/${id || user?.id}/profile`);
        setProfile(response.data);
        setError(null);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to load profile');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, user?.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !profile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {error || 'Profile not found'}
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-500"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-xl p-4 sm:p-8 text-white mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-0 sm:justify-between">
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{profile.fullName}</h1>
              <p className="text-lg sm:text-xl text-purple-100 mb-4">{profile.role}</p>
              <p className="text-purple-100 max-w-2xl">{profile.bio}</p>
            </div>
            {profile.avatar && (
              <img 
                src={profile.avatar}
                alt={profile.fullName}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            )}
          </div>
        </div>

        {/* Rest of the profile sections */}
        {/* ... (keep the existing profile sections) ... */}
      </div>
    </div>
  );
}