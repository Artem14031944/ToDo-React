import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, editCategory, deleteCategory } from '../../actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import './category.css';


const CategoryList = ({ categories, activeCategory, setActiveCategory }) => {
 
  const dispatch = useDispatch();

  const handle = (id) => {
    setActiveCategory(id) 
  }
  const handlePlus = (item) => {
    const newItem = item.children = [
      { id: 1, parentId: null, title: "Category 1", children: null}
    ]
    dispatch(editCategory(newItem)) 
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
          <li className={activeCategory === item.id ? 'active' : '' }  onClick={() => handle(item.id)}>
            <Category 
              item={item} 
              handleEdit={handleEdit}
              handleDelete={handleDelete} 
              handlePlus={handlePlus} 
              categories={item.children} 
            />
          </li>
        ))}
     </ul>
    </div>
  );
};

export const Category = ({item, handleEdit, handleDelete, handlePlus, categories }) => {
  const handleDisabled = () => {
    setDisabled(!disabled)
    handleEdit(item, value)
  }

  const [value, setValue] = useState();
  const [arrow, setArrow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  return(
    <div className="btn">
      <InputBase
        defaultValue="Naked input"
        inputProps={{ 'aria-label': 'naked' }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        defaultValue={item.title}
        id="outlined-basic"
        variant="outlined"
        disabled={disabled}
      />
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
