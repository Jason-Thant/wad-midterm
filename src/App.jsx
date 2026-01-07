import { useState } from "react";

import deleteIcon from "./assets/delete.svg";
import pen from "./assets/ink_pen.svg";
import fork from "./assets/flatware.svg";
import electric from "./assets/electrical_services.svg";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [nextId, setNextId] = useState(1);

  const categoryIcon = {
    Stationary: pen,
    Kitchenware: fork,
    Appliance: electric,
  };

  function handleAdd() {
    if (!name.trim()) {
      setError("Item name must not be empty");
      return;
    }

    if (items.some(i => i.name.toLowerCase() === name.toLowerCase())) {
      setError("Item must not be duplicated");
      return;
    }

    if (!category) {
      setError("Please select a category");
      return;
    }

    if (price === "" || Number(price) < 0) {
      setError("Price must not be less than 0");
      return;
    }

    setItems(prev => [
      ...prev,
      {
        id: nextId,
        name,
        category,
        price: Number(price)
      }
    ]);

    setNextId(prev => prev + 1);
    setName("");
    setCategory("");
    setPrice("");
    setError("");
  }

  function handleDelete(id) {
    setItems(items.filter(item => item.id !== id));
  }

  return (
    <>
      <h2>Item Management</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* EXISTING ITEMS */}
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img
                  src={categoryIcon[item.category]}
                  alt={item.category}
                  width="24"
                />
              </td>
              <td>{item.price}</td>
              <td>
                <img
                  src={deleteIcon}
                  alt="delete"
                  width="20"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}

          {/* FORM ROW AT THE BOTTOM */}
          <tr>
            <td>-</td>

            <td>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </td>

            <td>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Stationary">Stationary</option>
                <option value="Kitchenware">Kitchenware</option>
                <option value="Appliance">Appliance</option>
              </select>
            </td>

            <td>
              <input
                type="number"
                className="no-spinner"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </td>

            <td>
              <button onClick={handleAdd}>Add Item</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ERROR MESSAGE BELOW TABLE */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default App;
