// src/components/StudentRow.tsx
import React from 'react';

interface StudentAttributes {
  id: number;
  firstName: string;
  lastName: string;
  parentEmailId: string;
  parentContactNo: string;
  dob: string;
}

interface StudentRowProps {
  student: StudentAttributes;
}

const StudentRow: React.FC<StudentRowProps> = ({ student }) => (
  <tr className="hover:bg-purple-50">
    <td className="py-2 px-4"><input type="checkbox" className="rounded" /></td>
    <td className="py-2 px-4">
      <img src={`https://via.placeholder.com/32`} alt={student.firstName} className="w-8 h-8 rounded-full" />
    </td>
    <td className="py-2 px-4">{student.id}</td>
    <td className="py-2 px-4">{student.firstName}</td>
    <td className="py-2 px-4">{student.lastName}</td>
    <td className="py-2 px-4">{student.parentEmailId}</td>
    <td className="py-2 px-4">{student.parentContactNo}</td>
    <td className="py-2 px-4">Grade {new Date().getFullYear() - new Date(student.dob).getFullYear() - 5}</td>
  </tr>
);

export default StudentRow;