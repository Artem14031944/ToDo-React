import React from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, editCategory, deleteCategory } from '../../actions';
import './category.css';


const CategoryList = ({ categories, parentId, activeCategory, setActiveCategory }) => {
 
  const dispatch = useDispatch();

  const handle = (id) => {
    setActiveCategory(id) 
  }
  const handlePlus = (item) => {
    const newitem = item.children = [
      { id: 1, parentId: null, title: "Category 1", children: null}
    ]
   dispatch(editCategory(newitem)) 
  } 
  const handleEdit = (id) => {
   dispatch(editCategory(id))
  } 
  const handleDelete = (id) => {
   dispatch(deleteCategory(id)) 
  } 
  
  return (
    < div className="classList">
     <ul>
      {categories
        .filter(item => item.parentId === parentId)
        .map(item => (
          <li className={activeCategory === item.id ? 'active' : '' }  onClick={() => handle(item.id)}>
            {item.title}
            <button className="btnList" onClick={() => handleEdit(item) } >&#9998;</button>
            <button className="btnList-left" onClick={() => handleDelete(item.id) }>&#10006;</button>
            <button className="btnList"   onClick={() => handlePlus(item)}>&#10010;</button>
           <CategoryList categories={categories} parentId={item.id}  />
          </li>
        ))}
     </ul>
    </div>
  );
};

export default CategoryList;
