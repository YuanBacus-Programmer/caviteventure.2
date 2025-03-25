"use client";

import dynamic from "next/dynamic";

const EditableProfile = dynamic(() => import("@/components/profile/EditableProfile"), { ssr: false });

export default function EditableProfileClient(props: any) {
  return <EditableProfile {...props} />;
}
