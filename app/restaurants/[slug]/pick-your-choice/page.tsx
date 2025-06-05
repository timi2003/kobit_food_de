import { PickYourChoice } from "@/components/pick-your-choice"

export default function RestaurantPickYourChoicePage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Custom Meals at{" "}
            {params.slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>
          <p className="text-muted-foreground">
            Create your perfect meal combination from our selection of Nigerian favorites
          </p>
        </div>
        <PickYourChoice restaurantSlug={params.slug} />
      </div>
    </div>
  )
}
