import React, { useEffect, useState } from "react";
import Range from "../../components/Range/Range";
import { getFilter } from "../../utils/service";
import './FixedFilter.scss'

const FixedFilter = () => {
  const [filter, setFilter] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [newFilter, setNewFilter] = useState({ min: 0, max: 0 });

  useEffect(() => {
    setIsLoading(true);
    getFilter("between/v2/filters/fixed").then((data) => {
      setFilter(data.filter);
      setNewFilter(data.filter);
      setIsLoading(false);
    });
  }, []);

  const onFilter = (newFilter: { min: number; max: number }) => {
    setNewFilter({ ...newFilter });
  };

  const renderRange = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="range-fixed">
          <Range filter={filter} label="€" onFilter={onFilter}></Range>
          <div className="filter">
            Selected filter: [{newFilter.min}, {newFilter.max}]
          </div>
        </div>
      );
    }
  };

  return (
    <div className="range-container">
      <h2>Fixed range from array of number</h2>
      <p>The data structure received from backend is the following:</p>

      <pre className="code">
        {`
[1.99,5.99,10.99,30.99,50.99,70.99]
`
}
      </pre>

      {renderRange()}
    </div>
  );
};

export default FixedFilter;
