// src/app/components/auth/RoleGuard.tsx
'use client';
import { ReactNode } from 'react';
import AuthService from '@/app/services/AuthService';

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const authService = new AuthService();
  
  try {
    const token = authService.GetJwtToken();
    if (!token) return null;
    
    const accountInfo = authService.DeCodeJwtToken(token);
    console.log(accountInfo);
    if (!allowedRoles.includes(accountInfo.role)) {
      return null;
    }
    
    return <>{children}</>;
  } catch {
    return null;
  }
}