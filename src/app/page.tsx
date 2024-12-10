'use client';

import Image from "next/image";
import DropdownButton from "./components/common/dropdown-button";
import { useState } from 'react';
import GenrePopupForm from "./components/popup/genre-popup-form";
import RoleGuard from "./components/auth/RoleGuard";

export default function Home() {

  return (
    <RoleGuard allowedRoles={['Admin']}>
      <div></div>
    </RoleGuard>
  );
}
