
import { Routes, Route } from "react-router";

import LandingPage from "@/features/landing/pages/LandingPage";
import Signup from "@/features/auth/pages/Signup";
import Login from "@/features/auth/pages/Login";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import AppLayout from "@/components/layout/AppLayout";
import NotesPage from "./features/notes/pages/NotesPage";
import NoteDetailPage from "./features/notes/pages/NoteDetailPage";
import FavouritesPage from "./features/notes/pages/FavouritesPage";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Application routes */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:noteId" element={<NoteDetailPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
