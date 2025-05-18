import Image from "next/image"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Clock, Award, Users, MapPin } from "lucide-react"

export function AboutPage() {
  const teamMembers = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "John founded KOBIT with a vision to revolutionize food delivery in Nigeria.",
    },
    {
      name: "Sarah Johnson",
      role: "Chief Operations Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sarah oversees all operations and ensures smooth delivery experiences.",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael leads our tech team and is responsible for our cutting-edge platform.",
    },
    {
      name: "Amara Okafor",
      role: "Head of Partnerships",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Amara works with restaurants to bring the best food options to our customers.",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="KOBIT team"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">About KOBIT</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            We're on a mission to make food delivery fast, reliable, and delicious across Nigeria.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Story</h2>
          <p className="text-lg text-muted-foreground">
            KOBIT was founded in 2023 with a simple mission: to connect hungry customers with the best local restaurants
            in Nigeria. What started as a small operation in Lagos has quickly grown into a nationwide service.
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
              We started with just 10 restaurant partners in Lagos. Today, we work with over 500 restaurants across
              Nigeria, delivering thousands of meals every day.
            </p>
            <p className="text-muted-foreground">
              Our commitment to excellence has never wavered. We continue to innovate and improve our service to ensure
              that every delivery meets our high standards.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="KOBIT journey" fill className="object-cover" />
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
                We currently operate in major cities across Nigeria, with plans to expand to more locations soon.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Lagos</h4>
                    <p className="text-sm text-muted-foreground">Our headquarters and first location</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Experience KOBIT?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who enjoy delicious meals delivered to their doorstep.
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
