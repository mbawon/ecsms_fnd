import Card from "@/components/cards"
import Layout from "@/components/layout"


const Dashboard = () => {
    return (
        <Layout>
            <div className="w-full pt-8 mb-4">
                <h1 className="text-3xl font-medium">Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card
                    title="Card 1"
                    content="1"
                    className="bg-red-500 text-white"
                />
                <Card
                    title="Card 1"
                    content="1"
                    className="bg-red-500 text-white"
                />
                <Card
                    title="Card 1"
                    content="1"
                    className="bg-red-500 text-white"
                />
                <Card
                    title="Card 1"
                    content="1"
                    className="bg-red-500 text-white"
                />
                <Card
                    title="Card 1"
                    content="1"
                    className="bg-red-500 text-white"
                />
                <Card
                    title="Card 1"
                    content="1"
                    className="bg-red-500 text-white"
                />
                <Card
                    title="Card 2"
                    content="2"
                    className="bg-red-500 text-white"
                />
                <Card
                    title="Card 3"
                    content="3"
                    className="bg-red-500 text-white"
                />
                <Card
                    title="Card 4"
                    content="4"
                />
                <Card
                    title="Card 2"
                    content="2"
                />
                <Card
                    title="Card 3"
                    content="3"
                />
                <Card
                    title="Card 4"
                    content="4"
                />
                <Card
                    title="Card 2"
                    content="2"
                />
                <Card
                    title="Card 3"
                    content="3"
                />
                <Card
                    title="Card 4"
                    content="4"
                />
                <Card
                    title="Card 2"
                    content="2"
                />
                <Card
                    title="Card 3"
                    content="3"
                />
                <Card
                    title="Card 4"
                    content="4"
                />
                <Card
                    title="Card 2"
                    content="2"
                />
                <Card
                    title="Card 3"
                    content="3"
                />
                <Card
                    title="Card 4"
                    content="4"
                />
                <Card
                    title="Card 2"
                    content="2"
                />
                <Card
                    title="Card 3"
                    content="3"
                />
                <Card
                    title="Card 4"
                    content="4"
                />
            </div>
        </Layout>
    )
}

export default Dashboard