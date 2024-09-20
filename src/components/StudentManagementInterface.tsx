import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface StudentAttributes {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  gender: string;
  dob: string;
  handicapped: boolean;
  bloodGroup: string | null;
  parentContactNo: string;
  parentEmailId: string;
  currentAddress: string;
  createdAt: string;
  updatedAt: string;
  city: string | null;
  state: string | null;
  publishedAt: string;
  apartmentName: string | null;
  school: string | null;
  board: string | null;
  grade: string | null;
}

interface Student {
  id: number;
  attributes: StudentAttributes;
}

const StudentManagementInterface: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<string>('Big Ben');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://strapiqa.sparts.app/api/students');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudents(data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="bg-purple-100 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Students <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">{students.length}</span>
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border rounded-lg" />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <Bell className="text-gray-400" size={24} />
            <img src="https://via.placeholder.com/32" alt="User" className="w-8 h-8 rounded-full" />
            <ChevronDown className="text-gray-400" size={18} />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <select 
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8"
            >
              <option>Big Ben</option>
            </select>
            <ChevronDown className="absolute right-2 top-3 text-gray-400" size={18} />
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus size={18} className="mr-2" />
            Add a student
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 text-left"><input type="checkbox" className="rounded" /></th>
              <th className="py-2 px-4 text-left">Photo</th>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">First name</th>
              <th className="py-2 px-4 text-left">Last name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Year group</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="hover:bg-purple-50">
                <td className="py-2 px-4"><input type="checkbox" className="rounded" /></td>
                <td className="py-2 px-4">
                  <img src={`https://picsum.photos/id/${student.id}/32/32`} alt={student.attributes.firstName} className="w-8 h-8 rounded-full" />
                </td>
                <td className="py-2 px-4">{student.id}</td>
                <td className="py-2 px-4">{student.attributes.firstName}</td>
                <td className="py-2 px-4">{student.attributes.lastName}</td>
                <td className="py-2 px-4">{student.attributes.parentEmailId}</td>
                <td className="py-2 px-4">{student.attributes.parentContactNo}</td>
                <td className="py-2 px-4">Grade {new Date().getFullYear() - new Date(student.attributes.dob).getFullYear() - 5}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-purple-100"><ChevronLeft size={18} className="text-purple-600" /></button>
            <button className="p-2 rounded-full bg-purple-600"><ChevronRight size={18} className="text-white" /></button>
          </div>
          <div className="text-sm text-gray-600">1 of 10</div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagementInterface;