import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Award, Users, MapPin } from "lucide-react"

export function AboutPage() {
  const teamMembers = [
    {
      name: "Kolawole Oluwafemi",
      role: "Founder & CEO",
      image: "/CEO.jpg?height=300&width=300",
      bio: "Oluwafemi founded KOBIT with a vision to revolutionize food delivery in Nigeria.",
    },
    {
      name: "Taiwo Samuel",
      role: "Chief Operations Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Samuel oversees all operations and ensures smooth delivery experiences.",
    },
    {
      name: "Lawal Emmanuel",
      role: "Chief Technology Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emmanuel leads our tech team and is responsible for our cutting-edge platform.",
    },
    // {
    //   name: "Akinlua Kemi",
    //   role: "Head of Partnerships",
    //   image: "/kemi.jpg?height=300&width=300",
    //   bio: "Kemi works with restaurants to bring the best food options to our customers.",
    // },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Jollof-rice.png?height=800&width=1600"
            alt="KOBIT team"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">About KOBIT</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            We're on a mission to make food delivery fast, reliable, and delicious in Lasued and environs, spreading to the whole of lagos state.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Story</h2>
          <p className="text-lg text-muted-foreground">
            KOBIT was founded in 2025 with a simple mission: to connect hungry customers with their favourite local restaurants
            in Lasued spreading across Lagos stste. We started as a small operation in Ijanikin Lagos and we hope to  grow into a nationwide business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">From Idea to Reality</h3>
            <p className="text-muted-foreground mb-4">
              Our founder noticed a gap in the market for reliable food delivery services that prioritize quality,
              speed, and customer satisfaction. After months of planning and building relationships with local
              restaurants, KOBIT was born.
            </p>
            <p className="text-muted-foreground mb-4">
              We started with just 6 restaurant partners in Ijanikin. Today, we are looking forward to working with restaurants across
              Lagos, delivering several number of meals every day.
            </p>
            <p className="text-muted-foreground">
              Our commitment to excellence has never wavered. We continue to innovate and improve our service to ensure
              that every delivery meets our high standards.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image src="/idea-reality.jpg?height=400&width=600" alt="KOBIT journey" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Speed</h3>
                <p className="text-muted-foreground">
                  We understand that when you're hungry, every minute counts. That's why we strive to deliver your food
                  as quickly as possible without compromising on quality.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
                  <Award className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We partner only with the best restaurants that share our commitment to excellence. Every meal
                  delivered through KOBIT meets our high standards.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We're proud to support local businesses and create job opportunities in the communities we serve. When
                  you order through KOBIT, you're supporting your local economy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Where We Operate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Nigeria map" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Serving Nigeria</h3>
              <p className="text-muted-foreground mb-6">
                We currently operate in ijanikin Lagos Nigeria, with plans to expand to more locations soon.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Lagos</h4>
                    <p className="text-sm text-muted-foreground">Our headquarters and first location</p>
                  </div>
                </div>
                {/* <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Abuja</h4>
                    <p className="text-sm text-muted-foreground">Serving the capital city</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Port Harcourt</h4>
                    <p className="text-sm text-muted-foreground">Expanding along the coast</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Ibadan</h4>
                    <p className="text-sm text-muted-foreground">Serving western Nigeria</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Experience KOBIT?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our satisfied customers who enjoy delicious meals delivered to their doorstep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/menu">Order Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link href="/restaurants">Browse Restaurants</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
