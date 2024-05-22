// PlayPreference.jsx
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'antd';
import SelectedHours from './SelectedHours'
import HoursModal from './HoursModal';

const PlayPreference = ({ selectedHours, setSelectedHours }) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    const openModal = (day) => {
        setSelectedDay(day);
        setVisibleModal(true);
    };

    const closeModal = () => {
        setSelectedDay(null);
        setVisibleModal(false);
    };

    const renderDays = () => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return days.map((day) => (
            <Col key={day}>
                <Button onClick={() => openModal(day)}>{day}</Button>
            </Col>
        ));
    };

    return (
        <>
            <Form.Item label="Select Preferred Days">
                <Row gutter={[8, 8]}>{renderDays()}</Row>
            </Form.Item>
            <SelectedHours selectedHours={selectedHours} setSelectedHours={setSelectedHours} />
            <HoursModal
                visibleModal={visibleModal}
                selectedDay={selectedDay}
                selectedHours={selectedHours}
                setSelectedHours={setSelectedHours}
                closeModal={closeModal}
            />
        </>
    );
};

export default PlayPreference;