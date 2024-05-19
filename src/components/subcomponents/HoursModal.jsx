// HoursModal.jsx
import React from 'react';
import { Modal, Button, Checkbox, Row, Col } from 'antd';

const HoursModal = ({ visibleModal, selectedDay, selectedHours, setSelectedHours, closeModal }) => {
    const hours = Array.from({ length: 11 }, (_, index) => `${index + 10}:00`);

    const selectedDayHours = selectedHours
        .filter((h) => h.startsWith(selectedDay))
        .map((h) => h.split(' - ')[1]);

    const handleHourSelection = (checkedValues) => {
        const newSelectedHours = selectedHours.filter((h) => !h.startsWith(selectedDay));
        const updatedSelectedHours = Array.from(
            new Set([...newSelectedHours, ...checkedValues.map((hour) => `${selectedDay} - ${hour}`)])
        );
        setSelectedHours(updatedSelectedHours);
    };

    return (
        <Modal
            title={`Select Hours for ${selectedDay}`}
            visible={visibleModal}
            onCancel={closeModal}
            footer={[
                <Button key="close" onClick={closeModal}>
                    Close
                </Button>,
            ]}
        >
            <Checkbox.Group
                style={{ width: '100%' }}
                value={selectedDayHours}
                onChange={handleHourSelection}
            >
                <Row gutter={[8, 8]}>
                    {hours.map((hour) => (
                        <Col key={`${selectedDay}-${hour}`} span={8}>
                            <Checkbox value={hour}>{hour}</Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
        </Modal>
    );
};

export default HoursModal;