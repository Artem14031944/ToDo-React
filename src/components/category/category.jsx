import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { editCategory, deleteCategory, setActiveCategory, setTasks, addCategory, addSubcategory } from '../../actions';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { v4 as uuidv4 } from 'uuid';
import './category.css';


const CategoryList = ({ categories, activeCategory }) => {
 
  const dispatch = useDispatch();

  const onClick = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(setActiveCategory(item.id))
  }

  const handlePlus = (item) => { 
    const subcategory = { id: uuidv4(), parentId: null, title: "SubCategory 1", children: null}
    dispatch(addCategory(subcategory))
    dispatch(addSubcategory({id: item.id, subId: subcategory.id})) 
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
      {categories && categories.map(item => (
          <li className={activeCategory === item.id ? 'active' : ''} >
            <Category 
              item={item} 
              handleEdit={handleEdit}
              handleDelete={handleDelete} 
              handlePlus={handlePlus} 
              categories={item.children}
              onClick={onClick} 
              activeCategory={activeCategory}
            />
          </li>
        ))}
     </ul>
    </div>
  );
};

export const Category = ({item, handleEdit, handleDelete, handlePlus, categories, onClick, activeCategory}) => {
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
        className={activeCategory === item.id ? 'activeSub' : ''} 
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
      {arrow && <CategoryList  categories={categories}  />}
    </div>
  )
}

export default CategoryList;
