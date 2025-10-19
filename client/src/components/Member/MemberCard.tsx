import type { Member } from "../../types/Member";

interface MemberCardProps {
  member: Member;
  editingMember: Member | null;
  onEdit: (user: Member) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, memberData: Partial<Member>) => void;
  onCancelEdit: () => void;
  setEditingMember: React.Dispatch<React.SetStateAction<Member | null>>;
}

export const MemberCard = ({
  member,
  editingMember,
  onEdit,
  onDelete,
  onUpdate,
  onCancelEdit,
  setEditingMember,
}: MemberCardProps) => {
  return (
    <div key={member.id} className="border rounded-lg p-4 bg-white shadow-sm">
      {editingMember?.id === member.id ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={editingMember.name}
              onChange={(e) =>
                setEditingMember({ ...editingMember, name: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={editingMember.email}
              onChange={(e) =>
                setEditingMember({ ...editingMember, email: e.target.value })
              }
              className="w-full border rounded-lg px-2 py-1"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onUpdate(member.id, editingMember)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.email}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(member)}
                className="text-blue-500 hover:text-blue-700"
                title="Edit Member"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => onDelete(member.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete Member"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Tasks assigned</p>
                <p className="font-semibold">{member.tasks?.length || 0}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Completed</p>
                <p className="font-semibold">
                  {member.tasks?.filter((t) => t.completed).length || 0}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Created: {new Date(member.createdAt!).toLocaleDateString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
