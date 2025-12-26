import { categories } from "@/lib/categories"
import Link from "next/link"
import CategoryCard from "@/components/CategoryCard"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

export default function HomePage() {
  return (
    <>

      {/* -------- CATEGORIES GRID -------- */}
      <div className="grid grid-cols-3 mt-8 gap-4 px-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
          >
            <CategoryCard title={cat.name} icon={cat.icon} />
          </Link>
        ))}
      </div>

      {/* -------- ABOUT US TITLE -------- */}
      <h2 className="text-2xl font-bold mt-14 mb-6 text-center px-4">
        About Us
      </h2>

      {/* -------- ABOUT US SECTION -------- */}
      <section className="mb-20 px-6 flex justify-center">
        <Card className="max-w-sm w-full shadow-md rounded-2xl border border-border">
          <CardHeader className="flex flex-col items-center gap-3 pt-6">
            {/* PROFILE IMAGE */}
            <div className="w-28 h-28 relative rounded-full overflow-hidden bg-muted">
              <Image 
                src="https://raw.githubusercontent.com/MananVelani/personal-purpose/main/profile-photo-website-2.jpg"
                alt="Manan Velani"
                width={400} 
                height={400}
                priority // This ensures the highest quality load speed
              />
            </div>
            <h3 className="text-xl font-semibold">Manan Velani</h3>
            <p className="text-sm text-muted-foreground text-center">
              Full Stack Developer • SVNIT
            </p>
          </CardHeader>

          <CardContent className="flex justify-center gap-5 pb-6 mt-2">
            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/manan_velani/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary text-secondary-foreground hover:scale-110 transition"
            >
              <FaInstagram size={22} />
            </a>

            {/* LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/manan-velani-757bb91b6"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary text-secondary-foreground hover:scale-110 transition"
            >
              <FaLinkedin size={22} />
            </a>

            {/* GITHUB */}
            <a
              href="https://github.com/MananVelani"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary text-secondary-foreground hover:scale-110 transition"
            >
              <FaGithub size={22} />
            </a>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
