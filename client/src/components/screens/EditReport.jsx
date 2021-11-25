import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Entry from "../Entry";

const EditReport = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [materials, setMaterials] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [entries, setEntries] = useState([]);
  const selectedDate = props.selectedDate;
  const { date, user } = useParams();

  useEffect(() => {
    const fetchOptions = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(`/api/private/getOptions`, config);
        console.log(data);
        setMaterials(data.data.options.materials);
        setSuppliers(data.data.options.suppliers);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        navigate("/login", { replace: true });
      }
    };
    fetchOptions();

    const fetchEntries = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          `/api/private/getEntries/${selectedDate}/${user}`,
          config
        );
        const newData = data.data.entries.map((entry) => {
          const newEntry = {
            ...entry,
            material: {
              material: entry.material,
              material_id: entry.material_id,
            },
            supplier: {
              supplier: entry.supplier,
              supplier_id: entry.supplier_id,
            },
            date: selectedDate,
          };

          return newEntry;
        });
        setEntries(newData);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        navigate("/login", { replace: true });
      }
    };
    fetchEntries();
  }, [selectedDate, navigate, user]);

  const saveChanges = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.put(
        `/api/private/editReport/${selectedDate}`,
        { entries },
        config
      );
      setEntries([]);
      navigate(`/reports/${date}`, { replace: true });
    } catch (error) {
      localStorage.removeItem("authToken");
      setError("You are not authorized please login");
      navigate("/login", { replace: true });
    }
  };

  const newEntryHandler = (e) => {
    e.preventDefault();
    const entry = {};
    entry.material = JSON.parse(e.target.material.value);
    entry.supplier = JSON.parse(e.target.supplier.value);
    entry.ordered_load = e.target.orderedLoad.value;
    entry.received_load = e.target.receivedLoad.value;
    entry.quantity = e.target.quantity.value;
    entry.remarks = e.target.remarks.value;
    entry.date = new Date(selectedDate);
    // console.log(entry);
    setEntries([...entries, entry]);
  };

  const NewEntry = (props) => {
    return (
      <tr className="border border-shamrock-green">
        <td className="py-4 my-4 text-center font-bold">
          <select
            name="material"
            className="border rounded border-shamrock-green text-center w-11/12"
          >
            {props.materials.map((material) => {
              return (
                <option
                  key={material.material}
                  value={JSON.stringify(material)}
                >
                  {material.material}
                </option>
              );
            })}
          </select>
        </td>
        <td className="py-4 text-center">
          <select
            name="supplier"
            className="border rounded border-shamrock-green text-center w-11/12"
          >
            {props.suppliers.map((supplier) => {
              return (
                <option
                  key={supplier.supplier}
                  value={JSON.stringify(supplier)}
                >
                  {supplier.supplier}
                </option>
              );
            })}
          </select>
        </td>
        <td className="py-4 text-center">
          <input
            className="border rounded border-shamrock-green text-center"
            type="number"
            name="orderedLoad"
          />
        </td>
        <td className="py-4 text-center">
          <input
            className="border rounded border-shamrock-green text-center"
            type="number"
            name="receivedLoad"
          />
        </td>
        <td className="py-4 text-center">
          <input
            className="border rounded border-shamrock-green text-center"
            type="number"
            name="quantity"
          />
        </td>
        <td className="py-4 text-center">
          <input
            className="border rounded border-shamrock-green text-center"
            type="text"
            name="remarks"
          />
        </td>
      </tr>
    );
  };

  const handleDelete = (index) => {
    console.log("index", index);
    const newEntries = entries.filter((entry, i) => {
      console.log("i", i);
      return i !== index;
    });
    setEntries(newEntries);
  };

  const ShowEditEntries = (props) => {
    const entries = props.entries;
    console.log(entries);
    const EditEntry = (props) => {
      return (
        <tr className="border border-shamrock-green">
          <td className="py-4 my-4 text-center font-bold">{props.material}</td>
          <td className="py-4 text-center">{props.supplier}</td>
          <td className="py-4 text-center">{props.ordered_load}</td>
          <td className="py-4 text-center">{props.received_load}</td>
          <td className="py-4 text-center">{props.quantity}</td>
          <td className="py-4 text-center">{props.remarks}</td>
          <td className="py-4 text-center">
            <button
              onClick={() => props.handleDelete(props.index)}
              className="bg-shamrock-green text-white rounded p-2 hover:bg-brown-sugar"
            >
              delete
            </button>
          </td>
        </tr>
      );
    };

    const allEntries = entries.map((item, index) => {
      return (
        <EditEntry
          key={index}
          index={index}
          material={item.material.material}
          supplier={item.supplier.supplier}
          ordered_load={item.ordered_load}
          received_load={item.received_load}
          quantity={item.quantity}
          remarks={item.remarks}
          handleDelete={props.handleDelete}
        />
      );
    });

    return <>{allEntries}</>;
  };

  const SaveChangesButton = (props) => {
    return (
      <>
        <button
          onClick={props.saveChanges}
          className="bg-pine-green rounded text-white text-xl font-bold py-2 px-4 hover:bg-brown-sugar"
        >
          Save Changes
        </button>
      </>
    );
  };

  return (
    <div className="max-w-6xl lg:max-w-xl mx-auto pt-4 px-4 sm:pt-6 lg:px-8">
      <div className="grid grid-cols-1">
        <div className="flex justify-between content-center mb-4">
          <h1 className="text-3xl font-bold text-midnight">
            <Link to={`/reports/${date}`} className="hover:text-brown-sugar">
              {date?.split("_")?.join(" ")}
            </Link>{" "}
            - {user} - Edit Report
          </h1>
          <SaveChangesButton saveChanges={saveChanges} />
        </div>
        <form onSubmit={newEntryHandler} className="grid grid-cols-1">
          <table className="table-fixed text-midnight border-seperate">
            <thead className="text-lg">
              <tr>
                <th className="w-2/12 py-4">Material</th>
                <th className="w-2/12 py-4">Supplier</th>
                <th className="w-2/12 py-4">Ordered Load</th>
                <th className="w-2/12 py-4">Received Load</th>
                <th className="w-2/12 py-4">Quantity (MT)</th>
                <th className="w-2/12 py-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="text-pine-green">
              <NewEntry suppliers={suppliers} materials={materials} />
            </tbody>
          </table>
          <div className="my-10 flex justify-center">
            <button className="rounded bg-shamrock-green py-2 px-4 text-white font-bold">
              Add New Entry
            </button>
          </div>
        </form>
        <table className="table-fixed text-midnight border-seperate">
          <thead className="text-lg border border-lg border-midnight">
            <tr>
              <th className="w-2/12 py-4">Material</th>
              <th className="w-2/12 py-4">Supplier</th>
              <th className="w-2/12 py-4">Ordered Load</th>
              <th className="w-2/12 py-4">Received Load</th>
              <th className="w-1/12 py-4">Quantity (MT)</th>
              <th className="w-2/12 py-4">Remarks</th>
              <th className="w-1/12 py-4">Delete</th>
            </tr>
          </thead>
          <tbody className="text-pine-green">
            <ShowEditEntries entries={entries} handleDelete={handleDelete} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditReport;
