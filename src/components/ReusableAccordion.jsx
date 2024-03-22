import React, {useState} from 'react';
import { Accordion } from 'react-bootstrap';
import "./ReusableAccordion.css"

const ReusableAccordion = ({items}) => {
    const [activeKey, setActiveKey] = useState('0');

    const handleAccordionSelect = (eventKey) => {
        setActiveKey(eventKey === activeKey ? null : eventKey);
    };

    return (
        <Accordion defaultActiveKey={items.map((_, i)=>i<2?i:0)} onSelect={handleAccordionSelect} alwaysOpen className="reusable-accordion">
            {items.map((item, index) => (
                <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                        <h3>{item.title}</h3></Accordion.Header>
                    <Accordion.Body>
                        <h4>{item.content}</h4>
                        {item.widgets && item.widgets.map((widget, widgetIndex) => (
                            <div key={`widget-${index}-${widgetIndex}`}>
                                {widget}
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>))}
        </Accordion>
    );
};

export default ReusableAccordion;
