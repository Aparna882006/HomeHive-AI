export default function Flatmates({ flatmates }) {
  return (
    <section className="py-10 border-b">

      <h2 className="text-3xl font-bold mb-8">
        Meet Your Future Flatmates
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {flatmates.map((person) => (

          <div
            key={person.name}
            className="border rounded-2xl p-6 flex gap-5 hover:shadow-lg transition"
          >

            <img
              src={person.image}
              className="w-24 h-24 rounded-full object-cover"
            />

            <div>

              <h3 className="text-xl font-bold">
                {person.name}
              </h3>

              <p>{person.profession}</p>

              <p className="text-gray-500 mt-2">
                Age {person.age}
              </p>

              <p className="mt-1">
                Cleanliness : {person.cleanliness}%
              </p>

              <p>
                Sleeps : {person.sleep}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}