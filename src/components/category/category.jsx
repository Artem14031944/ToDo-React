import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCategory, deleteCategory, setActiveCategory, setTasks, addCategory } from '../../actions';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { v4 as uuidv4 } from 'uuid';
import './category.css';


const CategoryList = ({ categories, activeCategory,  parentId, }) => {
 
  const dispatch = useDispatch();
  const categoriesState = useSelector(state => state.categories)

  const onClick = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(setActiveCategory(item.id))
  }

  const handlePlus = (item) => { 
    const itemChildren = categoriesState.filter(i => i.parentId === item.id)
    const subcategory = { id: uuidv4(), parentId: item.id, title: `SubCategory ${itemChildren !== null ? itemChildren.length + 1 : 1}`, children: null}
    dispatch(addCategory(subcategory))
  } 

  const handleEdit = (item, value) => {
    const newItem = {...item, text: value}
    dispatch(editCategory(newItem))
  }

  const handleDelete = (id) => {
    dispatch(deleteCategory(id)) 
  } 
  
  return (
    < div className="classList">
     <ul>
      {categories
      .filter(item => item.parentId === parentId)
      .map(item => {
        return (
          <li>
            <Category 
              item={item} 
              handleEdit={handleEdit}
              handleDelete={handleDelete} 
              handlePlus={handlePlus} 
              categories={categories}
              onClick={onClick} 
              activeCategory={activeCategory}
              parentId={item.id}
            />
          </li>
        )})}
     </ul>
    </div>
  );
};

export const Category = ({item, handleEdit, handleDelete, handlePlus, categories, onClick, activeCategory , activeSubCategory}) => {

  const handleDisabled = () => {
    setDisabled(!disabled)
    handleEdit(item, value)
  }

  const [value, setValue] = useState();
  const [arrow, setArrow] = useState(false);
  const [disabled, setDisabled] = useState(true);

  return(
    <div className="btn">
      <span
        className={activeCategory === item.id ? 'active' : ''} 
        onClick={(e) => onClick(e, item)}>
        <InputBase
          defaultValue="Naked input"
          inputProps={{ 'aria-label': 'naked' }}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          defaultValue={item.title}
          id="outlined-basic"
          variant="outlined"
          disabled={disabled}
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          setTasks={setTasks}
        />
      </span>
        <Button color="primary" onClick={() => handleDisabled(item, value)}>&#9998;</Button>
        <Button color="primary" onClick={() => handleDelete(item.id)}>&#10006;</Button>
        <Button color="primary" onClick={() => handlePlus(item)}>&#10010;</Button>
      {arrow ?  <ArrowDropUpIcon 
                  className="arrow" 
                  onClick={() => setArrow(!arrow)} /> :
                <ArrowDropDownIcon  
                  className="arrow" 
                  onClick={() => setArrow(!arrow)} />} 
      {arrow && <CategoryList 
                  categories={categories} 
                  parentId={item.id} />}
    </div>
  )
}

export default CategoryList;
