import { Card, CardContent } from "@/components/ui/card"

interface Props {
  title: string
  icon: string
}

export default function CategoryCard({ title, icon }: Props) {
  return (
    <Card className="cursor-pointer transition-transform hover:scale-105 hover:shadow-md rounded-xl">
      <CardContent className="flex flex-col items-center justify-center gap-3 p-4 sm:p-6">
        <span className="text-4xl sm:text-5xl">{icon}</span>
        <h3 className="text-sm sm:text-base font-semibold text-center">
          {title}
        </h3>
      </CardContent>
    </Card>
  )
}
