import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul",
    rating: 5,
    review:
      "Amazing apartment. Owner is very friendly and locality is peaceful.",
  },
  {
    name: "Ananya",
    rating: 5,
    review:
      "Exactly as shown in pictures. Loved the experience.",
  },
  {
    name: "Karan",
    rating: 4,
    review:
      "Very clean property with great connectivity.",
  },
];

export default function Reviews() {
  return (
    <section className="mt-14">

      <h2 className="text-3xl font-bold mb-8">
        Reviews
      </h2>

      <div className="space-y-6">

        {reviews.map((review) => (

          <div
            key={review.name}
            className="bg-white rounded-2xl shadow p-6"
          >

            <div className="flex justify-between">

              <h3 className="font-semibold">
                {review.name}
              </h3>

              <div className="flex">

                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (

                    <Star
                      key={i}
                      size={18}
                      fill="gold"
                      color="gold"
                    />

                  ))}

              </div>

            </div>

            <p className="text-gray-600 mt-3">
              {review.review}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}