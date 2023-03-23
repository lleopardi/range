import * as React from "react";
import { useEffect, useState } from "react";
import Range from "../../components/Range/Range";
import { getFilter } from "../../utils/service";

import "./NormalFilter.scss";

const NormalFilter = () => {
  const [filter, setFilter] = useState({ max: 100, min: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [newFilter, setNewFilter] = useState({ min: 0, max: 0 });

  useEffect(() => {
    setIsLoading(true);
    getFilter("between/v2/filters/normal").then((data) => {
      setFilter(data.filter);
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
        <div className="range-normal">
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
      <h2>Normal range from min to max number</h2>
      <p>This component work with the following structure</p>
      <pre className="code">
{`
{
  min: 0,
  max: 100
}`
}
      </pre>
      
      {renderRange()}
    </div>
  );
};

export default NormalFilter;
