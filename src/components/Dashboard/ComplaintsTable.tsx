import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Complaint {
  id: string;
  citizenName: string;
  isAnonymous: boolean;
  description: string;
  location: string;
  status: string;
  reportCount: number;
  priority: string;
  createdAt: string;
  reportType: string;
}

const ComplaintsTable: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://localhost:5000/complaints");
        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComplaints();
    const interval = setInterval(fetchComplaints, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Complaints Received</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2  text-black">ID</th>
                <th className="border p-2 text-black">Citizen</th>
                <th className="border p-2  text-black">Description</th>
                <th className="border p-2  text-black">Location</th>
                <th className="border p-2  text-black">Type</th>
                <th className="border p-2  text-black">Status</th>
                <th className="border p-2 text-black">Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td className="border p-2">{c.id}</td>
                  <td className="border p-2">{c.isAnonymous ? "Anonymous" : c.citizenName}</td>
                  <td className="border p-2">{c.description}</td>
                  <td className="border p-2">{c.location}</td>
                  <td className="border p-2">{c.reportType}</td>
                  <td className="border p-2">{c.status}</td>
                  <td className="border p-2">{c.createdAt}</td>
                </tr>
              ))}
              {complaints.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-muted-foreground">
                    No complaints submitted yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintsTable;
