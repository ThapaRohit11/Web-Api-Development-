"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface ConfirmLogoutButtonProps {
  className?: string;
}

export default function ConfirmLogoutButton({ className }: ConfirmLogoutButtonProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutConfirm = () => {
    setShowConfirm(false);
    router.push("/logout");
  };

  return (
    <>
      <button type="button" onClick={() => setShowConfirm(true)} className={className}>
        Logout
      </button>

      <ConfirmModal
        open={showConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
