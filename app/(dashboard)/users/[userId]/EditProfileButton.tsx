"use client";

import { Button } from "@/components/ui/button";
import { TrimmedUserProfileData } from "@/lib/types";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

interface EditProfileButtonProps {
  profile: TrimmedUserProfileData;
}

export default function EditProfileButton({ profile }: EditProfileButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setShowDialog(true)}>
        Edit profile
      </Button>
      <EditProfileDialog
        profile={profile}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
}
