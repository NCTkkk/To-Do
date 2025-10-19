export const Home = () => {
  return (
    <div className="mt-10  max-w-6xl mx-auto px-4">
      <p className="text-2xl font-semibold text-blue-600 ">
        Welcome to the ToDo App ...!
      </p>
      <p className="mt-4 text-gray-700">
        This application helps you manage your tasks efficiently. Use the
        navigation links above to view tasks, manage users, and assign tasks.
      </p>
      <p className="mt-4 text-gray-700">
        Get started by adding new tasks and assigning them to users!
      </p>

      <div className="mt-6">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="ToDo Illustration"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="text-blue-700">
          Tip: Click on "Tasks" to view and manage your tasks, "Users" to see
          the list of users, and "Assign Tasks" to allocate tasks to users.
        </p>
      </div>

      <div className="mt-2 space-y-2">
        <p className="text-sm text-gray-500">
          Note: This is a demo application. All data is stored in-memory and
          will be lost upon server restart.
        </p>
      </div>

      <div>
        <p className="mt-6 text-lg font-medium text-gray-800">
          Happy Task Managing!
        </p>
      </div>

      <div className="fixed bottom-0 left-0 w-full border-t pt-4 flex flex-col items-center justify-center text-center">
        <div>
          <p className="mt-1 text-sm text-gray-500">
            © 2024 ToDo App. All rights reserved.
          </p>
        </div>

        <div>
          <p className="mt-2 text-sm text-gray-400">
            Built with React, TypeScript, Node.js, and Express.
          </p>
        </div>

        <div>
          <p className="mt-2 text-sm text-gray-400">Designed by HeHeHe</p>
        </div>

        <div>
          <p className="mt-2 text-sm text-gray-400">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};
