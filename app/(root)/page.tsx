import { ExampleChart } from "@/components/charts/example-chart";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div>
            <Button variant="outline">Home</Button>
            <h1 className="text-2xl font-bold">Welcome to the Chart Example</h1>
            <p className="mb-4">This is a simple example of a chart using Recharts.</p>
            <div className="max-w-4xl">
                <ExampleChart />
            </div>
        </div>
    );
}
