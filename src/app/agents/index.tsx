import Layout from '@/components/layout'
import Cases from './Cases';
import Card from '@/components/cards';


const AgentDashboard = () => {

    return (
        <Layout>
            <div className='pt-10 mb-10'>
                <h1 className="text-3xl font-medium">Dashboard</h1>
            </div>
            <div className='flex flex-col gap-6'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card
                        title="OFFERED CASES"
                        content="This is the content of card 1. You can add any details here."
                    />
                    <Card
                        title="ANSWERED CASES"
                        content="This is the content of card 2. You can add any details here."
                    />
                    <Card
                        title="CASES IN PROGRESS"
                        content="This is the content of card 3. You can add any details here."
                    />
                    <Card
                        title="TOTAL WAITING CASES"
                        content="This is the content of card 4. You can add any details here."
                    />
                    <Card
                        title="HANDLING TIME"
                        content="This is the content of card 4. You can add any details here."
                    />
                    <Card
                        title="RESPONSE TIME"
                        content="This is the content of card 4. You can add any details here."
                    />
                </div>
                <Cases />
            </div>
        </Layout>
    )
}

export default AgentDashboard


