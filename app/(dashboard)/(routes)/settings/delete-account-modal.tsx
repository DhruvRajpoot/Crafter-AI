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
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { signOut } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
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

      await signOut();
    } catch (error) {
      console.error("[DeleteAccountModal Error]", error);
      toast.error("Error deleting account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !loading && !open && onClose()}
    >
      <DialogOverlay className="fixed inset-0 bg-black/30 dark:bg-black/70" />

      <DialogContent className="fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm w-full h-fit bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 z-50">
        <DialogTitle className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Confirm Deletion
        </DialogTitle>
        <DialogDescription className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete your account permanently? This action
          cannot be undone.
        </DialogDescription>

        <div className="flex justify-between gap-4">
          <Button
            onClick={handleDeleteAccount}
            variant="destructive"
            className="flex items-center gap-2"
            disabled={loading}
          >
            <Trash2 className="w-5 h-5" /> Delete Account
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex items-center gap-2"
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
