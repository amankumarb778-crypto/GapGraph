"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Comparison {
  name: string;
  match: string;
  time: string;
  color: string;
}

interface AppContextType {
  completedModules: Set<number>;
  toggleModule: (id: number) => void;
  overallProgress: number;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  uploadedFiles: { resume: File | null; jd: File | null };
  setUploadedFiles: (files: { resume: File | null; jd: File | null }) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  profileImage: string | null;
  setProfileImage: (url: string | null) => void;
  recentComparisons: Comparison[];
  addComparison: (comp: Comparison) => void;
  selfAssessmentScores: Record<string, number>;
  setSelfAssessmentScores: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [uploadedFiles, setUploadedFiles] = useState<{ resume: File | null; jd: File | null }>({ resume: null, jd: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [recentComparisons, setRecentComparisons] = useState<Comparison[]>([
    { name: "Google L5", match: "72%", time: "2 days ago", color: "text-secondary" },
    { name: "Meta Senior E4", match: "64%", time: "5 days ago", color: "text-secondary" },
    { name: "Amazon SDE III", match: "58%", time: "1 week ago", color: "text-on-surface" },
  ]);
  const [selfAssessmentScores, setSelfAssessmentScores] = useState<Record<string, number>>({
    "Systems Design": 50,
    "Algorithmic Efficiency": 50,
    "Cloud Architecture": 50,
    "Concurrency Control": 50,
    "API Design": 50,
    "Database Optimization": 50,
  });

  const totalModules = 7;
  const overallProgress = Math.round((completedModules.size / totalModules) * 100);

  const toggleModule = useCallback((id: number) => {
    setCompletedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const addComparison = useCallback((comp: Comparison) => {
    setRecentComparisons((prev) => [comp, ...prev].slice(0, 5));
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setCompletedModules(new Set());
    setProfileImage(null);
  };

  return (
    <AppContext.Provider
      value={{
        completedModules,
        toggleModule,
        overallProgress,
        selectedRole,
        setSelectedRole,
        uploadedFiles,
        setUploadedFiles,
        isLoggedIn,
        login,
        logout,
        profileImage,
        setProfileImage,
        recentComparisons,
        addComparison,
        selfAssessmentScores,
        setSelfAssessmentScores,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
