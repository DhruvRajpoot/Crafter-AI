"use client";

import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`/api/settings/user`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting account.");
      }

      onClose();
      router.push("/");
      toast.success("Account deleted successfully.");
    } catch (error) {
      console.error("[DeleteAccountModal Error]", error);
      toast.error("Error deleting account. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-black/10" />

      <DialogContent className="fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm w-full h-fit bg-white rounded-lg shadow-lg p-6 z-50">
        <DialogTitle className="text-xl font-semibold mb-4">
          Confirm Deletion
        </DialogTitle>
        <DialogDescription className="text-gray-700 mb-6">
          Are you sure you want to delete your account permanently? This action
          cannot be undone.
        </DialogDescription>

        <div className="flex justify-between gap-4">
          <Button
            onClick={handleDeleteAccount}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" /> Delete Account
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex items-center gap-2"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
