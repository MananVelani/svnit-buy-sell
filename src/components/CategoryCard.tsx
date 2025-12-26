import { Card, CardContent } from "@/components/ui/card"

interface Props {
  title: string
  icon: string
}

export default function CategoryCard({ title, icon }: Props) {
  return (
    <Card className="cursor-pointer transition hover:scale-105 hover:shadow-lg">
      <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
        <span className="text-5xl">{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardContent>
    </Card>
  )
}
