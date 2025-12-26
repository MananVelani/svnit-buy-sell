

// const categories = [
//   { title: "Clothing", icon: "👕" },
//   { title: "Electronics", icon: "💻" },
//   { title: "Vehicles", icon: "🚗" },
//   { title: "Home Lifestyle", icon: "🏠" },

//   { title: "Tickets", icon: "🎟️" },
//   { title: "Software", icon: "🧠" },
//   { title: "Tools & Equipment", icon: "🛠️" },
//   { title: "Study", icon: "📚" },
//   { title: "Others", icon: "📦" },
// ]
import { categories } from "@/lib/categories"
import Link from "next/link"
import CategoryCard from "@/components/CategoryCard"

export default function HomePage() {
  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
        >
          <CategoryCard title={cat.name} icon={cat.icon} />
        </Link>
      ))}
    </div>
  )
}
