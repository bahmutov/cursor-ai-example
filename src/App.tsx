//src/app.tsx

import React from "react";
import { useAppSelector } from "./app/hooks";
import Header from "./components/layout/Header";
import ListView from "./components/views/ListView";
import KanbanView from "./components/views/KanbanView";
import TaskModal from "./components/modals/TaskModal";

function App() {
  const viewMode = useAppSelector(state => state.ui.viewMode);

  return (
    <div className="min-h-screen bg-gray-100" data-cy="app-container">
      <Header />

      <main data-cy="main-content">
        <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8" data-cy="content-container">
          {viewMode === "list" ? <ListView /> : <KanbanView />}
        </div>
      </main>

      <TaskModal />
    </div>
  );
}

export default App;
