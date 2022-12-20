import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postPlace } from '../pages/InsertPlace';

const PlaceForm = () => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [menu, setMenu] = useState('');
    const [tags, setTags] = useState([]);
    const [fillRequired, setFillRequired] = useState(Boolean(name) && Boolean(category) && Boolean(location) && Boolean(price));
    const navigate = useNavigate();
    
    const changeHandle = (event) => {
        const setState = {
            'name': () => setName(event.target.value),
            'category': () => setCategory(event.target.value),
            'location': () => setLocation(event.target.value),
            'price': () => setPrice(event.target.value),
            'menu': () => setMenu(event.target.value),
            'tags': () => setTags(event.target.value)
        };
        setState[event.target.name]();
        setFillRequired(Boolean(name) && Boolean(category) && Boolean(location) && Boolean(price));
    }

    const submitHandle = (event) => {
        event.preventDefault();
        const place = {
            name,
            category,
            location,
            price,
            menu,
            tags
        }
        postPlace(place);
        clearForm();
        navigate("/");
    }

    const clearForm = () => {
        setName('');
        setCategory('');
        setLocation('');
        setPrice('');
        setMenu('');
        setTags('');
    }


  return (
    <section className="text-center col-lg-4 mx-auto w-50">
        <form onSubmit={submitHandle}>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={name} onChange={changeHandle} placeholder="Name" name="name" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={category} onChange={changeHandle} placeholder="Category" name="category" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={location} onChange={changeHandle} placeholder="Location" name="location" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={price} onChange={changeHandle} placeholder="Price" name="price" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={menu} onChange={changeHandle} placeholder="Menu URL" name="menu"></input>
            </div>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={tags} onChange={changeHandle} placeholder="Tags" name="tags"></input>
            </div>
            <p>
            <button className="btn btn-primary my-2" type='submit' disabled={!fillRequired}>SUBMIT</button>
            </p>
        </form>
    </section>
  )
}

export default PlaceForm