import Card from '@/components/cards'

const AgentStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            <Card
                title="OFFERED CASES"
                content="1"
            />
            <Card
                title="ANSWERED CASES"
                content="2"
            />
            <Card
                title="CASES IN PROGRESS"
                content="3"
            />
            <Card
                title="TOTAL WAITING CASES"
                content="4"
            />
            <Card
                title="HANDLING TIME"
                content="4"
            />
            <Card
                title="RESPONSE TIME"
                content="4"
            />
        </div>
    )
}

export default AgentStats