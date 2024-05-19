// SelectedHours.jsx
import React from 'react';
import { Form, Tag } from 'antd';

const SelectedHours = ({ selectedHours, setSelectedHours }) => {
    const handleTagClose = (selectedHour) => {
        setSelectedHours((prevSelectedHours) =>
            prevSelectedHours.filter((h) => h !== selectedHour)
        );
    };

    return (
        <Form.Item label="Selected Hours">
            {selectedHours.map((selectedHour) => (
                <Tag key={selectedHour} closable onClose={() => handleTagClose(selectedHour)}>
                    {selectedHour}
                </Tag>
            ))}
        </Form.Item>
    );
};

export default SelectedHours;