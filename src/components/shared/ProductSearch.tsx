import { Category } from '@/models/Product';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

interface ProductSearchProps {
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleCategoryChange?: (category: Category | null) => void;
  className?: string;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ handleSearch, handleCategoryChange, className }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>({
    "slug": "beauty",
    "name": "Beauty",
    "url": "https://dummyjson.com/products/category/beauty"
  });

  const getAllCategories = async () => {
    try
    {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error)
    {
      console.error(error);
    }
  }

  const handleOnChangeValue = (value: string) => {
    setSelectedCategory(categories.find((category: Category) => category.slug === value) || null);
  }

  useEffect(() => {
    getAllCategories();
    handleCategoryChange && handleCategoryChange(selectedCategory);
    return () => {
      console.log("ProductSearch unmounted");
    };
  }, [selectedCategory]);
  return (
    <div className={`flex gap-4 ${className}`}>
      <Input placeholder="Search product..." onKeyUp={(e) => handleSearch(e)} />
      <Select onValueChange={(value) => handleOnChangeValue(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {
              categories.map((category: Category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.name}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ProductSearch