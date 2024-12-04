"use client";
import { useEffect } from 'react';
import DashBoardBeforeLogin from "./dashboard_before_login";
import DashboardAfterLogin from "./dashboard_after_login";
import AuthService from "@/app/services/AuthService";

export default function Dashboard() {
  const authService = new AuthService();

  useEffect(() => {
    const interval = setInterval(() => {
      authService.validateTokenAndRedirect();
    }, 300); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const isAuthenticated = authService.validateTokenAndRedirect();

  if (!isAuthenticated) {
    return <DashBoardBeforeLogin />;
  }

  return <DashboardAfterLogin authService={authService} />;
}