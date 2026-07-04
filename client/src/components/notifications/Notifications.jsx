export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Welcome to HomeHive AI",
      message: "Your account has been created successfully.",
    },
    {
      id: 2,
      title: "New Feature",
      message: "Browse rooms and connect with owners easily.",
    },
    {
      id: 3,
      title: "AI Matching",
      message: "AI compatibility feature is available.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">

      <h1 className="text-3xl font-bold mb-8">
        Notifications
      </h1>

      <div className="space-y-5">

        {notifications.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h2 className="font-bold text-lg">
              {item.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {item.message}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}