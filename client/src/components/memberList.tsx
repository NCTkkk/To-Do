import { useState, useEffect } from "react";
import type { Member } from "../types/Member";
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../api/memberAPI";
import { MemberCard } from "./propMemberList";

export const MemberList = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newMember.name.trim() === "" ||
      newMember.email.trim() === "" ||
      newMember.password.trim() === ""
    )
      return;
    try {
      const createdMember = await createMember(newMember);
      setMembers([...members, createdMember]);
      setNewMember({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  const handleUpdateMember = async (
    id: string,
    updateData: Partial<Member>
  ) => {
    try {
      const updatedMember = await updateMember(id, updateData);
      setMembers(
        members.map((member) => (member.id === id ? updatedMember : member))
      );
      setEditingMember(null);
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this member?")) {
      return;
    }
    try {
      await deleteMember(id);
      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Members</h2>

      <form
        onSubmit={handleCreateMember}
        className="mb-8 p-4 bg-gray-50 rounded-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
            className="flex-1 border rounded-lg px-4 py-2"
            required
          />
          <input
            type="email"
            placeholder="email"
            value={newMember.email}
            onChange={(e) =>
              setNewMember({ ...newMember, email: e.target.value })
            }
            className="flex-1 border rounded-lg px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Member
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            editingMember={editingMember}
            onEdit={setEditingMember}
            onDelete={handleDeleteMember}
            onUpdate={handleUpdateMember}
            onCancelEdit={() => setEditingMember(null)}
            setEditingMember={setEditingMember}
            curentUser={null}
          />
        ))}
      </div>
    </div>
  );
};
