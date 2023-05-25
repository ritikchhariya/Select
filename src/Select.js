import React, { useState } from 'react';

const S = () => {
  const [selectedOptions, setSelectedOptions] = useState(['']);
  const [fields, setFields] = useState([{ input: '', select: '' }]);
  const [results, setResults] = useState([]);

  const handleInputChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].input = value;
    setFields(updatedFields);
  };

  const handleSelectChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].select = value;
    setFields(updatedFields);
  };

  const handleAddsField = () => {
    setFields([...fields, { input: '', select: '' }]);
  };

  const handleOptionChange = (index, value) => {
    if (value === 'add') {
      handleAddField();
    } else if (value === 'orr') {
      handleOrField();
    } else {
      const updatedOptions = [...selectedOptions];
      updatedOptions[index] = value;
      setSelectedOptions(updatedOptions);
    }
  };

  const handleAddField = () => {
    setSelectedOptions([...selectedOptions, '','']);
  };

  const handleOrField = () => {
    setSelectedOptions([...selectedOptions, '']);
  };

  const handleRemoveField = (index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
    setSelectedOptions(updatedOptions);
  };

  const renderOptions = (index) => {
    const selectedOption = selectedOptions[index];

    if (selectedOption === 'constant') {
      return (
        <>
          <option value="true">True</option>
          <option value="false">False</option>
        </>
      );
    } else if (selectedOption === 'argument') {
      return (
        <>
          <option value="myarg">My Arg</option>
          <option value="x">X</option>
        </>
      );
    } else {
      return (
        <>
          <option value="Select">select</option>
          <option value="constant">Constant</option>
          <option value="argument">Argument</option>
          <option value="add">Add</option>
          <option value="orr">Or</option>
        </>
      );
    }
  };

  const handleShowResults = () => {
    const result = fields.map((field) => {
      if (field.select === 'true') {
        return true;
      } else if (field.select === 'false') {
        return false;
      } else {
        return undefined;
      }
    });
    setResults(result);
  };

  return (
    <div>
      <div>
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              value={field.input}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <select
              value={field.select}
              onChange={(e) => handleSelectChange(index, e.target.value)}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        ))}
        <button onClick={handleAddsField}>Add Field</button>
        <button onClick={handleShowResults}>Show Results</button>
      </div>
      <br />
      {selectedOptions.map((option, index) => (
        <div key={index}>
          <select value={option} onChange={(e) => handleOptionChange(index, e.target.value)}>
            {renderOptions(index)}
          </select>
          {index >= 0 && <button onClick={() => handleRemoveField(index)}>X</button>}
          {option === 'orr' && (
            <select value="" onChange={(e) => handleOptionChange(index + 1, e.target.value)}>
              {renderOptions(index + 1)}
            </select>
          )}
        </div>
      ))}
      <br />
      <div>
        <h3>Results:</h3>
        {results.map((result, index) => (
          <p key={index}>{result === undefined ? 'undefined' : result.toString()}</p>
        ))}
      </div>
    </div>
  );
};

export default S;
