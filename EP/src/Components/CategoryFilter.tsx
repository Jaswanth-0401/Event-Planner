import React, { useEffect, useState } from 'react';
import '../Styles/CategoryFilter.css';

interface Category {
  category_id: number;
  name: string;
}

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories');
        const data = await res.json();
        if (res.ok) {
          setCategories(data.categories);
        } else {
          console.error('Failed to fetch categories:', data.message);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-filter"
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategoryFilter;
