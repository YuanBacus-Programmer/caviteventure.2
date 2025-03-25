"use client";

import dynamic from "next/dynamic";

// Dynamically import the ProfileForm so that it only renders on the client.
const ProfileForm = dynamic(() => import("@/components/profile/ProfileForm"), {
  ssr: false,
});

export default function ProfileFormClient(props: any) {
  return <ProfileForm {...props} />;
}
