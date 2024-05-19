import React from 'react';
import { Layout, Typography, List } from 'antd';
/* import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config'; */

const { Content } = Layout;
const { Title } = Typography;

const Results = ({ user }) => {
    /*    const [results, setResults] = useState([]); */

    /* useEffect(() => {
        const fetchResults = async () => {
            try {
                const resultsRef = collection(db, 'results');
                const q = query(resultsRef, where('userId', '==', user.id));
                const querySnapshot = await getDocs(q);
                const resultsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setResults(resultsData);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        if (user) {
            fetchResults();
        }
    }, [user]); */

    // Datos de ejemplo
    const results = [
        {
            id: 1,
            player1: 'John Doe',
            player2: 'Jane Smith',
            score: '6-4, 6-3',
            date: '2023-06-10',
        },
        {
            id: 2,
            player1: 'John Doe',
            player2: 'Mike Johnson',
            score: '7-5, 6-7, 6-2',
            date: '2023-06-05',
        },
        {
            id: 3,
            player1: 'John Doe',
            player2: 'Sarah Williams',
            score: '6-1, 6-2',
            date: '2023-06-02',
        },
    ];

    return (
        <Layout>
            <Content style={{ padding: '50px' }}>
                <Title level={2}>Results</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={results}
                    renderItem={(result) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`${result.player1} vs ${result.player2}`}
                                description={`Score: ${result.score} | Date: ${result.date}`}
                            />
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
};

export default Results;