// Profile.jsx
import React, { useState, useEffect, useContext } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, Award, TrendingUp } from 'lucide-react';

import toast from 'react-hot-toast'; // or use sweetalert2
import { AuthContext } from '../Context/AuthProvider';

const Profile = () => {
  const { user } = useContext(AuthContext)// Get current user from context
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    photo: '',
    bio: '',
    preferredDistance: '10k'
  });
  const [tempProfile, setTempProfile] = useState({});
  const [statistics, setStatistics] = useState({
    marathonsJoined: 0,
    marathonsCreated: 0,
    totalDistance: 0
  });
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchProfile();
      fetchStatistics();
      fetchAchievements();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`http://localhost:3000/profile/${user.email}`);
      const data = await res.json();
      
      if (res.ok) {
        setProfile({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          photo: data.photo || user.photoURL || '',
          bio: data.bio || '',
          preferredDistance: data.preferredDistance || '10k'
        });
        setTempProfile({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          photo: data.photo || user.photoURL || '',
          bio: data.bio || '',
          preferredDistance: data.preferredDistance || '10k'
        });
        
        if (data.statistics) {
          setStatistics(data.statistics);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const res = await fetch(`http://localhost:3000/profile/${user.email}/statistics`);
      const data = await res.json();
      
      if (res.ok) {
        setStatistics(data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchAchievements = async () => {
    try {
      const res = await fetch(`http://localhost:3000/profile/${user.email}/achievements`);
      const data = await res.json();
      
      if (res.ok) {
        setAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile({ ...profile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile({ ...profile });
  };

 const handleSave = async () => {
  if (!tempProfile.name || tempProfile.name.trim() === '') {
    toast.error('Name is required');
    return;
  }
  
  setSaving(true);
  
  try {
    const res = await fetch(`http://localhost:3000/profile/${user.email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: tempProfile.name,
        phone: tempProfile.phone,
        location: tempProfile.location,
        bio: tempProfile.bio,
        preferredDistance: tempProfile.preferredDistance,
        photoURL: tempProfile.photo
      })
    });
    
    const data = await res.json();
    console.log('Response:', data);
    
    if (res.ok) {
      setProfile({
        ...tempProfile
      });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } else {
      // Error hole tempProfile ke reset koro
      setTempProfile({...profile});
      toast.error(data.message || 'Failed to update profile');
    }
    
  } catch (error) {
    console.error('Error updating profile:', error);
    // Error hole tempProfile ke reset koro
    setTempProfile({...profile});
    toast.error('Failed to update profile');
  } finally {
    setSaving(true);
  }
};



//   const handleSave = async () => {
//     if (!tempProfile.name || tempProfile.name.trim() === '') {
//       toast.error('Name is required');
//       return;
//     }

//     setSaving(true);
//     try {
//       const res = await fetch(`http://localhost:3000/profile/${user.email}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: tempProfile.name,
//           phone: tempProfile.phone,
//           location: tempProfile.location,
//           bio: tempProfile.bio,
//           preferredDistance: tempProfile.preferredDistance,
//           photoURL: tempProfile.photo
//         })
//       });


//       console.log(res);
      
//       const data = await res.json();
      
//       if (res.ok) {
//         setProfile({
//           ...tempProfile
//         });
//         setIsEditing(false);
//         toast.success('Profile updated successfully!');
//       } 
//     //   else {
//     //     toast.error(data.message || 'Failed to update profile');
//     //   }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Photo Section */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={isEditing ? tempProfile.photo : profile.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
              {isEditing && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
                  <Camera className="w-4 h-4" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">{achievements.length} Achievements</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <User className="w-5 h-5 text-blue-500" />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={tempProfile.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            ) : (
              <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{profile.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Mail className="w-5 h-5 text-blue-500" />
              Email Address
            </label>
            <p className="text-gray-600 px-4 py-2 bg-gray-100 rounded-lg">{profile.email}</p>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Phone className="w-5 h-5 text-blue-500" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={tempProfile.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            ) : (
              <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{profile.phone || 'Not provided'}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={tempProfile.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your location"
              />
            ) : (
              <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{profile.location || 'Not provided'}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="text-gray-700 font-medium mb-2 block">
              Bio
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={tempProfile.bio}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{profile.bio || 'No bio added'}</p>
            )}
          </div>

          {/* Preferred Distance */}
          <div>
            <label className="text-gray-700 font-medium mb-2 block">
              Preferred Running Distance
            </label>
            {isEditing ? (
              <select
                name="preferredDistance"
                value={tempProfile.preferredDistance}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="3k">3 Kilometers</option>
                <option value="10k">10 Kilometers</option>
                <option value="25k">25 Kilometers</option>
                <option value="half">Half Marathon (21k)</option>
                <option value="full">Full Marathon (42k)</option>
              </select>
            ) : (
              <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">
                {profile.preferredDistance === '3k' && '3 Kilometers'}
                {profile.preferredDistance === '10k' && '10 Kilometers'}
                {profile.preferredDistance === '25k' && '25 Kilometers'}
                {profile.preferredDistance === 'half' && 'Half Marathon (21k)'}
                {profile.preferredDistance === 'full' && 'Full Marathon (42k)'}
              </p>
            )}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-50 p-6 border-t">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Your Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-blue-600">{statistics.marathonsJoined}</p>
              <p className="text-sm text-gray-600 mt-1">Marathons Joined</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-green-600">{statistics.marathonsCreated}</p>
              <p className="text-sm text-gray-600 mt-1">Marathons Created</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-purple-600">{statistics.totalDistance}</p>
              <p className="text-sm text-gray-600 mt-1">Total KM Run</p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <div className="p-6 border-t bg-gradient-to-r from-yellow-50 to-orange-50">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Achievements Unlocked
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <p className="font-semibold text-gray-800 text-sm">{achievement.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;


// import React, { useState, useEffect } from 'react';
// import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera } from 'lucide-react';

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     location: '',
//     photoURL: '',
//     bio: '',
//     preferredDistance: '10k'
//   });
//   const [tempProfile, setTempProfile] = useState({});

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch('http://localhost:3000/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await res.json();
//       setProfile(data);
//       setTempProfile(data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//     setTempProfile({ ...profile });
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setTempProfile({ ...profile });
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch('http://localhost:3000/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(tempProfile)
//       });
      
//       if (res.ok) {
//         const updatedProfile = await res.json();
//         setProfile(updatedProfile);
//         setIsEditing(false);
//         alert('Profile updated successfully!');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTempProfile(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold">Profile Settings</h1>
//             {!isEditing ? (
//               <button
//                 onClick={handleEdit}
//                 className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-50 transition-colors"
//               >
//                 <Edit2 className="w-4 h-4" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleSave}
//                   disabled={loading}
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-50"
//                 >
//                   <Save className="w-4 h-4" />
//                   Save
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Photo Section */}
//         <div className="p-6 border-b">
//           <div className="flex items-center gap-6">
//             <div className="relative">
//               <img
//                 src={isEditing ? tempProfile.photoURL : profile.photoURL}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
//               />
//               {isEditing && (
//                 <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
//                   <Camera className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
//               <p className="text-gray-600">{profile.email}</p>
//             </div>
//           </div>
//         </div>

//         {/* Profile Information */}
//         <div className="p-6 space-y-6">
//           {/* Name */}
//           <div>
//             <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
//               <User className="w-5 h-5 text-blue-500" />
//               Full Name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={tempProfile.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             ) : (
//               <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{profile.name}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
//               <Mail className="w-5 h-5 text-blue-500" />
//               Email Address
//             </label>
//             <p className="text-gray-600 px-4 py-2 bg-gray-100 rounded-lg">{profile.email}</p>
//             <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
//               <Phone className="w-5 h-5 text-blue-500" />
//               Phone Number
//             </label>
//             {isEditing ? (
//               <input
//                 type="tel"
//                 name="phone"
//                 value={tempProfile.phone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             ) : (
//               <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{profile.phone || 'Not provided'}</p>
//             )}
//           </div>

//           {/* Location */}
//           <div>
//             <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
//               <MapPin className="w-5 h-5 text-blue-500" />
//               Location
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="location"
//                 value={tempProfile.location}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             ) : (
//               <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{profile.location || 'Not provided'}</p>
//             )}
//           </div>

//           {/* Bio */}
//           <div>
//             <label className="text-gray-700 font-medium mb-2 block">
//               Bio
//             </label>
//             {isEditing ? (
//               <textarea
//                 name="bio"
//                 value={tempProfile.bio}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Tell us about yourself..."
//               />
//             ) : (
//               <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{profile.bio || 'No bio added'}</p>
//             )}
//           </div>

//           {/* Preferred Distance */}
//           <div>
//             <label className="text-gray-700 font-medium mb-2 block">
//               Preferred Running Distance
//             </label>
//             {isEditing ? (
//               <select
//                 name="preferredDistance"
//                 value={tempProfile.preferredDistance}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="3k">3 Kilometers</option>
//                 <option value="10k">10 Kilometers</option>
//                 <option value="25k">25 Kilometers</option>
//                 <option value="half">Half Marathon</option>
//                 <option value="full">Full Marathon</option>
//               </select>
//             ) : (
//               <p className="text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">{profile.preferredDistance}</p>
//             )}
//           </div>
//         </div>

//         {/* Statistics Section */}
//         <div className="bg-gray-50 p-6 border-t">
//           <h3 className="text-lg font-bold text-gray-800 mb-4">Your Statistics</h3>
//           <div className="grid grid-cols-3 gap-4">
//             <div className="bg-white p-4 rounded-lg text-center">
//               <p className="text-2xl font-bold text-blue-600">12</p>
//               <p className="text-sm text-gray-600">Marathons Joined</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg text-center">
//               <p className="text-2xl font-bold text-green-600">5</p>
//               <p className="text-sm text-gray-600">Marathons Created</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg text-center">
//               <p className="text-2xl font-bold text-purple-600">156</p>
//               <p className="text-sm text-gray-600">Total KM Run</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;