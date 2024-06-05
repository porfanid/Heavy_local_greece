import React, {useState} from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryDropdown = ({categories, onSelectCategory}) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSelect = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category); // Notify parent component about the selected category
    };

    return (
        <DropdownButton
            id="dropdown-basic-button"
            title={selectedCategory || "Select a Category"}
            variant={"light"}
        >
            {categories.map((category, index) => (
                <Dropdown.Item
                    key={index}
                    onClick={() => handleSelect(category)}
                >
                    {category}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export default CategoryDropdown;
